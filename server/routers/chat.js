const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../util/verifyAuth");
const {
  sendMessage,
  getMessages,
  getUsers,
} = require("../controllers/chatController");


// Send a message to a specific user
router.post("/send/:id", verifyAuth, sendMessage);

// Get conversation messages with a specific user
router.get("/get/:id", verifyAuth, getMessages);

// Get all users except the logged-in user
router.get("/users", verifyAuth, getUsers);

module.exports = router;
