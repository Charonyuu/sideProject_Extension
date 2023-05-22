import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SignInAPI } from "@/api/account";

const SignIn: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  async function _signIn() {
    if (!account || !password) return alert("請輸入所有資料");
    await SignInAPI(account, password)
      .then(() => {
        return navigate("/message");
      })
      .catch((err) => console.log("err" + err));
  }
  return (
    <div className="p-5 h-screen flex flex-col justify-center">
      <div className="w-[300px] mx-auto ">
        <img src={Logo} className="w-[200px] mx-auto" />
        <p className="my-1 text-xl">歡迎~~</p>
        <p>開始使用chrome懶人插件吧</p>
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
        <h6 className="text-sm text-end">忘記密碼？</h6>

        <button
          className="py-2 text-center w-full bg-blue-400 mt-4 rounded-md text-white"
          onClick={_signIn}
        >
          登入
        </button>
        <h6 className="text-sm py-0.5">
          尚未有帳號，前往
          <Link to="/signUp" className="underline text-blue-400">
            註冊
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
