import React, { useEffect, useState } from "react";
import { getProfileAPI, Logout } from "@/api/profile";
import { API } from "@/constant";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiEdit2, FiBell, FiCopy } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ProfileDataInterface } from "@/interface/profile";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileDataInterface>();

  useEffect(() => {
    getProfileAPI().then((data) => {
      console.log(data);
      setProfile(data);
    });
  }, []);

  return (
    <section className="py-3 px-5 h-[calc(100vh_-_60px)] flex flex-col items-center">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <img src="smallLogo.png" className="w-[40px] h-[40px] " />
          <p>Logo</p>
        </div>
        <FiBell fontSize="25px" className=" text-[#6ce5e8]" />
      </div>
      <div className="w-[160px] h-[160px] rounded-full border-dashed border border-[#6ce5e8] p-1 relative">
        <img
          className="object-cover w-full h-full rounded-full"
          src={`${API}${profile?.photo}`}
        />
        <Link to="/profileSetting" className="absolute bottom-[-10px] left-1/2 translate-x-[-50%] bg-black w-[40px] h-[40px] rounded-full flex justify-center items-center border border-white border-solid p-3">
          <FiEdit2 color="white" />
        </Link>
      </div>
      <p className="mt-5 text-lg">{profile?.name}</p>
      <p className="text-gray-400 flex items-center">
        {profile?.id}
        <FiCopy className="ml-1" />
      </p>
      <Link
        to="/friends"
        className="flex items-center py-5 w-full border-b border-solid border-gray-300"
      >
        <AiOutlineUser fontSize="30px" />
        <p className="text-lg ml-2">好友名單</p>
      </Link>
      <Link
        to="/applyfriends"
        className="flex items-center py-5 w-full border-b border-solid border-gray-300"
      >
        <AiOutlineUsergroupAdd fontSize="30px" />
        <p className="text-lg ml-2">好友申請</p>
      </Link>
      <Link to="/profileSetting" className="flex items-center py-5 w-full border-b border-solid border-gray-300">
        <AiOutlineSetting fontSize="30px" />
        <p className="text-lg ml-2">帳號設定</p>
      </Link>
      <Link
        to="/signIn"
        className="flex items-center py-5 w-full border-b border-solid border-gray-300"
        onClick={Logout}
      >
        <AiOutlineLogout fontSize="30px" />
        <p className="text-lg ml-2">帳號登出</p>
      </Link>
    </section>
  );
};

export default Profile;
