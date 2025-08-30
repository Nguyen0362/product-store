const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const RoomChat = require('../../model/room-chat.model');

const md5 = require("md5");
const moment = require("moment");
const generateHelper = require("../../helper/generate.helper");
const systemConfig = require("../../config/system");

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
    find.fullName = regex;
  }
  // End search

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
  const totalCategory = await Account.countDocuments({
    deleted: false
  });
  const totalPage = Math.ceil(totalCategory / limitItem);
  //end pagination

  const accounts = await Account
  .find(find)
  .limit(limitItem)
  .skip(skip);

  for(const account of accounts){
    const role = await Role.findOne({
      _id: account.role_id,
      deleted: false
    });

    account.role_title = role.title;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Tài khoản",
    accounts: accounts,
    totalPage: totalPage,
    currentPage: page
  });
}

module.exports.create = async (req, res)=> {
  const roles = await Role.find({
    deleted: false
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Thêm mới tài khoản",
    roles: roles
  });
}

module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  req.body.token = generateHelper.generateRandomString(30);

  const record = new Account(req.body);
  await record.save();

  const accounts = await Account.find({
    _id: { $ne: record.id },
    deleted: false
  });


  const friendList = [];
  for (const account of accounts) {
    console.log(account.fullName)
    const roomChat = new RoomChat({
      typeRoom: "friend",
      users: [
        {
          accountId: record.id,
          roleId: record.role_id
        },
        {
          accountId: account.id,
          roleId: account.role_id
        }
      ]
    });
    
    friendList.push({
      accountId: account.id,
      roomChatId: roomChat.id
    });

    await Account.updateOne({ 
      _id: account.id 
    }, {
      $push: {
        friendList: {
          accountId: record.id,
          roomChatId: roomChat.id
        }
    }
});

    await roomChat.save();
  }

  await Account.updateOne({
    _id: record.id
  },{
    friendList: friendList
  });

  req.flash("success", "Thêm mới thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

module.exports.edit = async (req, res)=> {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false
  });

  const roles = await Role.find({
    deleted: false
  });

  res.render("admin/pages/accounts/edit", {
    pageTitle: "Chỉnh sửa tài khoản",
    roles: roles,
    account: account
  });
}

module.exports.editPatch = async (req, res) => {
  if(req.body.removeImage == "true" && !req.body.avatar){
    req.body.avatar = "";
  }

  await Account.updateOne({
    _id: req.params.id
  }, req.body);

  req.flash("success", "Cập nhật thành công");

  res.redirect("back");
}

module.exports.delete = async (req, res) => {
  await Account.updateOne({
    _id: req.body.id
  }, {
    deleted: true
  });

  req.flash("success", "Đã xóa thành công");

  res.json({
    code: "success"
  });
}

module.exports.changePassword = async (req, res) => {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render("admin/pages/accounts/change-password", {
    pageTitle: "Đổi mật khẩu",
    account: account
  });
}

module.exports.changePasswordPatch = async (req, res) => {
  const password = md5(req.body.password);

  await Account.updateOne({
    _id: req.params.id
  }, {
    password: password
  });

  req.flash("success", "Đổi mật khẩu thành công");

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

module.exports.detail = async (req, res) => {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false
  });

  const role = await Role.findOne({
    _id: account.role_id,
    deleted: false
  });

  res.render("admin/pages/accounts/detail", {
    pageTitle: "Thông tin tài khoản",
    account: account,
    role: role
  });
}

module.exports.friend = async (req, res) => {
  const friendList = res.locals.user.friendList;
  
  const accounts = [];
  for(const account of friendList){
    const infoAccount = await Account.findOne({
      _id: account.accountId,
      deleted: false,
      status: "active"
    });
    
    accounts.push({
      id: infoAccount.id,
      fullName: infoAccount.fullName,
      avatar: infoAccount.avatar,
      roomChatId: account.roomChatId,
      statusOnline: infoAccount.statusOnline
    });
  }

  res.json({
    accounts: accounts,
    userId: res.locals.user.id,
    prefixAdmin: systemConfig.prefixAdmin
  });
}