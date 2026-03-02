import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Utensils,
  History,
  X,
  Menu,
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
          p-2.5 rounded-xl
          bg-white dark:bg-gray-900
          shadow-lg
          border border-orange-200 dark:border-gray-700
          hover:scale-105 active:scale-95
          transition
        "
      >
        <Menu size={22} className="text-orange-500 dark:text-orange-400" />
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40 backdrop-blur-sm
            md:hidden
            transition-opacity duration-300
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full w-64
          bg-white dark:bg-gray-900
          border-r border-orange-100 dark:border-gray-800
          p-6 flex flex-col
          shadow-2xl md:shadow-none
          transition-transform duration-300 ease-in-out
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
              p-1.5 rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* DESKTOP BRAND */}
        <div className="hidden md:block mb-12">
          <h2 className="text-2xl font-bold text-orange-500">
            GroceryGo
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
            {user?.name}
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2">
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
                  rounded-2xl
                  font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
                  }
                `
                }
              >
                <Icon
                  size={20}
                  className="transition-colors duration-300"
                />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="
          mt-auto pt-10
          text-xs
          text-gray-400 dark:text-gray-500
          text-center
        ">
          © {new Date().getFullYear()} GroceryGo
        </div>
      </aside>
    </>
  );
};

export default Sidebar;