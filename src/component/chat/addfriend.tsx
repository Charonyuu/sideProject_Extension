import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";
import { BiUserPlus, BiUserVoice, BiUserCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getUserApi, addFriendApi } from "@/api/chat";
import { API } from "@/constant";
interface SearchResult {
  photo: string;
  name: string;
  _id: string;
  status: number;
}

const Addfriend: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!input) return setSearchResult("");
    if (input.length !== 24) return;
    getUserApi(input).then((data) => {
      setSearchResult(data);
    });
  }, [input]);

  return (
    <div className=" flex flex-col items-center">
      <div className="flex items-center justify-center relative h-[50px] bg-white w-full ">
        <AiOutlineLeft
          className="absolute left-2"
          fontSize="20px"
          onClick={() => navigate(-1)}
        />
        <p>搜尋好友</p>
      </div>
      <div className="flex border bg-gray-100 rounded-md w-[90%] p-2 mt-5 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="bg-transparent w-full"
          placeholder="請輸入好友的ID進行搜尋"
        />
        <AiOutlineSearch fontSize="20px" color="#3e3e3e" />
      </div>
      {typeof searchResult === "string" ? (
        <p className="mt-2">{searchResult}</p>
      ) : (
        <div className="flex border bg-gray-100 rounded-md w-[90%] py-2 px-4 mt-5 items-center justify-between">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] mr-2">
              <img
                src={`${API}${searchResult.photo}`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p>{searchResult.name}</p>
          </div>
          {searchResult.status === 0 ? (
            <BiUserPlus
              fontSize="20px"
              onClick={() => addFriendApi(searchResult._id)}
              className="cursor-pointer"
            />
          ) : searchResult.status === 1 ? (
            <BiUserVoice fontSize="20px" />
          ) : (
            <BiUserCheck fontSize="20px" />
          )}
        </div>
      )}
    </div>
  );
};

export default Addfriend;
