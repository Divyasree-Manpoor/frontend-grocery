import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Utensils,
  History,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Grocery", path: "/grocery", icon: ShoppingCart },
    { name: "Pantry", path: "/pantry", icon: Package },
    { name: "Meals", path: "/meals", icon: Utensils },
    { name: "History", path: "/history", icon: History },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
        flex flex-col w-64 min-h-screen p-6
        bg-[#F6DDD3] dark:bg-[#111827]
        border-r border-orange-200 dark:border-gray-700
        transition-colors duration-300
      "
    >
      {/* Brand + Profile */}
      <div className="relative mb-12" ref={profileRef}>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenProfile(!openProfile)}
        >
          {/* User Initial */}
          <div
            className="
              w-11 h-11 flex items-center justify-center
              bg-orange-500 text-white
              rounded-full text-lg font-semibold
              shadow-md hover:scale-105
              transition
            "
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* App Name */}
          <h2 className="text-2xl font-bold tracking-wide text-orange-900 dark:text-orange-400">
            GroceryGo
          </h2>
        </div>

        {/* Profile Dropdown */}
        {openProfile && (
          <div
            className="
              absolute top-14 left-0 w-52
              bg-white dark:bg-[#1f2937]
              rounded-xl shadow-xl
              border border-orange-200 dark:border-gray-600
              p-4 transition-all duration-300
            "
          >
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 break-all mt-1">
              {user?.email}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                active
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;