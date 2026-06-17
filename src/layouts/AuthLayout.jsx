
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        px-4

        bg-gradient-to-br
        from-orange-50
        via-orange-100
        to-orange-200

        dark:from-gray-900
        dark:via-gray-800
        dark:to-gray-900

        transition-colors duration-500
      "
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;

