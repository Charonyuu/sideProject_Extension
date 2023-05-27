import React, { useState, useEffect } from "react";
import { getConversationContentAPI } from "@/api/chat";
import { useSelector } from "react-redux";

const useGetConversation = (id: string | undefined) => {
  const [messages, setMessages] = useState([]);
  const socket = useSelector((state: any) => state.message.socket);

  const handleReceiveMessage = (data: any) => {
    const temp: any = [...messages, data];
    setMessages(temp);
    console.log("Received message:", data);
  };

  useEffect(() => {
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    getConversationContentAPI(id).then((msg) => {
      setMessages(msg);
    });
  }, [id]);
  return messages;
};

export default useGetConversation;
