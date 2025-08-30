const express = require('express');
const router = express.Router();

const controller = require("../../controller/admin/chat.controller");

router.get("/:roomChatId", controller.index);

module.exports = router;