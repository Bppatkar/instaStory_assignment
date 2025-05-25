import React from "react";

import { FaPlusSquare } from "react-icons/fa";
import { FiHeart, FiSend } from "react-icons/fi";

function Header() {
  return (
    <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200 w-full max-w-sm">
      <h1 className="text-xl font-bold text-gray-800 font-['Billabong'],cursive">
        Instagram
      </h1>

      <div className="flex items-center space-x-4">
        <FaPlusSquare
          size={22}
          className="text-gray-800 cursor-pointer hover:opacity-70 transition-opacity"
        />

        <FiHeart
          size={22}
          className="text-gray-800 cursor-pointer hover:opacity-70 transition-opacity"
        />

        <FiSend
          size={22}
          className="text-gray-800 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </div>
    </header>
  );
}

export default Header;
