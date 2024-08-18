import React from "react";

const MessageShimmer = () => {
  return (
    <div>
      <div className="flex gap-2 border-b-2 border-gray-100 items-center mb-4 h-[10vh] bg-slate-200 p-2 animate-pulse">
        <h1 className="w-[50px] h-[50px] border-b-2 border-gray-200 bg-slate-400  rounded-full"></h1>
        <div className=" flex flex-col gap-4">
          <h1 className="w-[60px] border-b-2 border-gray-300   bg-slate-400 rounded-md h-[10px]"></h1>
          <h1 className="w-[60px] border-b-2 border-gray-300  bg-slate-400 rounded-md h-[10px]"></h1>
        </div>
      </div>

      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-black text-lg mr-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-black text-lg mr-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-black text-lg mr-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-black text-lg mr-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-white text-lg ml-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-white text-lg ml-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-white text-lg ml-auto"
      ></div>
      <div
        className="max-h-full p-3 mb-4 rounded-lg w-[350px] h-[40px] animate-pulse 
          bg-gray-300 text-white text-lg ml-auto"
      ></div>
    </div>
  );
};

export default MessageShimmer;
