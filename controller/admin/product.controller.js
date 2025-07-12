const ProductCategory = require('../../model/product-category.model');
const Product = require('../../model/product.model');

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
  const totalProduct = await Product.countDocuments();
  const totalPage = Math.ceil(totalProduct / limitItem);
  //end pagination

  const products = await Product
  .find(find)
  .sort(sort)
  .limit(limitItem)
  .skip(skip);

  res.render('admin/pages/products/index', {
    pageTitle: 'Trang sản phẩm',
    products: products,
    totalPage: totalPage,
    currentPage: page
  });
}

//Create product
module.exports.create = async (req, res) => {
  const productCategories = await ProductCategory.find({
    deleted: false,
  });

  res.render('admin/pages/products/create', {
    pageTitle: 'Thêm mới sản phẩm',
    productCategories: productCategories
  })
}

module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.quantity = parseInt(req.body.quantity);
  
  
  if(req.body.position){
      req.body.position = parseInt(req.body.position);
  } else {
    const count  = await Product.countDocuments();
    req.body.position = count + 1;
  }

  const record = new Product(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products`)

  return;
}
// End create product

// change status
module.exports.changeStatus = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id,
  }, {
    status: req.body.status
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
      await Product.updateMany({
        _id: req.body.id
      }, {
        status: req.body.status
      });

      req.flash("success", "Đổi trạng thái thành công");

      res.json({
        code: "success",
      })
      break;
    case 'delete':
      await Product.updateMany({
        _id: req.body.id
      }, {
        deleted: true
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
  
  const product = await Product.findOne({
    _id: id,
    deleted: false
  }); 

  const listCategory = await ProductCategory.find({
    deleted: false
  });

  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
    listCategory: listCategory
  });
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.quantity = parseInt(req.body.quantity);

  if(req.body.position){
      req.body.position = parseInt(req.body.position);
  } else {
    const count  = await Product.countDocuments();
    req.body.position = count + 1;
  }
  
  await Product.updateOne({
    _id: id
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");

  return;
}
//end edit

//delete
module.exports.delete = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    deleted: true
  });

  req.flash("success", "Đã xóa thành công");

  res.json({
    code: "success"
  });
}
//end delete

//change position
module.exports.changePosition = async (req, res) => {
  await Product.updateOne({
    _id: req.body.id
  }, {
    position: req.body.position
  });

  res.json({
    code: "success"
  });
}
//end change position

