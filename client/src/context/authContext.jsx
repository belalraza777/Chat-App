import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, logoutUser, getCurrentUser, updateProfile } from "../api/authApi";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // store current user
  const [loading, setLoading] = useState(true); // loading while checking auth
  const [error, setError] = useState("");

  // ------------------ AUTO LOGIN ON REFRESH ------------------
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.data); // set user from backend
      } catch (err) {
        toast.error("Session expired. Please log in again.");
        setUser(null); // not logged in or token invalid
      } finally {
        setLoading(false); // done checking
      }
    };

    checkUser();
  }, []);

  // ------------------ LOGIN ------------------
  const handleLogin = async (credentials) => {
    try {
      await loginUser(credentials);
      const me = await getCurrentUser();
      setUser(me.data.data);
      toast.success("Logged in successfully!");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async (credentials) => {
    try {
      await signupUser(credentials);
      const me = await getCurrentUser();
      setUser(me.data.data);
      toast.success("Account created successfully!");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  // ------------------ LOGOUT ------------------
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Logout failed. Please try again.");
      console.error("Logout failed", err);
    }
  };

  // ------------------ UPDATE PROFILE ------------------
  const handleUpdateProfile = async (formData) => {
    try {
      const res = await updateProfile(formData);
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed.");
      return { success: false, message: err.response?.data?.message || "Update failed" };
    }
  };

  console.log("LOGIN user: ",user);
  

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogin, handleSignup, handleLogout, handleUpdateProfile }}>
      {!loading && children} {/* render app only after checking user */}
    </AuthContext.Provider>
  );
};

// ------------------ CUSTOM HOOK ------------------
export const useAuth = () => useContext(AuthContext);
