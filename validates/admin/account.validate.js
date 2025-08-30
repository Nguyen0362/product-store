const Account = require("../../model/account.model")

module.exports.createPost = async (req, res, next) => {
  const email = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if(email){
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }

  next();
}