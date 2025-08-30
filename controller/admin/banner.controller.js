const BannerCategory = require("../../model/banner-category.model");
const Banner = require("../../model/banner.model");

const systemConfig = require('../../config/system');
const bannerPositionConfig = require("../../config/banner-position");

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
  const totalProduct = await Banner.countDocuments({
    deleted: false
  });
  const totalPage = Math.ceil(totalProduct / limitItem);
  //end pagination

  const banners = await Banner
  .find(find)
  .sort(sort)
  .limit(limitItem)
  .skip(skip);

  for(const banner of banners){
    const bannerCategory = await BannerCategory.findOne({
      _id: banner.category_id,
      deleted: false
    })

    if(bannerCategory){
      banner.bannerCategory = bannerCategory;
    }

    for(const key in bannerPositionConfig){
      if(key === banner.position){
        banner.position = bannerPositionConfig[key];
      }
    }
  }

  res.render("admin/pages/banners/index", {
    pageTitle: "Banner",
    banners: banners,
    totalPage: totalPage,
    currentPage: page
  })
}

module.exports.create = async (req, res) => {
  const listBannerCategory = await BannerCategory.find({
    deleted: false
  });

  res.render("admin/pages/banners/create", {
    pageTitle: "Thêm mới banner",
    listBannerCategory: listBannerCategory,
    bannerPosition: bannerPositionConfig
  })
}

module.exports.createPost = async (req, res) => {
  req.body.createdAt = new Date();
  req.body.createdBy = res.locals.user.id;

  if(!req.body.thumbnail){
    req.body.thumbnail = [];
  }

  const record = new Banner(req.body);
  await record.save();

  req.flash("success", "Thêm mới thành công");
  
  res.redirect(`/${systemConfig.prefixAdmin}/banners`)
}

module.exports.edit = async (req, res) => {
  const listBannerCategory = await BannerCategory.find({
    deleted: false
  });

  const banner = await Banner.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render("admin/pages/banners/edit", {
    pageTitle: "Chỉnh sửa banner",
    listBannerCategory: listBannerCategory,
    banner: banner,
    bannerPosition: bannerPositionConfig
  })
}

module.exports.editPatch = async (req, res) => {
  req.body.updatedAt = new Date();
  req.body.updatedBy = res.locals.user.id;

  if(!req.body.thumbnail){
    req.body.thumbnail = [];
  }
  
  await Banner.updateOne({
    _id: req.params.id
  }, req.body)

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");
}

// change status
module.exports.changeStatus = async (req, res) => {
  await Banner.updateOne({
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
      await Banner.updateMany({
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
      await Banner.updateMany({
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

//delete
module.exports.delete = async (req, res) => {
  await Banner.updateOne({
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
  await Banner.updateOne({
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

// detail
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const banner = await Banner.findOne({
    _id: id
  });

  const bannerCategory = await BannerCategory.findOne({
    _id: banner.category_id,
    deleted: false
  })

  if(bannerCategory){
    banner.bannerCategory = bannerCategory;
  }

  for(const key in bannerPositionConfig){
    if(key === banner.position){
      banner.position = bannerPositionConfig[key];
    }
  }

  res.render('admin/pages/banners/detail', {
    pageTitle: "Chi tiết sản phẩm",
    banner: banner
  });
}
// end detail