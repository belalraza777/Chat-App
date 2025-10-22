import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/notification.mp3";
import useConversation from "../store/zustand.js";

import { toast } from "react-toastify";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext(); // Get the socket instance from context
  const { addMessage, selectedConversation } = useConversation(); // Access conversation state from Zustand
  const notificationSound = new Audio(sound); // Create Audio instance for notification sound
  const { allUsers } = useConversation();

  useEffect(() => {
    if (!socket) return; // Guard: exit if socket is not initialized

    // Function to handle incoming messages from the socket
    const handleNewMessage = (newMessage) => {
      // Play notification sound for every new message
      notificationSound.play();

      // If no conversation is selected or message is from a different sender
      if (!selectedConversation || newMessage.senderId !== selectedConversation._id) {
        // Show a toast notification for messages not related to the current conversation
        toast.info(`Someone just sent you a message!`);
        return; // Stop further processing
      }

      // If message is for the selected conversation, update the state
      addMessage(newMessage);
    };

    // Subscribe to "newMessage" event from the socket
    socket.on("newMessage", handleNewMessage);

    // Cleanup: unsubscribe from the event when the component unmounts or dependencies change
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, addMessage, selectedConversation]); // Re-run effect if these dependencies change
};

export default useGetSocketMessage;
