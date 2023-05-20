import React from "react";
import { useRoutes } from "react-router-dom";

//page
import { SignIn, SignUp } from "./page/account"; // account

const App: React.FC = () => {
  const accountRoutes = [
    { path: "/", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
  ];

  const routing = useRoutes([...accountRoutes]);
  return <>{routing}</>;
};

export default App;
