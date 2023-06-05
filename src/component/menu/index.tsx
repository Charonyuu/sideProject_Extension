import React from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <div className="p-5 grid grid-cols-2">
      <Link to="/app/ETF" className="flex flex-col items-center">
        <img
          src="apps/etfLogo.png"
          className="bg-black rounded-lg w-[80px] h-[80px]"
        />
        <p>ETF淨值查詢</p>
      </Link>
      <Link to="/app/PTT" className="flex flex-col items-center">
        <img
          src="apps/PTTLogo.png"
          className="bg-black rounded-lg w-[80px] h-[80px]"
        />
        <p>Co PTT</p>
      </Link>
    </div>
  );
};

export default Menu;
