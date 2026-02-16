import React from 'react';
import ChatUser from './chatUser';
import Messages from './messages';
import Input from './input';
import useConversation from '../../../store/zustand';
import './rightPart.css';

export default function Right() {
  const { selectedConversation } = useConversation();

  return (
    <main className="right">
      {selectedConversation ? (
        <>
          <ChatUser />
          <Messages />
          <Input />
        </>
      ) : (
        <ChatUser />
      )}
    </main>
  );
}
