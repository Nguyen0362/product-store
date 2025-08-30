const Role = require("../../model/role.model");

const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  })

  res.render('admin/pages/roles/index', {
    pageTitle: "Nhóm quyền",
    roles: roles
  });
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới nhóm quyền"
  });
}

module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

  req.flash("success", "Tạo mới thành công");
  res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const roleInfor = await Role.findOne({
    _id: id,
    deleted: false
  });

  res.render("admin/pages/roles/edit", {
    pageTitle: "Chỉnh sửa nhóm quyền",
    roleInfor: roleInfor
  });
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({
    _id: id
  }, req.body);

  req.flash("success", "Chỉnh sửa thành công");

  res.redirect("back");
}

module.exports.delete = async (req, res) => {
  await Role.updateOne({
    _id: req.body.id
  }, {
    deleted: true
  });

  req.flash("success", "Xóa thành công");

  res.json({
    code: "success"
  });
}

module.exports.detail = async (req, res) => {
  const roles = await Role.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render('admin/pages/roles/detail', {
    pageTitle: "Chi tiết nhóm quyền",
    roles: roles
  });
}

module.exports.permission = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  });

  res.render('admin/pages/roles/permission', {
    pageTitle: "Phân quyền",
    roles: roles
  });
}

module.exports.permissionPatch = async (req, res) => {
  for (const item of req.body) {
    await Role.updateOne({
      _id: item.id,
      deleted: false
    }, {
      permissions: item.permissions
    }) ;
  }

  req.flash("success", "Cập nhật thành công");
  res.json({
    code: "success"
  });
}