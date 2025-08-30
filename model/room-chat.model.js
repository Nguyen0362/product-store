const mongoose = require('mongoose')
const roomChatSchema = new mongoose.Schema({
  title: String,
  typeRoom: String,
  users: Array,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
}, {
  timestamps: true,
});

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");
module.exports = RoomChat;