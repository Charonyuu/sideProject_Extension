import { getApplyFriendsAPI, acceptApplyFriendsAPI } from "@/api/profile";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { API } from "@/constant";

interface Friends {
  id: string;
  name: string;
  photo: string;
}

const Applyfriends: React.FC = () => {
  const [applyFriendList, setApplyFriendList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getApplyFriendsAPI().then((data) => {
      console.log(data);
      setApplyFriendList(data);
    });
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center relative h-[50px] bg-white w-full ">
        <AiOutlineLeft
          className="absolute left-2"
          fontSize="20px"
          onClick={() => navigate(-1)}
        />
        <p>好友申請列表</p>
      </div>
      <div className="p-3">
        {applyFriendList.map((data: Friends) => {
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
                <AiOutlineClose className="text-red-400" fontSize="20px" />
                <AiOutlineCheck
                  className="ml-2 text-green-400"
                  fontSize="20px"
                  onClick={() => acceptApplyFriendsAPI(id, name, photo)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applyfriends;
