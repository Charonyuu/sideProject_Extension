import React from "react";
import {
  BsPersonCircle,
  BsChatDots,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="bg-[#e2e2e282]">
      <div className="h-[calc(100vh_-_80px)] w-full">{children}</div>
      <div className="flex h-[80px] w-[100%] justify-around items-center border-t-2 rounded-t-[40px] bg-white">
        <Link to="/message">
          <BsChatDots
            fontSize="30px"
            className={
              location.pathname === "/message"
                ? "text-purple-600"
                : "text-gray-400"
            }
          />
        </Link>
        <Link to="/menu">
          <BsFillGrid3X3GapFill
            fontSize="30px"
            className={
              location.pathname === "/menu"
                ? "text-purple-600"
                : "text-gray-400"
            }
          />
        </Link>
        <Link to="profile">
          <BsPersonCircle
            fontSize="30px"
            className={
              location.pathname === "/profile"
                ? "text-purple-600"
                : "text-gray-400"
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
