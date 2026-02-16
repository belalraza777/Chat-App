// /api/userApi.js
import axios from "axios";

const API_BASE = "http://localhost:3000/api/auth"; // set your backend base URL here if needed

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Signup user
export function signupUser(formData) {
 return axios.post("http://localhost:3000/api/auth/signup", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data", // tell backend it's form data
    }, 
  });
}

// Login user
export function loginUser({email, password}) {
  return axiosInstance.post("/login", { email, password });
}

// Logout user
export function logoutUser() {
  return axiosInstance.get("/logout");
}

// Check current user (call /me)
export const getCurrentUser = async () => {
  return axiosInstance.get("/check"); // returns { authenticated: true, data: user }
};

// Update profile (username + avatar)
export function updateProfile(formData) {
  return axios.put("http://localhost:3000/api/auth/profile", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
