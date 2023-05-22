import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import { SignUpAPI } from "@/api/account";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  async function _signUp() {
    if (!account || !password) return alert("請輸入所有資料");
    await SignUpAPI(name, account, password).then(() => {
      alert("註冊成功")
      navigate("/signIn");
    });
  }
  return (
    <div className="p-5 h-screen flex flex-col justify-center">
      <div className="w-[300px] mx-auto ">
        <img src={Logo} className="w-[200px] mx-auto" />
        <p className="my-1 text-xl">註冊一個新帳戶吧</p>
        <p className="my-1 font-bold">暱稱 / 名稱</p>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:border-blue-400"
          placeholder="請輸入您的暱稱或名稱"
        />
        <p className="my-1 font-bold">帳號</p>
        <input
          value={account}
          type="text"
          onChange={(e) => setAccount(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:border-blue-400"
          placeholder="請輸入您的帳號"
        />
        <p className="my-1 font-bold">密碼</p>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:border-blue-500"
          placeholder="6-18位數密碼，請區分大小寫"
        />
        <button
          className="py-2 text-center w-full bg-blue-400 mt-6 rounded-md text-white"
          onClick={_signUp}
        >
          註冊
        </button>
        <h6 className="text-sm py-0.5">
          已有帳號，前往
          <Link to="/signIn" className="underline text-blue-400">
            登入
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default SignUp;
