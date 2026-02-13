import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";
import useConversation from "../../../store/zustand";
import Loader from "../../common/Loader";
import "./rightPart.css";

export default function Messages() {
  const { getMessages, loadingMessages, fetchMessages, selectedConversation } = useConversation();
  const messages = getMessages();

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation, fetchMessages]);

  console.log("Messages:", messages);
  return (
    <ScrollToBottom className="messages">
      {loadingMessages ? (
        <Loader />
      ) : messages.length > 0 ? (
        messages.map((msg) => (
          <Message key={msg._id} senderId={msg.senderId} message={msg} />
        ))
      ) : (
        <p className="no-messages">No messages yet</p>
      )}
    </ScrollToBottom>
  );
}
