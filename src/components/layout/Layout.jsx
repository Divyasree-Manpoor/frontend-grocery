import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        flex min-h-screen
        bg-gradient-to-br
        from-[#FFF6F2] via-[#FFE8DE] to-[#FFD8C8]
        dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]
        transition-colors duration-300
      "
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`
            absolute inset-0
            bg-black/40 dark:bg-black/70
            backdrop-blur-sm
            transition-opacity duration-300
            ${open ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`
            absolute left-0 top-0 h-full w-72
            bg-white dark:bg-[#1f2937]
            shadow-2xl
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Navbar setOpen={setOpen} />

        <main
          className="
            flex-1 p-6 md:pl-4
            text-gray-800 dark:text-gray-200
            transition-colors duration-300
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;