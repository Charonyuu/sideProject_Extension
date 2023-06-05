import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHandPointLeft, FaHome } from "react-icons/fa";
interface props {
  children: React.ReactNode;
}

const AppNav: React.FC<props> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#e2e2e282]">
      <div className="h-screen w-full ">{children}</div>
      <div className="flex h-[70px] w-[100%] justify-around items-center border-t-2 rounded-t-[40px] bg-white fixed bottom-0">
        <div onClick={() => navigate(-1)}>
          <FaRegHandPointLeft fontSize="25px" />
        </div>
        <Link to="/message">
          <FaHome fontSize="25px" />
        </Link>
        <div />
      </div>
    </div>
  );
};

export default AppNav;
