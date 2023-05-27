import React, { useState, useEffect } from "react";
import { getProfileAPI } from "@/api/profile";
import { ProfileDataInterface } from "@/interface/profile";
import { API } from "@/constant";
import { BiImage, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const [profile, setProfile] = useState<ProfileDataInterface>();
  const navigate = useNavigate();
  useEffect(() => {
    getProfileAPI().then((data) => {
      console.log(data);
      setProfile(data);
    });
  }, []);
  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-[65px] bg-white items-center justify-between flex px-4 rounded-b-[30px] relative">
        <BiArrowBack
          fontSize={"22px"}
          onClick={() => navigate(-1)}
          className="mr-2 cursor-pointer"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">個人檔案</p>
        <p className="text-sm">儲存</p>
      </div>
      <div className="p-5 flex-1">
        <div className="w-[160px] h-[160px] mx-auto rounded-full border-dashed border border-[#6ce5e8] p-1 relative">
          <img
            className="object-cover w-full h-full rounded-full"
            src={`${API}${profile?.photo}`}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 p-2 rounded-full">
            <BiImage fontSize="20px" className="text-white" />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm">姓名</p>
          <input
            className="text-lg bg-transparent w-full border-b border-solid border-gray-300"
            placeholder={profile?.name}
          />
        </div>
        <div>
          <p>修改密碼</p>
          <input
            type="password"
            className="text-lg bg-transparent w-full border-b border-solid border-gray-300"
            placeholder="*********"
          />
        </div>
        <div>
          <p>允許利用名字查詢</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
