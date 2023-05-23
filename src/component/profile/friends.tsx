import {
  getFriendsAPI,
  acceptApplyFriendsAPI,
  rejectApplyFriendAPI,
} from "@/api/profile";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { API } from "@/constant";

interface FriendInterface {
  id: string;
  name: string;
  photo: string;
}

const Friends: React.FC = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [update, setUpdate] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!update) return;
    getFriendsAPI().then((data) => {
      console.log(data);
      setUpdate(false);
      setFriendsList(data);
    });
  }, [update]);
  return (
    <div>
      <div className="flex items-center justify-center relative h-[50px] bg-white w-full ">
        <AiOutlineLeft
          className="absolute left-2"
          fontSize="20px"
          onClick={() => navigate(-1)}
        />
        <p>好友列表</p>
      </div>
      <div className="p-3">
        {friendsList.map((data: FriendInterface) => {
          const { id, name, photo } = data;
          return (
            <div
              key={id}
              className="flex justify-between items-center bg-white w-full h-[50px] rounded-lg my-3 px-3"
            >
              <div className="flex items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  src={`${API}${photo}`}
                />
                <p className="ml-1">{name}</p>
              </div>
              <div className="flex ">
                <AiOutlineUserDelete
                  className="text-red-400"
                  fontSize="20px"
                  onClick={() => {
                    rejectApplyFriendAPI(id), setUpdate(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
