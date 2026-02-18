const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const imagekit = require("../config/imageKit");

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
};

// Generate JWT Helper
function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// Signup Controller
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);


  let profileImage = undefined;
  if (req.file) {
    // Upload profile image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
      folder: "chat_uploads",
    });
    profileImage = {
      url: uploadResponse.url,
      public_id: uploadResponse.fileId,
    };
  }

  const user = new User({
    email,
    username,
    password: hash,
    profileImage,
  });

  await user.save();

  const token = generateToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

  const token = generateToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);

  res.json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ success: true, message: "Logout successful" });
};

// Check Auth Controller — reuses verifyAuth middleware on the route
exports.checkAuth = (req, res) => {
  // req.user is already set by verifyAuth middleware
  res.status(200).json({ authenticated: true, data: req.user });
};

// Update Profile Controller
// This allows users to update their username and/or profile image
exports.updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { username } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // Update username if provided
  if (username && username !== user.username) {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }
    user.username = username;
  }

  // Update profile image if a new file was uploaded
  if (req.file) {
    // Delete old image from ImageKit if exists
    if (user.profileImage && user.profileImage.public_id) {
      try {
        await imagekit.deleteFile(user.profileImage.public_id);
      } catch (err) {
        console.error("ImageKit deletion error:", err);
      }
    }
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
      folder: "chat_uploads",
    });
    user.profileImage = {
      url: uploadResponse.url,
      public_id: uploadResponse.fileId,
    };
  }

  await user.save();

  // Re-issue token with updated info
  const token = generateToken(user);
  res.cookie("token", token, COOKIE_OPTIONS);

  res.json({
    success: true,
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
};
