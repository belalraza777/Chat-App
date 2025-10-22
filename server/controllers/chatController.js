const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const { getIO, getReceiverSocketId } = require("../socket");

/**
 * Controller: Send a message
 * Creates a message, ensures a conversation exists, 
 * saves both, and emits real-time update via socket.io.
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;       // Message text from request body
    const { id: receiverId } = req.params; // Receiver user ID from route param
    const senderId = req.user._id;      // Logged-in user (from verifyAuth middleware)

    // 1. Find or create conversation between sender & receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // 2. Create a new message
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    // 3. Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // 4. Emit new message event if receiver is online
    const io = getIO();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // 5. Send success response
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Controller: Get messages between logged-in user and another user
 * Finds conversation and populates all messages.
 */
exports.getMessages = async (req, res) => {
  try {
    const { id: chatUser } = req.params; // The other user's ID
    const senderId = req.user._id;       // Logged-in user

    // Find the conversation between two users
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages"); // populate actual message objects

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("❌ Error in getMessages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Controller: Get all users except the logged-in user
 * Helps display potential chat users.
 */
exports.getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // Exclude current user, and don’t return password field
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("❌ Error in getUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
