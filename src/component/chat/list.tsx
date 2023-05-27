import { getConversationsListAPI } from "@/api/chat";
import React, { useEffect, useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
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
  unRead: number;
}

const List: React.FC = () => {
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filterList = list.filter((conversation: Conversation) =>
    conversation.name.includes(searchInput)
  );
  useEffect(() => {
    getConversationsListAPI().then((data) => {
      console.log(data);
      setList(data);
    });
  }, []);
  return (
    <div>
      <div className="w-full flex px-4 pt-4 pb-2">
        <div className="flex bg-white p-2 mr-2 w-full rounded-xl">
          <FiSearch fontSize="25px" className="text-gray-400" />
          <input
            className="w-full pl-2"
            placeholder="Search User"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Link to="/addfriend" className="bg-white p-2 rounded-xl">
          <MdPersonAddAlt1 fontSize="25px" />
        </Link>
      </div>

      <div className="px-4 overflow-auto">
        {filterList?.map((data: Conversation) => {
          const {
            user_id,
            photo,
            name,
            conversationId,
            lastMessage,
            lastMessageTime,
            unRead,
          } = data;
          return (
            <Link
              to={`/conversation/${conversationId}`}
              state={{ user_id, name, photo }}
              className="flex items-center justify-between w-full my-2 h-[60px] bg-white rounded-xl px-2"
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
              <div className="flex flex-col items-end">
                <p className="text-gray-400 text-xs">
                  {ifToday(lastMessageTime)}
                </p>
                {unRead ? (
                  <p className="h-[20px] bg-green-400 w-[20px] flex items-center justify-center text-white rounded-full text-sm mr-1 mt-0.5">
                    {unRead}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default List;
