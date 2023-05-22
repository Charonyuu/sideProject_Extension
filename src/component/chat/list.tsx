import React from "react";
import { MdPersonAddAlt1, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
const List = () => {
  return (
    <div>
      <div className="bg-white w-full h-[50px] flex justify-end items-center px-2">
        <MdSearch fontSize="25px" />
        <Link to="/addfriend">
          <MdPersonAddAlt1 fontSize="25px" />
        </Link>
      </div>
    </div>
  );
};

export default List;
