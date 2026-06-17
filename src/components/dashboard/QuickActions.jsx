import { useNavigate } from "react-router-dom";

const QuickActions = () => {
const navigate = useNavigate();

return (
<div
className="
bg-white
dark:bg-gray-900


    p-6 sm:p-8

    rounded-3xl

    border
    border-gray-200
    dark:border-gray-700

    shadow-lg
    hover:shadow-2xl

    transition-all duration-300

    space-y-5
  "
>
  <h3
    className="
      text-lg sm:text-xl
      font-semibold

      text-orange-600
      dark:text-orange-400
    "
  >
    Quick Actions
  </h3>

  {/* Grocery */}
  <button
    onClick={() => navigate("/grocery")}
    className="
      w-full

      bg-orange-500
      hover:bg-orange-600

      dark:bg-orange-600
      dark:hover:bg-orange-500

      text-white

      py-3

      rounded-2xl

      shadow-md
      hover:shadow-lg

      active:scale-95

      transition-all duration-200
    "
  >
    Create Grocery List
  </button>

  {/* Pantry */}
  <button
    onClick={() => navigate("/pantry")}
    className="
      w-full

      bg-green-500
      hover:bg-green-600

      dark:bg-green-600
      dark:hover:bg-green-500

      text-white

      py-3

      rounded-2xl

      shadow-md
      hover:shadow-lg

      active:scale-95

      transition-all duration-200
    "
  >
    Manage Pantry
  </button>

  {/* Meals */}
  <button
    onClick={() => navigate("/mealplanner")}
    className="
      w-full

      bg-blue-500
      hover:bg-blue-600

      dark:bg-blue-600
      dark:hover:bg-blue-500

      text-white

      py-3

      rounded-2xl

      shadow-md
      hover:shadow-lg

      active:scale-95

      transition-all duration-200
    "
  >
    Plan Meals
  </button>
</div>


);
};

export default QuickActions;
