import { useEffect, useRef } from "react";
import Message from "./message";
import useConversation from "../../../store/zustand";
import Loader from "../../common/Loader";
import "./rightPart.css";

export default function Messages() {
  const { getMessages, loadingMessages, fetchMessages, selectedConversation } =
    useConversation();

  const messages = getMessages();
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation, fetchMessages]);

  // Auto scroll whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {loadingMessages ? (
        <Loader />
      ) : messages.length > 0 ? (
        messages.map((msg) => (
          <Message key={msg._id} senderId={msg.senderId} message={msg} />
        ))
      ) : (
        <p className="no-messages">No messages yet</p>
      )}

      {/* invisible anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
