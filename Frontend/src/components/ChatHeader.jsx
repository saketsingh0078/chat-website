import React from "react";

const ChatHeader = ({ selectedUser, typingUser }) => (
  <div className="flex gap-2 border-b-2 border-gray-100 items-center mb-4 h-[10vh] bg-slate-200 p-2">
    <img
      className="w-[50px] h-[50px] rounded-full"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gE1xI53y7mrN36IKo3ODyipviCJ_Ibl7Gw&s"
    />
    <div>
      <h1 className="font-bold">{selectedUser.username}</h1>
      {typingUser === selectedUser._id && (
        <span className="text-sm text-gray-500">Typing...</span>
      )}
    </div>
  </div>
);

export default ChatHeader;
