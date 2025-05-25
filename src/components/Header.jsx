import React, { useContext } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { FiHeart, FiSend } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { ThemeContext } from "../App";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className="flex items-center justify-between p-3 border-b border-gray-200 w-full max-w-sm
                       relative z-10"
      style={{
        backgroundColor: theme === "light" ? "white" : "#1a1a1a",
        color: theme === "light" ? "#333" : "#eee",
      }}
    >
      <h1
        className="text-xl font-bold font-['Billabong'],cursive"
        style={{ color: theme === "light" ? "#333" : "#eee" }}
      >
        Instagram
      </h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {theme === "light" ? (
            <BsMoon
              size={20}
              className="text-gray-800 cursor-pointer hover:opacity-70 transition-opacity"
            />
          ) : (
            <BsSun
              size={20}
              className="text-yellow-400 cursor-pointer hover:opacity-70 transition-opacity"
            />
          )}
        </button>

        <FaPlusSquare
          size={22}
          className={`cursor-pointer hover:opacity-70 transition-opacity ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        />
        <FiHeart
          size={22}
          className={`cursor-pointer hover:opacity-70 transition-opacity ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        />
        <FiSend
          size={22}
          className={`cursor-pointer hover:opacity-70 transition-opacity ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        />
      </div>
    </header>
  );
}

export default Header;
