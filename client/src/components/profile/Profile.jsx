import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import defaultAvatar from "../../assets/defaultDP.jpg";
import Logout from "../auth/logout";

export default function Profile() {
  const { user, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [preview, setPreview] = useState(user?.profileImage?.url || user?.profileImage || defaultAvatar);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    if (username !== user?.username) {
      formData.append("username", username);
    }
    if (file) {
      formData.append("profileImage", file);
    }

    await handleUpdateProfile(formData);
    setSaving(false);
  };

  // Determine if there are changes to enable the save button
  const hasChanges = username !== (user?.username || "") || file !== null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Back button */}
        <button className="profile-back" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <h2 className="profile-title">Manage Profile</h2>

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Avatar */}
          <div className="profile-avatar-section">
            <label htmlFor="avatar-upload" className="profile-avatar-label">
              <img
                src={preview || "https://via.placeholder.com/100"}
                alt="Profile"
                className="profile-avatar-img"
              />
              <span className="profile-avatar-overlay">
                <i className="fa-solid fa-camera"></i>
              </span>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-avatar-input"
            />
            <p className="profile-avatar-hint">Click to change photo</p>
          </div>

          {/* Username */}
          <div className="profile-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
              maxLength={30}
              className="profile-input"
            />
          </div>

          {/* Email (read-only) */}
          <div className="profile-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="profile-input profile-input--disabled"
            />
            <small className="profile-hint">Email cannot be changed</small>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={!hasChanges || saving}
            className="profile-save"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
        <hr className="hr"/>
        <div className="profile-logout">
          <Logout />
        </div>
      </div>
    </div>
  );
}
