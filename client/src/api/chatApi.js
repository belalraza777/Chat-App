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
// Send a message to a specific user (supports text and file)
// Send a message to a specific user (supports text, image, video, audio, link)
// message = { content, type, file }
export function sendMessage(userId, { content, type = "text", file }) {
  const formData = new FormData();
  if (content) formData.append("content", content);
  if (type) formData.append("type", type);
  if (file) formData.append("file", file);
  return axios.post(`${API_BASE}/send/${userId}`,
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}
