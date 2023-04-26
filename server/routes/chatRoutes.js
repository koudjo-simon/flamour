const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const chatCtrl = require("../controllers/chatController");

const router = express.Router();

router.get("/getall", verifyToken, chatCtrl.getUserChat);
router.post("/getallmessages", verifyToken, chatCtrl.getChatMessage);
router.post("/createconversation", verifyToken, chatCtrl.createConversation);

module.exports = router;
