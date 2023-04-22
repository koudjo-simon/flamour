const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const chatCtrl = require("../controllers/chatController");

const router = express.Router();

router.post("/getall", verifyToken, chatCtrl.getUserChat);

module.exports = router;
