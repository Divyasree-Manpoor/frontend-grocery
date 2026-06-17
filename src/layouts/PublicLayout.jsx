import { Outlet } from "react-router-dom";

const PublicLayout = () => {
return (
<div
className="
min-h-screen


    bg-gray-50
    dark:bg-gray-950

    text-gray-900
    dark:text-gray-100

    transition-colors duration-500
  "
>
  <Outlet />
</div>


);
};

export default PublicLayout;
