const Account = require("../../model/account.model");
const ProductCategory = require("../../model/product-category.model");
const moment = require('moment')

const systemConfig = require('../../config/system');

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  // filter 
  if(req.query.status){
    find.status = req.query.status;
  }
  // End filter 

  // search
  if(req.query.keyword){
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End search

  // sort
  const sort = {};
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    sort[sortKey] = sortValue;
  } else {
    sort["position"] = "desc";
  }
  // end sort

  
  // end show

  //pagination
  let limitItem = 10;
  let page = 1;

  if(req.query.limitItem){
    limitItem = parseInt(req.query.limitItem);
  }

  if(req.query.page){
    page = parseInt(req.query.page);
  }

  const skip = (page - 1) * limitItem;
  const totalCategory = await ProductCategory.countDocuments({
    deleted: false
  });
  const totalPage = Math.ceil(totalCategory / limitItem);
  //end pagination

  const listCategory = await ProductCategory
  .find(find)
  .sort(sort)
  .limit(limitItem)
  .skip(skip);

  for(const item of listCategory){
    //createdBy
    const infoCreated = await Account.findOne({
      _id: item.createdBy
    });

    if(infoCreated){
      item.createdByFullname = infoCreated.fullName;
    } else {
      item.createdByFullname = "";
    }

    if(item.createdAt){
      item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YY");
    }

    //updatedBy
    const infoUpdated = await Account.findOne({
      _id: item.updatedBy
    });

    if(infoUpdated){
      item.updatedByFullname = infoUpdated.fullName;
    } else {
      item.updatedByFullname = "";
    }

    if(item.updatedAt){
      item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YY");
    }
  }

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    listCategory: listCategory,
    totalPage: totalPage,
    currentPage: page
  });
}

//Create
module.exports.create = async (req, res) => {
  const productCategories = await ProductCategory.find({
    deleted: false,
  });

  res.render('admin/pages/products-category/create', {
    pageTitle: 'Thêm mới danh mục sản phẩm',
    productCategories: productCategories
  })
}

module.exports.createPost = async (req, res) => {
  req.body.createdAt = new Date();
  req.body.createdBy = res.locals.user.id;
  
  
  if(req.body.position){
      req.body.position = parseInt(req.body.position);
  } else {
    const count  = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }

  const record = new ProductCategory(req.body);
  await record.save();

  req.flash("success", "Thêm mới thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`)

  return;
}
// End create 

// change status
module.exports.changeStatus = async (req, res) => {
  await ProductCategory.updateOne({
    _id: req.body.id,
  }, {
    status: req.body.status,
    updatedAt: new Date(),
    updatedBy: res.locals.user.id
  });

  req.flash('success', 'Đổi trạng thái thành công');

  res.json({
    code: "success",
    message: "Đổi trạng thái thành công"
  });
}
// End change status

// change multi status
module.exports.changeMulti = async (req, res) => {
  switch(req.body.status){
    case 'active':
    case 'inactive':
      await ProductCategory.updateMany({
        _id: req.body.id
      }, {
        status: req.body.status,
        updatedAt: new Date(),
        updatedBy:  res.locals.user.id
      });

      req.flash("success", "Đổi trạng thái thành công");

      res.json({
        code: "success",
      })
      break;
    case 'delete':
      await ProductCategory.updateMany({
        _id: req.body.id
      }, {
        deleted: true,
        updatedAt: new Date(),
        updatedBy:  res.locals.user.id
      });

      req.flash("success", "Xóa bảng ghi thành công");

      res.json({
        code: "success"
      })
      break;
    default:
      req.flash("error", "Trạng thái không hợp lệ");
      res.json({
        code: "error"
      });
      break;
  }

  
}
// end change multi status

//edit
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  
  const category = await ProductCategory.findOne({
    _id: id,
    deleted: false
  }); 

  const listCategory = await ProductCategory.find({
    deleted: false
  });

  res.render("admin/pages/products-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    category: category,
    listCategory: listCategory
  });
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.updatedAt = new Date();
  req.body.updatedBy = res.locals.user.id;

  if(req.body.position){
    req.body.position = parseInt(req.body.position);
  }

  if(req.body.removeImage == "true" && !req.body.thumbnail){
    req.body.thumbnail = "";
  }
  
  await ProductCategory.updateOne({
    _id: id
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");

  return;
}
//end edit

//delete
module.exports.delete = async (req, res) => {
  await ProductCategory.updateOne({
    _id: req.body.id
  }, {
    deleted: true,
    deletedAt: new Date(),
    deletedBy: res.locals.user.id
  });

  req.flash("success", "Đã xóa thành công");

  res.json({
    code: "success"
  });
}
//end delete

//change position
module.exports.changePosition = async (req, res) => {
  await ProductCategory.updateOne({
    _id: req.body.id
  }, {
    position: req.body.position,
    updatedAt: new Date(),
    updatedBy: res.locals.user.id,
  });

  res.json({
    code: "success"
  });
}
//end change position