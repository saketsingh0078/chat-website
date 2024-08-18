import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="border-b-2 border-gray-200 px-4">
      <div className="relative w-full">
        <IoSearchOutline className="absolute left-2 top-[42%] transform -translate-y-1/2 text-gray-500 w-[20px] h-[20px] " />
        <input
          className="w-full border-2 bg-gray-100 p-1.5 rounded-md pl-8 text-lg mb-3"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
