const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const imagekit = require("../config/imageKit");
const { getIO, getReceiverSocketId } = require("../socket");

/**
 * Controller: Send a message
 * Creates a message, ensures a conversation exists, 
 * saves both, and emits real-time update via socket.io.
 */
exports.sendMessage = async (req, res) => {
  // Extract message details from request
  const { content, type } = req.body; //for text or link messages
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  // Find existing conversation or create new one
  let conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
  }
  // Determine message type and handle file upload if present
  let messageType = type || "text";
  let fileUrl = null;
  let messageContent = content || null;

  // If file exists → upload to ImageKit
  if (req.file) {
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
      folder: "chat_uploads",
    });
    // Set the file URL in the message and determine the message type based on MIME type
    fileUrl = uploadResponse.url;
    const mime = req.file.mimetype;
    if (mime.startsWith("image")) messageType = "image";
    else if (mime.startsWith("video")) messageType = "video";
    else if (mime.startsWith("audio")) messageType = "audio";
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    type: messageType,
    content: messageContent,
    fileUrl,
  });

  conversation.messages.push(newMessage._id);
  await Promise.all([newMessage.save(), conversation.save()]);

  const io = getIO();
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
};

/**
 * Controller: Get messages between logged-in user and another user
 * Finds conversation and populates all messages.
 */
exports.getMessages = async (req, res) => {
  const { id: chatUser } = req.params; // The other user's ID
  const senderId = req.user._id;       // Logged-in user

  // Find the conversation between two users
  const conversation = await Conversation.findOne({
    members: { $all: [senderId, chatUser] },
  }).populate("messages"); // populate actual message objects

  if (!conversation) return res.status(200).json([]);

  res.status(200).json(conversation.messages);
};

/**
 * Controller: Get all users except the logged-in user
 * Helps display potential chat users.
 */
exports.getUsers = async (req, res) => {
  const loggedInUser = req.user._id;

  // Exclude current user, and don't return password field
  const filteredUsers = await User.find({
    _id: { $ne: loggedInUser },
  }).select("-password");

  res.status(200).json(filteredUsers);
};
