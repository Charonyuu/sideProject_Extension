import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { BiBellOff, BiBell, BiImageAlt } from "react-icons/bi";
import { API, daysOfWeek } from "@/constant";
import * as dayjs from "dayjs";
import { sendMessageApi } from "@/api/chat";

import { useSelector } from "react-redux";
import { MessageState } from "@/redux/messageSlice";
import useGetConversation from "@/hooks/chat/useGetConversation";

interface MessageType {
  isRead: boolean;
  message: string;
  messageBy: string;
  messageType: string;
  createdAt: number;
}

const Conversation: React.FC = () => {
  return (
    <div className="h-screen bg-[#e2e2e282] flex flex-col">
      <Header />
      <ConversationContainer />
      <InputContainer />
    </div>
  );
};

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, photo } = location.state;
  return (
    <div className="w-full h-[65px] bg-white items-center justify-between flex px-4 rounded-b-[30px]">
      <div className="flex items-center">
        <AiOutlineArrowLeft
          fontSize={"22px"}
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer"
        />
        <div className="w-[40px] h-[40px] relative">
          <img
            src={API + photo}
            className="w-full h-full rounded-full object-cover mx-1 border-solid border-[#e2e2e282] border"
          />
          <span className="bg-green-600 w-[10px] h-[10px] absolute bottom-0.5 right-0 border-solid border-white border rounded-full" />
        </div>

        <div className="ml-2">
          <p className="text-sm">{name}</p>
          <p className="text-green-600 text-xs">Online</p>
        </div>
      </div>
      <BiBellOff fontSize="22px" className="text-red-400 mr-2" />
    </div>
  );
};
const ConversationContainer: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user_id } = location.state;

  const { accountId, socket } = useSelector(
    (state: MessageState) => state.message
  );

  const messages = useGetConversation(id, user_id);
  return (
    <div className="flex flex-1 flex-col-reverse overflow-auto">
      {messages?.map((msg: MessageType) => {
        return (
          <>
            {msg.messageBy === "system" && (
              <div className="w-fit h-fit bg-gray-300 mx-auto px-2 py-1 text-sm rounded-xl my-2">
                {msg.message}
              </div>
            )}
            {msg.messageBy === "time" && (
              <div className="w-fit h-fit mx-auto my-1 rounded-xl">
                <p className="bg-black text-white text-[8px] px-2 py-0.5 rounded-lg">
                  {dayjs(msg.createdAt).format("MM/DD")}
                  {daysOfWeek[new Date(msg.createdAt).getDay()]}
                </p>
              </div>
            )}
            {msg.messageBy === accountId && (
              <div className="w-full h-fit flex px-2 py-1 text-sm justify-end items-end">
                <div className="h-fit text-[8px] text-right mr-1 text-gray-600">
                  {msg.isRead && <span>已讀</span>}
                  <p className="text-[12px]">
                    {dayjs(msg.createdAt).format("hh:mm a")}
                  </p>
                </div>
                <p className="bg-blue-300 px-2 py-1 rounded-[10px_10px_0_10px]">
                  {msg.message}
                </p>
              </div>
            )}
            {msg.messageBy === user_id && (
              <div className="w-full h-fit flex items-end px-2 py-1 text-sm rounded-xl">
                <p className="bg-blue-300 px-2 py-1 rounded-[10px_10px_10px_0]">
                  {msg.message}
                </p>
                <p className="h-fit text-xs mr-1 text-gray-600 ml-1">
                  <p>{dayjs(msg.createdAt).format("hh:mm a")}</p>
                </p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
const InputContainer: React.FC = () => {
  const { id } = useParams();
  const { accountId, socket } = useSelector(
    (state: MessageState) => state.message
  );
  const location = useLocation();
  const { user_id } = location.state;
  const [input, setInput] = useState("");
  //   function keyDownSend(event: React.KeyboardEvent<HTMLInputElement>) {
  //     if (event.key === "Enter") {
  //       buttonRef.current?.click();
  //     }
  //   }
  async function sendMessage() {
    if (!input) return;
    socket.emit("sendMessage", {
      conversationId: id,
      from: accountId,
      to: user_id,
      type: "text",
      message: input,
    });
  }
  return (
    <div className="w-full flex p-4 h-[80px] bg-white rounded-t-[30px] mt-2 px-2">
      <div className="bg-gray-100 w-full flex h-[50px] rounded-[50px] px-3 pl-4 items-center">
        <input
          placeholder="Type here..."
          className="w-full bg-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <BiImageAlt fontSize="30px" className="text-gray-400 mr-1" />
        <AiOutlineSend
          fontSize="23px"
          className="text-gray-400"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};
export default Conversation;
