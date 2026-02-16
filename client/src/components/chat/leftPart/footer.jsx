import React from 'react';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '?';

  return (
    <footer className="left__footer" onClick={() => navigate('/profile')} title="View profile">
      <div className="left__footer-avatar">
        {user?.profileImage ? (
          <img
            src={user.profileImage.url}
            alt={user.username}
            className="left__footer-avatar-img"
          />
        ) : (
          <span className="left__footer-avatar-fallback">{initials}</span>
        )}
        <span className="left__footer-status"></span>
      </div>

      <div className="left__footer-info">
        <span className="left__footer-username">{user?.username || 'Guest'}</span>
        <span className="left__footer-label">
          <span className="left__footer-dot"></span>
          Active now
        </span>
      </div>

      <span className="left__footer-chevron">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
    </footer>
  );
}
