const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  token: String,
  avatar: String,
  role_id: String,
  status: String,
  friendList: Array,
  statusOnline: String,
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Account = mongoose.model("Account", accountSchema, "accounts");
module.exports = Account;