# Chat App

A full-stack real-time chat application with authentication, user management, and modern UI/UX.

## Features
- User authentication (signup, login, logout)
- Real-time messaging with Socket.IO
- User list and online status
- New Message notifications
- Skeleton loader for loading states
- Toast notifications
- MongoDB for data storage

## Tech Stack
- **Frontend:** React, Vite, Zustand, Socket.IO Client, Axios, ( raw CSS)
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, bcrypt

## Monorepo Structure
```
Chat App/
├── client/   # React frontend
├── server/   # Node.js backend
```

## Getting Started

### 1. Clone the repository
```sh
git clone <repo-url>
cd "Chat App"
```

### 2. Setup the Backend
```sh
cd server
npm install
# Create a .env file with your MongoDB URI and JWT secret
node index.js
```

### 3. Setup the Frontend
```sh
cd ../client
npm install
npm run dev
```

## Folder Overview
- `client/` — React app (components, context, API, assets)
- `server/` — Express server (models, routes, socket, config)

## Customization
- Update avatar images in `User` and `ChatUser` components for real user avatars.
- Edit CSS in each component folder for custom styles.

---

For detailed setup, see the `README.md` in each subfolder.
