import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        flex min-h-screen
        bg-gray-50 dark:bg-gray-950
        text-gray-800 dark:text-gray-100
        transition-colors duration-500
      "
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* Page Content */}
        <main
          className="
            flex-1
            p-4 sm:p-6 md:p-8
            transition-all duration-300
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;