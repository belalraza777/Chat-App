import React from 'react';
import ChatUser from './chatUser';
import Messages from './messages';
import Input from './input';
import './rightPart.css';

export default function Right() {
  return (
    <main className="right">
      <ChatUser />
      <Messages />
      <Input />
    </main>
  );
}
