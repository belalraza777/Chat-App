import axios from "axios";

const API_BASE = "http://localhost:3000/api/chat";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all users for chat list
export function getAllUsers() {
  return axiosInstance.get("/users");
}

// Get messages for a specific conversation
export function getMessages(userId) {
  return axiosInstance.get(`/get/${userId}`);
}

// Send a message to a specific user
export function sendMessage(userId, message) {
  return axiosInstance.post(`/send/${userId}`, { message });
}
