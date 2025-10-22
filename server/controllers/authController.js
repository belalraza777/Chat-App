const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// Generate JWT Helper
function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage?.url,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      username,
      password: hash,
      profileImage: {
        url: req.file?.path,
        filename: req.file?.filename,
      },
    });

    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage?.url,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
        profileImage: user.profileImage?.url,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ success: true, message: "Logout successful" });
};

// Check Auth Controller
exports.checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    res.status(200).json({ authenticated: true, data: decoded });
  });
};
