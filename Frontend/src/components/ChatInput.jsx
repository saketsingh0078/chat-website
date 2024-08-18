import React, { useRef, useState } from "react";
import { IoSendOutline } from "react-icons/io5";

import { IoMdAttach } from "react-icons/io";

const ChatInput = ({ selectedUser, userId, socket, timerId }) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (selectedUser) {
      socket.emit("typing", { selectedUser, userId });
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        socket.emit("stopTyping", { selectedUser, userId });
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const messageData = {
        content: newMessage,
        senderId: userId,
        receiverId: selectedUser._id,
        type: "text",
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
      socket.emit("stopTyping", selectedUser._id);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const messageData = {
          content: reader.result,
          senderId: userId,
          receiverId: selectedUser._id,
          type: "image",
        };
        socket.emit("sendMessage", messageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex border-t-2 mt-1 border-gray-200 p-4">
      <div className="relative w-full">
        <IoSendOutline
          className="absolute right-2 top-1/2 transform -translate-y-1/2  w-[32px] h-[28px] cursor-pointer bg-orange-600 p-1 rounded-md text-black"
          onClick={handleSendMessage}
        />
        <IoMdAttach
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 w-[24px] h-[24px] cursor-pointer "
          onClick={handleIconClick}
        />

        <input
          className="w-full border-2 bg-gray-100 p-1.5 rounded-md pr-20 text-lg outline-none"
          type="text"
          value={newMessage}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Type your message here ..."
        />

        <input
          type="file"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
