const express = require("express");
const router = express.Router();
const {
  getMessages,
  toggleReadState,
  updateUserStatusOnReply,
} = require("../controllers/messageController");

// Get all messages
router.get("/messages", getMessages);

// Toggle read state
router.patch("/messages/:id/toggle-read", toggleReadState);

// Reply and update userstatus
router.patch("/messages/:id/reply", updateUserStatusOnReply);

module.exports = router;
