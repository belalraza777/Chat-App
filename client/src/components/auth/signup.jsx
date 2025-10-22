import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./auth.css";
import logo from "../../assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const { handleSignup, error } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });

  // loader state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle file input
  function handleFileChange(event) {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImage: file || null,
    }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare multipart form data
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      await handleSignup(data); // handleSignup must accept FormData
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div>
          <img src={logo} alt="Loading" className="logo" />
        </div>
        <h2 className="auth-title">Create your account to get started</h2>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          encType="multipart/form-data"
        >
          {/* Profile Pic Upload */}
          <div className="avatar-upload">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleFileChange}
              accept="image/*"
              className="avatar-input"
            />
            <label htmlFor="profileImage" className="avatar-label">
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Preview"
                  className="avatar-preview"
                />
              ) : (
                <span className="avatar-placeholder">+</span>
              )}
            </label>
            <p className="avatar-text">Upload Profile Picture</p>
          </div>
     

      {/* Username */}
      <div className="auth-field">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
          placeholder="Choose a username"
          minLength={3}
          maxLength={30}
          className="auth-input"
        />
      </div>

      {/* Email */}
      <div className="auth-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="auth-input"
        />
      </div>

      {/* Password */}
      <div className="auth-field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="auth-input"
        />
      </div>

      {/* Error */}
      {error && <div className="auth-error">{error}</div>}

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="auth-button">
        {isLoading ? (
          <span className="fas fa-spinner fa-spin"></span>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Footer */}
      <div className="auth-footer">
        <span>Already have an account? </span>
        <Link to="/login">Sign in</Link>
      </div>
    </form>
      </div >
    </div >
  );
}
