const Chat = require("../../model/chat.model");
const Account = require("../../model/account.model");
const moment = require('moment');

module.exports.index = async (req, res) => {
  const roomChatId = req.params.roomChatId;

  const chats = await Chat.find({
    roomChatId: roomChatId,
    deleted: false
  }).lean();

  for (const chat of chats) {
    const infoUser = await Account.findOne({
      _id: chat.userId
    });

    if(chat.createdAt){
      chat.createdAtFormat = moment(chat.createdAt).format("HH:mm - DD/MM/YYYY");
    }

    chat.fullName = infoUser.fullName;
    chat.avatar = infoUser.avatar;
  }

  res.json({
    chats: chats
  });
}

