import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import io from "socket.io-client";
import useConversation from "../store/zustand.js";
import sound from "../assets/notification.mp3";
import { toast } from "react-toastify";

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    //socket state to hold the socket instance 
    const [socket, setSocket] = useState(null);
    // State to hold the list of online users
    const [onlineUsers, setOnlineUsers] = useState([]);
    // Get the authenticated user from the auth context
    const { user } = useAuth();

    // ─── Init socket & listen for online users ───
    useEffect(() => {
        // If user is authenticated, establish socket connection
        if (user) {
            const socket = io("http://localhost:3000", {
                query: {
                    userId: user._id,
                },
            });
            setSocket(socket);
            // Listen for the list of online users from the server
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);


    // ─── Listen for new messages ───
    useEffect(() => {
        if (!socket) return;

        // Function to handle incoming messages from the socket
        const handleNewMessage = (newMessage) => {
            const notificationSound = new Audio(sound);
            notificationSound.play();

            const { selectedConversation, addMessageToUser, incrementUnreadCount, allUsers } = useConversation.getState();

            // If the new message is not for the currently selected conversation, show a toast notification
            if (!selectedConversation || newMessage.senderId !== selectedConversation._id) {
                // Still store the message in the correct user's bucket
                addMessageToUser(newMessage.senderId, newMessage);
                // Increment unread count for the sender
                incrementUnreadCount(newMessage.senderId);
                // Show toast with sender's name
                const sender = allUsers.find((u) => u._id === newMessage.senderId);
                toast.info(`New message from ${sender?.username || "someone"}`);
                return;
            }

            addMessageToUser(selectedConversation._id, newMessage);
        };

        // Subscribe to "newMessage" event from the socket
        socket.on("newMessage", handleNewMessage);
        return () => socket.off("newMessage", handleNewMessage);
    }, [socket]);

    console.log("Online Users:", onlineUsers);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};
