import React from "react";
import { useRoutes, Outlet } from "react-router-dom";

//component
import Navbar from "./component/navbar";
//page
import { SignIn, SignUp } from "./page/account"; // account
import { Profile, Applyfriends, Friends } from "./page/profile";
import { List, Addfriend } from "./page/chat";

const App: React.FC = () => {
  const accountRoutes = [
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
  ];
  const navRoutes = [
    { path: "profile", element: <Profile /> },
    { path: "menu", element: <h2>aaaa</h2> },
    { path: "message", element: <List /> },
  ];
  const chatRoutes = [{ path: "addfriend", element: <Addfriend /> }];
  const profileRoutes = [
    { path: "applyfriends", element: <Applyfriends /> },
    { path: "friends", element: <Friends /> },
  ];

  const Routes = useRoutes([
    ...accountRoutes,
    {
      path: "/",
      element: (
        <Navbar>
          <Outlet />
        </Navbar>
      ),
      children: [...navRoutes, ...chatRoutes, ...profileRoutes],
    },
  ]);

  return <>{Routes}</>;
};

export default App;
