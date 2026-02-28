import { Trash2, Pencil, Check } from "lucide-react";
import { useState } from "react";

const MealPlanCard = ({ plan, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(plan.meal_name);

  const handleSave = () => {
    onUpdate(plan.id, newName);
    setEditing(false);
  };

  const dateObj = new Date(plan.meal_date);

  const day = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const date = dateObj.getDate();

  return (
    <div
      className="bg-white dark:bg-[#1f2937]
                 rounded-3xl shadow-lg
                 border border-orange-200 dark:border-gray-700
                 px-8 py-6
                 flex items-center justify-between
                 hover:shadow-2xl transition-all duration-300"
    >
      {/* LEFT SIDE - DAY + DATE */}
      <div className="flex items-center gap-6">

        <div
          className="bg-orange-100 dark:bg-orange-500/20
                     text-orange-600 dark:text-orange-400
                     font-bold
                     px-5 py-3
                     rounded-2xl
                     text-center"
        >
          <p className="text-sm">{day.toUpperCase()}</p>
          <p className="text-lg leading-none">{date}</p>
        </div>

        {/* CENTER - MEAL NAME */}
        <div>
          {editing ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-1 rounded border 
                         dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 capitalize">
              {plan.meal_name}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - ACTIONS */}
      <div className="flex items-center gap-5">
        {editing ? (
          <button
            onClick={handleSave}
            className="text-green-500 hover:scale-110 transition"
          >
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-500 hover:scale-110 transition"
          >
            <Pencil size={20} />
          </button>
        )}

        <button
          onClick={() => onDelete(plan.id)}
          className="text-red-500 hover:scale-110 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default MealPlanCard;