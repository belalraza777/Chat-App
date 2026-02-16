import React, { useEffect } from 'react';
import User from './user';
import useConversation from '../../../store/zustand';
import Loader from '../../common/Loader';
import './leftPart.css';
import { useSocketContext } from '../../../context/socketContext';

export default function Users() {
  const { allUsers, loadingUsers, fetchAllUsers } = useConversation();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="left__users">
      {loadingUsers ? (
        <Loader type="user-list" count={5} />
      ) : (
        allUsers.map((user) => (
          <User key={user._id} user={user} isOnline={onlineUsers.includes(user._id)} />
        ))
      )}
    </div>
  );
}
