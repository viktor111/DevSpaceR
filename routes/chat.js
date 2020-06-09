const express = require('express');
const router = express.Router();
const ChatController = require("../Controllers/ChatController")

router.get("/Main", ChatController.GetMain)

module.exports = router;