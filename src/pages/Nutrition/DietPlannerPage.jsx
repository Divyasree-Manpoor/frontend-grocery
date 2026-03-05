import { useEffect, useState } from "react";
import { updateFitnessGoal } from "../../services/userService";
import API from "../../services/api";
import { toast } from "sonner";

const DietPlannerPage = () => {

  const [goal, setGoal] = useState("none");
  const [loading, setLoading] = useState(false);

  /* ===============================
     LOAD CURRENT GOAL
  =============================== */
  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    try {
      const res = await API.get("/users/profile");
      if (res.data?.fitness_goal) {
        setGoal(res.data.fitness_goal);
      }
    } catch {
      console.log("Failed to load goal");
    }
  };

  /* ===============================
     SAVE FITNESS GOAL
  =============================== */
  const handleSave = async () => {
    try {
      setLoading(true);
      await updateFitnessGoal(goal);
      toast.success("Fitness goal updated successfully");
    } catch {
      toast.error("Failed to update goal");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     GOAL INFO
  =============================== */
  const getGoalInfo = () => {

    if (goal === "weight_loss") {
      return {
        calories: "1600 - 1800 kcal",
        description:
          "Focus on calorie deficit with high-protein meals and vegetables.",
      };
    }

    if (goal === "muscle_gain") {
      return {
        calories: "2400 - 2800 kcal",
        description:
          "Increase protein intake and consume balanced high-calorie meals.",
      };
    }

    return {
      calories: "2000 kcal",
      description:
        "Maintain balanced nutrition with carbs, protein, and healthy fats.",
    };
  };

  const goalInfo = getGoalInfo();

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-orange-600">
        Diet Planner
      </h2>

      {/* SELECT GOAL */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow border border-orange-200 dark:border-gray-700 space-y-5">

        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Select your fitness goal
        </p>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-3 rounded-xl dark:bg-gray-800"
        >
            <option value="none">None</option>
          <option value="maintain">Maintain Weight</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
        </select>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"
        >
          {loading ? "Saving..." : "Save Goal"}
        </button>

      </div>

      {/* GOAL INFO */}
      <div className="bg-orange-50 dark:bg-gray-900 p-6 rounded-3xl border border-orange-200 dark:border-gray-700">

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          Recommended Nutrition
        </h3>

        <p className="text-gray-600 dark:text-gray-400">
          Daily Calories: <span className="font-semibold">{goalInfo.calories}</span>
        </p>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {goalInfo.description}
        </p>

      </div>

    </div>
  );
};

export default DietPlannerPage;