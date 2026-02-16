import { useSocketContext } from "../../../context/socketContext";
import useConversation from "../../../store/zustand";
import './rightPart.css';


export default function ChatUser() {

  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  if (!selectedConversation) {
    return (
      <div className="chatuser-empty">
        <div className="chatuser-empty__icon">
          <i className="fa-regular fa-comments"></i>
        </div>
        <h2 className="chatuser-empty__title">Your messages</h2>
        <p className="chatuser-empty__subtitle">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    );
  }

  return (
    <header className="chatuser">
      {/* Back button (visible on mobile) */}
      <button
        className="chatuser__back"
        onClick={() => setSelectedConversation(null)}
        aria-label="Back to users"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* Avatar with online indicator */}
      <div className="chatuser__avatar">
        <img src={selectedConversation?.profileImage.url || "dp"} alt="User Avatar" />

        <span
          className={`status-indicator ${isOnline ? "online" : "offline"}`}
        ></span>
      </div>

      <div className="chatuser__meta">
        <h1>{selectedConversation.username}</h1>
        <p className={isOnline ? "online-text" : "offline-text"}>
          {isOnline ? "online" : "offline"}
        </p>
      </div>
    </header>
  );
}
