import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../store/zustand.js";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const res = await axios.get(
                        `http://localhost:3000/api/chat/get/${selectedConversation._id}`, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    
                    setMessage(res.data);
                    setLoading(false);
                } catch (error) {
                    console.log("Error in getting messages", error);
                    setLoading(false);
                }
            }
        };
        getMessages();
    }, [selectedConversation, setMessage]);
    return { loading, messages };
};

export default useGetMessage;