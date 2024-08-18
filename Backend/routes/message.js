const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessagesWithUser,
} = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

router.get("/:otherUserId", verifyToken, getMessagesWithUser);

module.exports = router;
