import React from "react";
import UserShimmer from "./UserShimmer";

const User = ({ users, selectedUser, handleUserSelection }) => {
  return (
    <>
      {users ? (
        <div>
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className={` ${
                  selectedUser?._id === user._id ? "bg-gray-300" : ""
                } cursor-pointer hover:bg-gray-200`}
                onClick={() => handleUserSelection(user)}
              >
                <div className=" flex w-full gap-2 border-b-2 border-gray-100 p-2 justify-center items-center">
                  <img
                    className={` ${
                      user.online
                        ? "border-4 border-green-700 rounded-full"
                        : "border-4 border-gray-500 rounded-full"
                    } w-[55px] h-[50px] rounded-full `}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gE1xI53y7mrN36IKo3ODyipviCJ_Ibl7Gw&s"
                  />

                  <div>
                    <h1 className="font-bold ">{user.username}</h1>
                    <h2>
                      {user.username}: Starting chatting by click on the user
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <UserShimmer />
      )}
    </>
  );
};

export default User;
