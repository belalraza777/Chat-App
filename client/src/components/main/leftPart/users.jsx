import React from 'react';
import User from './user';
import useGetAllUsers from '../../../context/getAllUsers';
import Loader from '../../common/Loader';
import './leftPart.css';
import { useSocketContext } from '../../../context/socketContext';

export default function Users() {
  const { allUsers, loading } = useGetAllUsers();
  const { onlineUsers } = useSocketContext();

  return (
    <div className="left__users">
      {loading ? (
        <Loader type="user-list" count={5} />
      ) : (
        allUsers.map((user) => (
          <User key={user._id} user={user} isOnline={onlineUsers.includes(user._id)} />
        ))
      )}
    </div>
  );
}
