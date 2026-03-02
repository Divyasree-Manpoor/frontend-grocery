import { useEffect, useState } from "react";

const FitnessGoalCard = () => {
  const [goal, setGoal] = useState("Maintain");
  const [calorieTarget, setCalorieTarget] = useState(2000);

  /* ===============================
     LOAD FROM STORAGE
  =============================== */
  useEffect(() => {
    const savedGoal = localStorage.getItem("fitnessGoal");
    if (savedGoal) {
      setGoal(savedGoal);
      updateCalories(savedGoal);
    }
  }, []);

  /* ===============================
     UPDATE CALORIE TARGET
  =============================== */
  const updateCalories = (selectedGoal) => {
    let calories = 2000;

    if (selectedGoal === "Weight Loss") calories = 1600;
    if (selectedGoal === "Muscle Gain") calories = 2500;

    setCalorieTarget(calories);
  };

  const handleChange = (value) => {
    setGoal(value);
    localStorage.setItem("fitnessGoal", value);
    updateCalories(value);
  };

  const getDescription = () => {
    if (goal === "Weight Loss")
      return "Focus on calorie deficit and high protein meals.";

    if (goal === "Muscle Gain")
      return "Increase protein and calorie intake.";

    return "Maintain balanced nutrition for steady health.";
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700 space-y-6">

      <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
        Fitness Goal
      </h3>

      <select
        value={goal}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-3 rounded-xl border dark:bg-gray-800"
      >
        <option>Maintain</option>
        <option>Weight Loss</option>
        <option>Muscle Gain</option>
      </select>

      {/* Goal Info */}
      <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-2xl border border-orange-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Recommended Daily Calories
        </p>

        <p className="text-2xl font-bold text-orange-600 mt-2">
          {calorieTarget} kcal
        </p>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {getDescription()}
        </p>
      </div>

      {/* Progress Indicator */}
      <div>
        <p className="text-sm mb-2 text-gray-500">
          Goal Progress (Demo Indicator)
        </p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: "60%" }}
          />
        </div>
      </div>

    </div>
  );
};

export default FitnessGoalCard;