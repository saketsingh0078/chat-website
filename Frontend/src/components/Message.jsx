import React from "react";

const Message = ({ message, userId }) => (
  <div
    className={`max-h-full p-3 mb-2 rounded-lg w-fit w-max-[50%] ${
      message.senderId === userId
        ? " bg-orange-600 text-white text-lg ml-auto"
        : "bg-gray-300 text-black text-lg mr-auto"
    }`}
  >
    {message.type === "text" ? (
      <p>{message.content}</p>
    ) : (
      <img className="h-[200px]" src={message.content} alt="Uploaded file" />
    )}
  </div>
);

export default Message;
