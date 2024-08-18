import React from "react";
import SearchBar from "./SearchBar";
import NotificationBar from "./NotificationBar";
import User from "./User";

const UserList = ({ users, selectedUser, handleUserSelection, userId }) => (
  <div className="w-[25%] h-full py-4 border-r-2 border-gray-200">
    <SearchBar />
    <NotificationBar />
    <User
      userId={userId}
      users={users}
      selectedUser={selectedUser}
      handleUserSelection={handleUserSelection}
    />
  </div>
);

export default UserList;
