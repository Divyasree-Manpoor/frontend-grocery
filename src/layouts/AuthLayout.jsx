import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        px-4 sm:px-6
        bg-gradient-to-br
        from-orange-100 via-orange-50 to-orange-200
        dark:from-gray-950 dark:via-gray-900 dark:to-black
        transition-colors duration-500
      "
    >
      <div
        className="
          w-full max-w-md
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-lg
          p-6 sm:p-8
          rounded-3xl
          shadow-2xl
          border border-orange-200 dark:border-gray-700
          transition-all duration-300
        "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;