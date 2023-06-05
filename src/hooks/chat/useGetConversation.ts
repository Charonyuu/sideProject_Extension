import React, { useState, useEffect } from "react";
import { getConversationContentAPI } from "@/api/chat";
import { useSelector } from "react-redux";

const useGetConversation = (id: string | undefined, userId: string) => {
  const [messages, setMessages] = useState([]);
  const socket = useSelector((state: any) => state.message.socket);

  const handleReceiveMessage = (data: any) => {
    setMessages((prev): any => {
      return [data, ...prev];
    });
  };

  useEffect(() => {
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    getConversationContentAPI(id, userId).then((msg) => {
      setMessages(msg);
    });
  }, [id]);
  return messages;
};

export default useGetConversation;
