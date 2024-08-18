import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const UserShimmer = () => {
  const btn = ["All", "Unread", "Archieved", "Blocked"];
  return (
    <div className="w-[25%] h-full py-4 border-r-2 border-gray-200 animate-pulse">
      <div className="border-b-2 border-gray-200 px-4b animate-pulse">
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-2 top-[42%] transform -translate-y-1/2 text-gray-500 w-[20px] h-[20px] " />
          <h1 className="w-full h-[45px] border-2 bg-gray-100 p-1.5 rounded-md pl-8 text-lg mb-3"></h1>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap border-b-2 border-gray-300 p-3 animate-pulse">
        {btn.map((btn, index) => (
          <button
            className="border-gray-300 w-[45px] h-[25px] 
             rounded-full px-2 py-0.5 border-2"
          ></button>
        ))}
      </div>

      <ul>
        <li
          className="
             bg-gray-300"
        >
          <div className=" flex w-full gap-4 border-b-2 border-gray-100  p-3 items-center animate-pulse">
            <h1 className="border-2 border-gray-500 rounded-full w-[50px] h-[50px] "></h1>

            <div className="flex flex-col justify-center gap-4">
              <h1 className="w-[50px] border-2 border-gray-500 rounded-md  h-[15px]"></h1>
              <h2 className="w-[100px] border-2 border-gray-500 rounded-md  h-[15px]"></h2>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserShimmer;
