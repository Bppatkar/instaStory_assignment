import React, { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsBag } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { ThemeContext } from "../App"; 


function BottomNavBar() {
  const { theme } = useContext(ThemeContext); 

  const activeColor = theme === "light" ? "text-gray-800" : "text-gray-100";
  const inactiveColor = theme === "light" ? "text-gray-500" : "text-gray-400";
  const bgColor = theme === "light" ? "bg-white" : "bg-gray-900";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";

  return (
    <nav
      className={`fixed bottom-0 w-full max-w-sm h-12 flex items-center justify-around border-t ${borderColor} ${bgColor} z-20`}
    >
      <AiFillHome
        size={24}
        className={`${activeColor} cursor-pointer hover:opacity-70 transition-opacity`}
      />

      <FiSearch
        size={24}
        className={`${inactiveColor} cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors`}
      />

      <MdOutlineVideoLibrary
        size={24}
        className={`${inactiveColor} cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors`}
      />

      <BsBag
        size={24}
        className={`${inactiveColor} cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors`}
      />

      <FaRegUserCircle
        size={24}
        className={`${inactiveColor} cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors`}
      />
    </nav>
  );
}

export default BottomNavBar;
