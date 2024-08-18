import React, { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import UserList from "./UserList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import axios from "axios";
import UserShimmer from "./UserShimmer";
import MessageShimmer from "./MessageShimmer";

const socket = io("http://localhost:5000");

function ChatWindow({ userId }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true); // Loading state for users
  const [loadingMessages, setLoadingMessages] = useState(false); // Loading state for messages

  const messagesEndRef = useRef(null);
  const timerId = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    socket.emit("userConnected", userId);

    const handleReceiveMessage = (message) => {
      if (
        message.senderId === selectedUser?._id ||
        message.receiverId === selectedUser?._id
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    const handleUserStatusUpdate = ({ userId, online }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, online } : user
        )
      );
    };

    const handleTyping = (userId) => {
      if (userId === selectedUser?._id) {
        setTypingUser(userId);
      }
    };

    const handleStopTyping = (userId) => {
      if (userId === typingUser) {
        setTypingUser(null);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("userStatusUpdate", handleUserStatusUpdate);

    fetchUsers();

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("userStatusUpdate", handleUserStatusUpdate);
      clearTimeout(timerId.current);
    };
  }, [userId, selectedUser, typingUser]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true); // Start loading users
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data);
      setLoadingUsers(false); // Users fetched, stop loading
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoadingUsers(false); // Error, stop loading
    }
  };

  const handleUserSelection = useCallback(
    (user) => {
      setSelectedUser(user);
      getMessages(user._id);
    },
    [setSelectedUser]
  );

  const getMessages = async (otherUserId) => {
    try {
      setLoadingMessages(true); // Start loading messages
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/messages/${otherUserId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const orderedMessages = response.data.reverse();

      setMessages(orderedMessages);
      setLoadingMessages(false); // Messages fetched, stop loading
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoadingMessages(false); // Error, stop loading
    }
  };

  return (
    <>
      <div className="h-[100vh] flex">
        {loadingUsers ? (
          <UserShimmer />
        ) : (
          <UserList
            userId={userId}
            users={users}
            selectedUser={selectedUser}
            handleUserSelection={handleUserSelection}
          />
        )}
        <div className="w-[75%] h-full">
          {loadingMessages ? (
            <MessageShimmer />
          ) : selectedUser ? (
            <>
              <ChatHeader selectedUser={selectedUser} typingUser={typingUser} />
              <MessageList messages={messages} userId={userId} />
              <ChatInput
                selectedUser={selectedUser}
                userId={userId}
                socket={socket}
                timerId={timerId}
              />
            </>
          ) : (
            <div className="flex flex-col h-full items-center text-center bg-gray-100 p-10 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to the Chat
              </h1>
              <p className="text-lg text-gray-500">Start a new conversation</p>
              <p className="text-lg text-gray-500">
                Select a contact from the list to begin chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
