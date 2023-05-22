import React from "react";
import {
  BsPersonCircle,
  BsChatDots,
  BsFillGrid3X3GapFill,
  BsBell,
} from "react-icons/bs";
import { Link } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="h-[calc(100vh_-_60px)] w-full bg-slate-200 ">
        {children}
      </div>
      <div className="flex h-[60px] w-full justify-around items-center border-t-2">
        <Link to="/message">
          <BsChatDots fontSize="24px" />
        </Link>
        <Link to="/menu">
          <BsFillGrid3X3GapFill fontSize="24px" />
        </Link>
        <Link to="/notification">
          <BsBell fontSize="24px" />
        </Link>
        <Link to="profile">
          <BsPersonCircle fontSize="24px" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
