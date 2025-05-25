import React, { useContext } from 'react';
import { FaPlusSquare, FaSun, FaMoon } from 'react-icons/fa';
import { FiHeart, FiSend } from 'react-icons/fi';
import { ThemeContext } from '../App';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const ThemeIcon = theme === 'light' ? FaMoon : FaSun;
  const themeIconColor = theme === 'light' ? 'text-gray-800' : 'text-yellow-300';

  return (
    <header className="flex items-center justify-between p-3 border-b border-gray-200 w-full max-w-sm
                       relative z-10"
            style={{ backgroundColor: theme === 'light' ? 'white' : '#1a1a1a',
                     color: theme === 'light' ? '#333' : '#eee' }}>
      <h1 className="text-xl font-bold font-['Billabong'],cursive"
          style={{ color: theme === 'light' ? '#333' : '#eee' }}>Instagram</h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-1 rounded-full transition-colors duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <ThemeIcon size={20} className={`${themeIconColor} cursor-pointer hover:opacity-70 transition-opacity`} />
        </button>
        <FaPlusSquare size={22} className={`cursor-pointer hover:opacity-70 transition-opacity ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`} />
        <FiHeart size={22} className={`cursor-pointer hover:opacity-70 transition-opacity ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`} />
        <FiSend size={22} className={`cursor-pointer hover:opacity-70 transition-opacity ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`} />
      </div>
    </header>
  );
}

export default Header;

