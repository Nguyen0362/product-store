const Account = require("../model/account.model");
const Chat = require("../model/chat.model");
const moment = require('moment');

module.exports = () => {
  _io.on("connection", (socket) => {
    socket.on("JOIN_ROOM_CHAT", (data) => {
      socket.join(data)
    })

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const dataChat = {
        userId: data.userId,
        content: data.content,
        roomChatId: data.roomChatId
      }

      const chat = new Chat(dataChat);
      await chat.save();

      const inforUser = await Account.findOne({
        _id: data.userId,
        deleted: false
      });

      dataChat.avatar = inforUser.avatar;
      if(chat.createdAt){
        dataChat.createdAtFormat = moment(chat.createdAt).format("HH:mm - DD/MM/YYYY");
      }

      _io.to(data.roomChatId).emit("SERVER_RETURN_MESSAGE", dataChat)
    });

    socket.on("CLIENT_SEND_TYPING", (data) => {
      socket.broadcast.to(data.roomChatId).emit("SERVER_RETURN_TYPING", {
        type: data.type,
        userId: data.userId,
        roomChatId: data.roomChatId,
      });
    })
  });
}