# Chat App Server

This is the **Node.js/Express** backend for the Chat App. It handles authentication, user management, conversations, messages, and real-time communication via Socket.IO.

## Features
- User authentication (JWT)
- User registration and login
- Real-time messaging with Socket.IO
- MongoDB for data storage (users, conversations, messages)
- CORS and cookie handling

## Tech Stack
- Node.js
- Express
- MongoDB (via Mongoose)
- Socket.IO
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- dotenv (environment variables)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the `server/` folder with your MongoDB URI, JWT secret, etc.
3. **Start the server:**
   ```sh
   node index.js
   ```

## Project Structure
- `model/` — Mongoose models (User, Conversation, Message)
- `routers/` — Express routes (auth, etc.)
- `socket.js` — Socket.IO server logic
- `index.js` — Main server entry point

---

For frontend setup, see the `client/` folder.
