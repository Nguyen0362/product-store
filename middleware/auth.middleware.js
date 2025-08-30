const system = require("../../product-management/config/system");
const Account = require("../model/account.model");
const Role = require("../model/role.model");

module.exports.requiredAuth = async (req, res, next) => {
  if(!req.cookies.tokenUser){
    res.redirect(`/${system.prefixAdmin}/auths/login`);
    return;
  }

  const user = await Account.findOne({
    token: req.cookies.tokenUser,
    deleted: false,
    status: "active"
  });

  if(!user){
    res.redirect(`/${system.prefixAdmin}/auths/login`);
    return;
  }

  const role = await Role.findOne({
    _id: user.role_id,
    deleted: false
  });

  res.locals.role = role;
  res.locals.user = user;
  next();
}