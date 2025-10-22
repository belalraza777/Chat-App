import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";
import useGetMessage from "../../../context/getMessages";
import Loader from "../../common/Loader";
import "./rightPart.css";
import useGetSocketMessage from "../../../context/getSocketMesaage";

export default function Messages() {
  useGetSocketMessage(); // Custom hook to handle incoming socket messages
  const { loading, messages } = useGetMessage();
  
  console.log("Messages:", messages);
  return (
    <ScrollToBottom className="messages">
      {loading ? (
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
