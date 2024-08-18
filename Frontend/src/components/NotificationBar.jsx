import React from "react";

const NotifiactionBar = () => {
  const btn = ["All", "Unread", "Archieved", "Blocked"];

  return (
    <div className="flex gap-2 flex-wrap border-b-2 border-gray-300 p-3">
      {btn.map((btn, index) => (
        <button
          key={index}
          className={` ${
            btn === "All"
              ? " bg-orange-600 text-white"
              : "text-black border-gray-300 "
          } rounded-full px-2 py-0.5 border-2`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default NotifiactionBar;
