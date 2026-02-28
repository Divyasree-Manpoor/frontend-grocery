import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, LogIn, UserPlus, Sun, Moon } from "lucide-react";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState("");

  const quote = "Plan smart. Shop smarter. Waste less.";

  // Dark / Light Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Typing Animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(quote.slice(0, index + 1));
      index++;
      if (index === quote.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden
                 bg-gradient-to-br 
                 from-orange-100 via-amber-100 to-orange-200
                 dark:from-gray-900 dark:via-gray-800 dark:to-black
                 transition-colors duration-500"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-3 rounded-full 
                   bg-orange-500 text-white hover:bg-orange-600 
                   transition shadow-lg"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-2xl">

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 
                       text-gray-900 dark:text-white">
          <LayoutDashboard className="inline mr-2 text-orange-500" />
          Grocery<span className="text-orange-500">Go</span>
        </h1>

        {/* Quote with Orange Highlight */}
        <p className="text-lg md:text-xl mb-10 
                      text-orange-600 dark:text-orange-400 
                      font-medium min-h-[30px]">
          “{typedText}”
          <span className="animate-pulse">|</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/register"
            className="flex items-center gap-2 
                       bg-orange-500 hover:bg-orange-600 
                       text-white px-8 py-3 rounded-full 
                       font-semibold transition shadow-md"
          >
            <UserPlus size={18} />
            Get Started
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2
                       border border-orange-500 
                       text-orange-500 
                       px-8 py-3 rounded-full 
                       font-semibold 
                       hover:bg-orange-500 hover:text-white
                       transition"
          >
            <LogIn size={18} />
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;