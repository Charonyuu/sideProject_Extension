import React, { useEffect } from "react";
import { useRoutes, Outlet } from "react-router-dom";

//component
import Navbar from "./component/navbar";
//page
import { SignIn, SignUp } from "./page/account"; // account
import { Profile, Applyfriends, Friends, Setting } from "./page/profile";
import { List, Addfriend, Conversation } from "./page/chat";

//socket
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "@/redux/messageSlice";
import { MessageState } from "@/redux/messageSlice";

const App: React.FC = () => {
  const socket = io("http://127.0.0.1:8000", {
    withCredentials: true, // 使用凭證進行連線
  });
  const { accountId } = useSelector((state: MessageState) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!accountId) return;
    // 建立與伺服器的連線
    socket.on("connect", () => {
      dispatch(setSocket(socket));
      socket.emit("userConnect", accountId, socket.id);
    });
    // 組件卸載時斷開連線
    return () => {
      socket.disconnect();
    };
  }, [accountId]);

  const accountRoutes = [
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
  ];
  const navRoutes = [
    { path: "profile", element: <Profile /> },
    { path: "menu", element: <h2>aaaa</h2> },
    { path: "message", element: <List /> },
  ];
  const chatRoutes = [
    { path: "addfriend", element: <Addfriend /> },
    { path: "conversation/:id", element: <Conversation /> },
  ];
  const profileRoutes = [
    { path: "applyfriends", element: <Applyfriends /> },
    { path: "friends", element: <Friends /> },
    { path: "profileSetting", element: <Setting /> },
  ];

  const Routes = useRoutes([
    ...accountRoutes,
    ...chatRoutes,
    {
      path: "/",
      element: (
        <Navbar>
          <Outlet />
        </Navbar>
      ),
      children: [...navRoutes, ...profileRoutes],
    },
  ]);

  return <>{Routes}</>;
};

export default App;
