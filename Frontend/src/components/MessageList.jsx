import React, { useRef, useEffect } from "react";
import Message from "./Message";

const MessageList = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-[76vh] p-4 overflow-y-scroll">
      {messages.map((message, index) => (
        <Message key={index} message={message} userId={userId} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
