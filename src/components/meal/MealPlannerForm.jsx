import { useState } from "react";

const MealPlannerForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    meal_name: "",
    meal_date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.meal_name || !form.meal_date) return;
    onAdd(form);
    setForm({ meal_name: "", meal_date: "" });
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-5"
          onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Meal name"
        value={form.meal_name}
        onChange={(e) =>
          setForm({ ...form, meal_name: e.target.value })
        }
        className="input-style"
        required
      />

      <input
        type="date"
        value={form.meal_date}
        onChange={(e) =>
          setForm({ ...form, meal_date: e.target.value })
        }
        className="input-style"
        required
      />

      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 
                   dark:bg-orange-500 dark:hover:bg-orange-600
                   text-white rounded-2xl font-semibold px-6 py-3 transition"
      >
        Add Meal
      </button>
    </form>
  );
};

export default MealPlannerForm;