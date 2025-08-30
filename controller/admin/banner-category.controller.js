const BannerCategory = require("../../model/banner-category.model"); 
const Banner = require("../../model/banner.model");

const system = require("../../config/system");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

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
  const totalProduct = await BannerCategory.countDocuments({
    deleted: false
  });
  const totalPage = Math.ceil(totalProduct / limitItem);
  //end pagination

  const listBannerCategory = await BannerCategory
  .find(find)
  .limit(limitItem)
  .skip(skip);

  res.render("admin/pages/banner-category/index", {
    pageTitle: "Danh mục banner",
    listBannerCategory: listBannerCategory,
    totalPage: totalPage,
    currentPage: page
  })
}

module.exports.create = (req, res) => {
  res.render("admin/pages/banner-category/create", {
    pageTitle: "Tạo mới danh mục banner"
  })
}

module.exports.createPost = async (req, res) => {
  const record = new BannerCategory(req.body);
  record.save();

  req.flash("success", "Thêm mới thành công");

  res.redirect(`/${system.prefixAdmin}/banner-category`);
}

module.exports.edit = async (req, res) => {
  const category = await BannerCategory.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render("admin/pages/banner-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    category: category
  })
}

module.exports.editPatch = async (req, res) => {
  await BannerCategory.updateOne({
    _id: req.params.id
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");
}

module.exports.delete = async (req, res) => {
  const exist = await Banner.findOne({
    category_id: req.params.id,
    deleted: false
  });

  if(exist){
    req.flash("error", "Danh mục đã được sử dụng, không thể xóa");
    res.json({
      code: "success"
    })
    return;
  }

  await BannerCategory.updateOne({
    _id: req.params.id
  }, {
    deleted: true
  });

  req.flash("success", "Xóa thành công");

  res.json({
    code: "success"
  })
}

module.exports.detail = async (req, res) => {
  const category = await BannerCategory.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render('admin/pages/banner-category/detail', {
    pageTitle: "Chi tiết danh mục banner",
    category: category
  });
}