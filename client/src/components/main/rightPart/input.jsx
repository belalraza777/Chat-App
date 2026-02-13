import React, { useState } from 'react';
import './rightPart.css';
import useConversation from '../../../store/zustand';

export default function Input() {
  const { sendingMessage, sendMessage } = useConversation();

  const [message, setMessage] = useState('');


  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!message.trim()) {
      return; // Don't submit empty messages
    }
    try {
      sendMessage(message); // Send the message
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input__field"
        aria-label="Message input"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="input__button"
        aria-label="Send message"
      >
        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
        <span className="sr-only">Send</span>
      </button>
    </form>
  );
}