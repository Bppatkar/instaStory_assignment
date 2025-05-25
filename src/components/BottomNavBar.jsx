import React from "react";

import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsBag } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

function BottomNavBar() {
  return (
    <nav className="flex items-center justify-around h-12 bg-white border-t border-gray-200 w-full max-w-sm mt-4">
      <AiFillHome
        size={24}
        className="text-gray-800 cursor-pointer hover:opacity-70 transition-opacity"
      />
      <FiSearch
        size={24}
        className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
      />
      <MdOutlineVideoLibrary
        size={24}
        className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
      />
      <BsBag
        size={24}
        className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
      />
      <FaRegUserCircle
        size={24}
        className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
      />
    </nav>
  );
}

export default BottomNavBar;
