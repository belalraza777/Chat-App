import React, { useState } from 'react';
import './rightPart.css';
import useConversation from '../../../store/zustand';

export default function Input() {
  const { sendingMessage, sendMessage } = useConversation();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("text");

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && !file) {
      return; // Don't submit empty
    }
    try {
      sendMessage({
        content: message,
        type: file ? type : "text",
        file: file,
      });
      setMessage("");
      setFile(null);
      setType("text");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Set type based on file type
      if (selectedFile.type.startsWith("image")) setType("image");
      else if (selectedFile.type.startsWith("video")) setType("video");
      else if (selectedFile.type.startsWith("audio")) setType("audio");
      else setType("file");
    } else {
      setFile(null);
      setType("text");
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
        disabled={!!file}
      />
      <label className="input__file-label" title="Attach file">
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="input__file"
          aria-label="Attach file"
        />
        <i className="fa-solid fa-paperclip"></i>
      </label>
      {file && (
        <span className="input__file-name" title={file.name}>{file.name}</span>
      )}
      <button
        type="submit"
        disabled={sendingMessage || (!message.trim() && !file)}
        className="input__button"
        aria-label="Send message"
      >
        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
        <span className="sr-only">Send</span>
      </button>
    </form>
  );
}