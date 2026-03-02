import { useState } from "react";

const AutoMealPlanner = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const sampleMeal = {
      meal_name: "AI Suggested Meal",
      meal_date: new Date().toISOString().split("T")[0],
    };

    await onGenerate(sampleMeal);

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">
        AI Auto Meal Planner
      </h3>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl transition"
      >
        {loading ? "Generating..." : "Generate Meal Plan"}
      </button>
    </div>
  );
};

export default AutoMealPlanner;