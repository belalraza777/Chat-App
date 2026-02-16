require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize app
const app = express();
const server = createServer(app);

// Initialize Socket.IO
//socket setup
const { initSocket } = require('./socket');
initSocket(server);  // Initialize Socket.IO 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

// Mongoose setup
mongoose.connect("mongodb://127.0.0.1:27017/ChatApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
const authRouter = require('./routers/auth');
const chatRouter = require('./routers/chat');
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
