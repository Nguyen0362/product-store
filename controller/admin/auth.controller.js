const system = require("../../../product-management/config/system");
const { prefixAdmin } = require("../../../product-management/config/system");
const Account = require("../../model/account.model");
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render("admin/pages/auths/login", {
    pageTitle: "Đăng nhập"
  });
}

module.exports.loginPost = async (req, res) => {
  const {email, password} = req.body;
  const user = await Account.findOne({
    email: email,
    deleted: false
  });

  if(!user){
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }

  if(user.status == "inactive"){
    req.flash("error", "Tài khoản đã dừng hoạt động");
    res.redirect("back");
    return;
  }

  if(md5(password) != user.password){
    req.flash("error", "Sai mật khẩu");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.token);
  
  await Account.updateOne({
    email: email
  }, {
    statusOnline: "online"
  });

  _io.once("connection", (socket) => {
    _io.emit("SERVER_RETURN_STATUS_ONLINE", {
      userId: user.id,
      statusOnline: "online"
    });
  })
  res.redirect(`/${prefixAdmin}/dashboards`);
}

module.exports.logout = async (req, res) => {
  const user = await Account.findOne({
    token: req.cookies.tokenUser,
  });

  await Account.updateOne({
    token: req.cookies.tokenUser
  }, {
    statusOnline: "offline"
  });

  _io.once("connection", (socket) => {
    _io.emit("SERVER_RETURN_STATUS_ONLINE_USER", {
      userId: user.id,
      statusOnline: "offline"
    })
  })

  res.clearCookie("tokenUser");
  res.redirect(`/${system.prefixAdmin}/auths/login`);
}