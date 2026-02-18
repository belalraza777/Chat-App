const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../util/verifyAuth");
const asyncWrap = require("../util/asyncWrap");
const {
  sendMessage,
  getMessages,
  getUsers,
} = require("../controllers/chatController");
const upload = require("../util/upload");


// Send a message to a specific user
router.post("/send/:id", verifyAuth, upload.single("file"), asyncWrap(sendMessage));

// Get conversation messages with a specific user
router.get("/get/:id", verifyAuth, asyncWrap(getMessages));

// Get all users except the logged-in user
router.get("/users", verifyAuth, asyncWrap(getUsers));

module.exports = router;
