import React, { useEffect,useState } from 'react';
import { useAuth } from '../../../context/authContext';
import Header from './header';
import Users from './users';
import Logout from '../../auth/logout';
import axios from 'axios';
import './leftPart.css';

export default function Left() {
  const { user } = useAuth();
  
  return (
    <div className="left">
      <Header />
      <div className="left__body">
        <Users/>
      </div>

      <footer className="left__footer">
        <div className="left__footer-user">
          <span className="left__footer-label">Logged in as:</span>
          <span className="left__footer-username">{user?.username || 'Guest'}</span>
        </div>
        <div className="left__footer-logout">
          <Logout />
        </div>
      </footer>
    </div>
  );
}
