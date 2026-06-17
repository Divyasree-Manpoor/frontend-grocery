
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Utensils,
  History,
  X,
  Menu,
  Activity,
  HeartPulse,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ open = false, setOpen = () => {} }) => {
  const { user } = useContext(AuthContext);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Grocery", path: "/grocery", icon: ShoppingCart },
    { name: "Pantry", path: "/pantry", icon: Package },
    { name: "Meals", path: "/meals", icon: Utensils },
    { name: "Nutrition", path: "/nutrition", icon: Activity },
    { name: "Diet Planner", path: "/diet", icon: HeartPulse },
    { name: "History", path: "/history", icon: History },
    { name: "Shopping", path: "/shopping", icon: ShoppingCart },
  ];

  return (
    <>
      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-4 left-4 z-50 md:hidden
          p-3 rounded-xl
          bg-white
          dark:bg-gray-900
          border border-gray-200
          dark:border-gray-700
          shadow-lg
          hover:scale-105
          active:scale-95
          transition-all
        "
      >
        <Menu
          size={22}
          className="text-orange-500 dark:text-orange-400"
        />
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40
            backdrop-blur-sm
            md:hidden
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          z-50

          h-screen
          w-64

          bg-white
          dark:bg-gray-900

          border-r
          border-gray-200
          dark:border-gray-800

          p-6
          flex flex-col

          shadow-xl
          dark:shadow-2xl
          md:shadow-none

          transition-transform
          duration-300
          ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-xl font-bold text-orange-500">
            GroceryGo
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="
              p-2 rounded-lg
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition-colors
            "
          >
            <X
              size={20}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>
        </div>

        {/* DESKTOP BRAND */}
        <div className="hidden md:block mb-10">
          <h2 className="text-2xl font-bold text-orange-500">
            GroceryGo
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
              truncate
            "
          >
            {user?.name || "Welcome"}
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  px-4 py-3
                  rounded-xl

                  font-medium

                  transition-all duration-300

                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : `
                        text-gray-700
                        dark:text-gray-300

                        hover:bg-orange-50
                        dark:hover:bg-gray-800

                        hover:text-orange-600
                        dark:hover:text-orange-400
                      `
                  }
                `
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div
          className="
            mt-6
            pt-6

            border-t
            border-gray-200
            dark:border-gray-800

            text-center
            text-xs

            text-gray-500
            dark:text-gray-400
          "
        >
          © {new Date().getFullYear()} GroceryGo
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
