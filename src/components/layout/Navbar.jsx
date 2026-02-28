import { Menu, Sun, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ setOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const fullText = user?.name ? `👋 Welcome, ${user.name}` : "";
  const [text, setText] = useState("");

  useEffect(() => {
    if (!fullText) return;

    let index = 0;
    setText("");

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div
      className="
      flex items-center justify-between px-8 py-3
      bg-orange-400 text-white
      dark:bg-[#0f172a] dark:text-gray-200
      border-b border-orange-500 dark:border-gray-700
      shadow-md transition-all duration-300
    "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white dark:text-gray-300"
        >
          <Menu size={22} />
        </button>

        {/* Welcome Text */}
        <h1 className="text-lg font-medium flex items-center">
          {text}
          <span className="ml-1 animate-blink text-white dark:text-yellow-400">
            |
          </span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-full
            bg-orange-300 hover:bg-orange-500
            dark:bg-gray-800 dark:hover:bg-gray-700
            transition duration-300
          "
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-800" />
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="
            px-4 py-1.5 rounded-xl
            bg-white text-orange-600
            hover:bg-orange-100
            dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600
            transition-all duration-300 shadow-sm
          "
        >
          Logout
        </button>
      </div>

      {/* Cursor Animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;