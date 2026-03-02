import { Menu, Sun, Moon, Loader2, ChevronDown, User } from "lucide-react";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ setOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const fullText = user?.name ? `Welcome, ${user.name}` : "";
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* ================= Typing Animation ================= */
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
    }, 40);

    return () => clearInterval(interval);
  }, [fullText]);

  /* ================= Outside Click ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= Logout ================= */
  const handleLogout = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    logout();
    setLoading(false);
  };

  return (
    <nav
      className="
        sticky top-0 z-40
        flex items-center justify-between
        px-4 sm:px-6 md:px-10 py-3
        backdrop-blur-xl
        bg-orange-500
        dark:bg-gray-900
        text-white dark:text-gray-200
        border-b border-orange-600 dark:border-gray-800
        shadow-lg
        transition-all duration-300
      "
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="
            md:hidden
            p-2 rounded-lg
            hover:bg-white/20 dark:hover:bg-gray-800
            active:scale-95
            transition
          "
        >
          <Menu size={22} />
        </button>

        {/* Welcome Text */}
        <h1 className="
          text-sm sm:text-base md:text-lg
          font-medium tracking-wide
          truncate max-w-[140px] sm:max-w-xs
        ">
          👋 {text}
          <span className="ml-1 animate-pulse">|</span>
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="
            flex items-center justify-center
            w-9 h-9
            rounded-full
            bg-white/20 hover:bg-white/30
            dark:bg-gray-800 dark:hover:bg-gray-700
            active:scale-95
            transition duration-300
            shadow-md
          "
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-white" />
          )}
        </button>

        {/* USER DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="
              flex items-center gap-2
              bg-white/20 hover:bg-white/30
              dark:bg-gray-800 dark:hover:bg-gray-700
              px-3 py-1.5 rounded-xl
              active:scale-95
              transition duration-300
              shadow-sm
            "
          >
            <div className="
              w-8 h-8 rounded-full
              bg-white/40 dark:bg-gray-700
              flex items-center justify-center
              text-xs font-bold
            ">
              {user?.name?.charAt(0)?.toUpperCase() || (
                <User size={14} />
              )}
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-3
                w-52
                bg-white dark:bg-gray-800
                text-gray-700 dark:text-gray-200
                rounded-2xl shadow-2xl
                border border-gray-200 dark:border-gray-700
                overflow-hidden
                animate-fadeIn
              "
            >
              <div className="
                px-4 py-3 text-sm
                border-b border-gray-200 dark:border-gray-700
              ">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="
                  w-full text-left px-4 py-2.5 text-sm
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition flex items-center gap-2
                "
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;