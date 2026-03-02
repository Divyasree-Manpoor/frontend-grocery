import { Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = ({
  showLabel = false,
  size = "md",
}) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  const sizes = {
    sm: {
      track: "h-8 w-14",
      knob: "h-5 w-5",
      translate: "translate-x-6",
    },
    md: {
      track: "h-9 w-16",
      knob: "h-6 w-6",
      translate: "translate-x-7",
    },
    lg: {
      track: "h-10 w-20",
      knob: "h-7 w-7",
      translate: "translate-x-10",
    },
  };

  const current = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
          {dark ? "Dark Mode" : "Light Mode"}
        </span>
      )}

      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        role="switch"
        aria-checked={dark}
        className={`
          relative
          ${current.track}
          flex items-center
          rounded-full
          px-1
          transition-all duration-300
          ${
            dark
              ? "bg-gray-800 shadow-inner"
              : "bg-orange-200 shadow-inner"
          }
          focus:outline-none
          focus:ring-2 focus:ring-orange-500/60
        `}
      >
        {/* Track Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <Moon size={14} className="text-gray-500 opacity-40" />
          <Sun size={14} className="text-yellow-500 opacity-40" />
        </div>

        {/* Toggle Knob */}
        <div
          className={`
            z-10
            ${current.knob}
            rounded-full
            flex items-center justify-center
            bg-white dark:bg-gray-700
            shadow-md
            transform
            transition-all duration-300 ease-in-out
            ${dark ? current.translate : "translate-x-0"}
          `}
        >
          {dark ? (
            <Sun size={14} className="text-yellow-400" />
          ) : (
            <Moon size={14} className="text-orange-600" />
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;