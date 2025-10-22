import React, { useState } from "react";
import useConversation from "../store/zustand";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/chat/send/${selectedConversation._id}`,
        { message }, 
        { withCredentials: true }
      );
      console.log(res);
      
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;