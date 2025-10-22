import { useSocketContext } from "../../../context/socketContext";
import useConversation from "../../../store/zustand";
import './rightPart.css';
// import {Dp} from '../../../assets/defaultDP.jpg';


export default function ChatUser() {

  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
console.log(selectedConversation);

  const isOnline = selectedConversation
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  return (
    <header className="chatuser">
      {/* Avatar with online indicator */}
      <div className="chatuser__avatar">
        <img src={selectedConversation?.profileImage.url || "dp"} alt="User Avatar" />

        <span
          className={`status-indicator ${isOnline ? "online" : "offline"}`}
        ></span>
      </div>

      <div className="chatuser__meta">
        <h1>{selectedConversation?.username || "Please Select User to Chat"}</h1>
        <p className={isOnline ? "online-text" : "offline-text"}>
          {selectedConversation ? isOnline ? "online" : "offline" : ""}
        </p>
      </div>
    </header>
  );
}
