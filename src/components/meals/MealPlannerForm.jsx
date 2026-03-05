import { useState } from "react";
import { toast } from "sonner";

const MealPlannerForm = ({ onAdd }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    meal_name: "",
    meal_date: "",
    meal_type: "Breakfast",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = form.meal_name.trim();

    if (!trimmedName) {
      toast.warning("Meal name is required");
      return;
    }

    if (!form.meal_date) {
      toast.warning("Please select a date");
      return;
    }

    if (form.meal_date < today) {
      toast.warning("Cannot select a past date");
      return;
    }

    try {
      setLoading(true);

      await onAdd({
        ...form,
        meal_name: trimmedName,
      });

      toast.success("Meal added successfully");

      setForm({
        meal_name: "",
        meal_date: "",
        meal_type: "Breakfast",
      });

    } catch {
      toast.error("Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        bg-white dark:bg-[#1f2937]
        p-4 sm:p-6
        rounded-3xl
        shadow-md
        border border-orange-200 dark:border-gray-700
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        gap-4 sm:gap-6
      "
    >

      {/* Meal Name */}
      <input
        type="text"
        placeholder="Meal name"
        value={form.meal_name}
        onChange={(e) =>
          setForm({ ...form, meal_name: e.target.value })
        }
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-orange-300
          dark:border-gray-600
          focus:ring-2 focus:ring-orange-400
          outline-none
          dark:bg-gray-800 dark:text-white
        "
        required
      />

      {/* Date */}
      <input
        type="date"
        min={today}
        value={form.meal_date}
        onChange={(e) =>
          setForm({ ...form, meal_date: e.target.value })
        }
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-orange-300
          dark:border-gray-600
          focus:ring-2 focus:ring-orange-400
          outline-none
          dark:bg-gray-800 dark:text-white
        "
        required
      />

      {/* Meal Type (Premium Feature) */}
      <select
        value={form.meal_type}
        onChange={(e) =>
          setForm({ ...form, meal_type: e.target.value })
        }
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-orange-300
          dark:border-gray-600
          focus:ring-2 focus:ring-orange-400
          outline-none
          dark:bg-gray-800 dark:text-white
        "
      >
        <option value="">select</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-orange-600 hover:bg-orange-700
          dark:bg-orange-500 dark:hover:bg-orange-600
          text-white
          rounded-xl
          font-semibold
          py-3
          transition
          disabled:opacity-70
        "
      >
        {loading ? "Adding..." : "Add Meal"}
      </button>

    </form>
  );
};

export default MealPlannerForm;