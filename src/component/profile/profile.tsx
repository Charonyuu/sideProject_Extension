import React, { useEffect, useState } from "react";
import { getProfileAPI, Logout } from "@/api/profile";
import Cookies from "js-cookie";
import { API } from "@/constant";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link } from "react-router-dom";

interface ProfileData {
  id: string;
  photo: string;
  name: string;
  acceptNameSearch: boolean;
  applyfriends: string[];
  friens: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>();
  useEffect(() => {
    getProfileAPI().then((data) => {
      console.log(data);
      setProfile(data);
    });
  }, []);

  return (
    <section className="pt-10 bg-slate-200 h-[calc(100vh_-_60px)] flex flex-col items-center">
      <div className="w-[150px] h-[150px] rounded-full">
        <img
          className="object-cover w-full h-full rounded-full"
          src={`${API}${profile?.photo}`}
        />
      </div>
      <p className="m-2 text-2xl">{profile?.name}</p>
      <p>{profile?.id}</p>
      <div className="text-center text-xl">
        <Link to="/friends" className="flex items-center my-5">
          <AiOutlineUser />
          好友名單
        </Link>
        <Link to="/applyfriends" className="flex items-center my-5">
          <AiOutlineUsergroupAdd />
          好友申請
        </Link>
        <p className="flex items-center my-5">
          <AiOutlineSetting />
          帳號設定
        </p>
        <Link to="/signIn" className="flex items-center my-5" onClick={Logout}>
          <AiOutlineLogout />
          帳號登出
        </Link>
      </div>
    </section>
  );
};

export default Profile;
