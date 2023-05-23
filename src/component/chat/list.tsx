import { getConversationsListAPI } from "@/api/chat";
import React, { useEffect, useState } from "react";
import { MdPersonAddAlt1, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { API } from "@/constant";
import { ifToday } from "@/utils/time";
interface Conversation {
  user_id: string;
  photo: string;
  name: string;
  conversationId: string;
  lastMessage: string;
  lastMessageTime: number;
  unread: number;
}

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getConversationsListAPI().then((data) => {
      console.log(data);
      setList(data);
    });
  }, []);
  return (
    <div>
      <div className="bg-white w-full h-[50px] flex justify-end items-center px-2">
        <MdSearch fontSize="25px" />
        <Link to="/addfriend">
          <MdPersonAddAlt1 fontSize="25px" />
        </Link>
      </div>
      <div>
        {list?.map((data: Conversation) => {
          const {
            user_id,
            photo,
            name,
            conversationId,
            lastMessage,
            lastMessageTime,
            unread,
          } = data;
          return (
            <div
              className="flex items-center justify-between w-full p-2 h-[60px]"
              key={conversationId}
            >
              <div className="flex items-center w-4/5">
                <img
                  src={`${API}${photo}`}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div className="ml-2">
                  <p>{name}</p>
                  <p className="text-gray-600 text-xs">{lastMessage}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {ifToday(lastMessageTime)}
                </p>
                <p className="h-[16px]">{unread}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
