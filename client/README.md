
# Chat App Client

This is the **React** frontend for the Chat App. It provides a modern, responsive chat interface with authentication, real-time messaging, and user experience enhancements.

## Features
- User authentication (signup, login, logout)
- Real-time chat using Socket.IO
- User list and online status
- Responsive design for desktop and mobile
- Skeleton loader for loading states
- Toast notifications (via `react-toastify`)

## Tech Stack
- React 19
- Vite
- Zustand (state management)
- Socket.IO Client
- Axios
- Tailwind CSS (optional, can use raw CSS)

## Getting Started

1. **Install dependencies:**
	```sh
	npm install
	```
2. **Start the development server:**
	```sh
	npm run dev
	```
3. **Build for production:**
	```sh
	npm run build
	```

## Project Structure
- `src/components/` — React components (auth, chat, main, loader, etc.)
- `src/context/` — React context (auth)
- `src/api/` — API utilities
- `public/` — Static assets

## Customization
- Update avatar images in `User` and `ChatUser` components for real user avatars.
- Edit CSS in each component folder for custom styles.

---

For backend setup, see the `server/` folder.
