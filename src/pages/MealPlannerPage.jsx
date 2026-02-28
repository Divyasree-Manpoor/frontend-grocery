import { useEffect, useState } from "react";
import {
  addMealPlan,
  getMealPlans,
  deleteMealPlan,
} from "../services/mealService";

import MealPlannerForm from "../components/meal/MealPlannerForm";
import MealPlanCard from "../components/meal/MealPlanCard";
import MealSuggestions from "../components/meal/MealSuggestions";
import Loader from "../components/common/Loader";
import { toast } from "sonner";
import NutritionPage from "./NutritionPage";
/* ================================
   FALLBACK MEALS (LOCAL)
================================ */

const fallbackMeals = [
  {
    id: 1,
    meal_name: "Tomato Chutney",
    ingredients: ["Tomato", "Chilli"],
    calories: 120,
    protein: 2,
    carbs: 10,
    fat: 5,
  },
  {
    id: 2,
    meal_name: "Veg Curry",
    ingredients: ["Onion", "Tomato", "Potato"],
    calories: 250,
    protein: 6,
    carbs: 35,
    fat: 8,
  },
  {
    id: 3,
    meal_name: "Pasta",
    ingredients: ["Pasta", "Cheese", "Tomato"],
    calories: 400,
    protein: 12,
    carbs: 60,
    fat: 15,
  },
];

const MealPlannerPage = () => {
  const [plans, setPlans] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================================
     FETCH DATA
  ================================= */
  const fetchData = async () => {
    try {
      const plansRes = await getMealPlans();
      setPlans(plansRes.data || []);

      /* ================================
         GET PANTRY ITEMS
      ================================= */
      const pantry =
        JSON.parse(localStorage.getItem("pantry")) || [];

      const pantryNames = pantry.map((p) =>
        p.item_name.toLowerCase().trim()
      );

      /* ================================
         STORE FALLBACK MEALS FRESH
      ================================= */
      localStorage.setItem(
        "allMeals",
        JSON.stringify(fallbackMeals)
      );

      const allMeals =
        JSON.parse(localStorage.getItem("allMeals")) || [];

      /* ================================
         STRICT MATCH LOGIC
      ================================= */
      const filtered = allMeals.filter((meal) =>
        meal.ingredients.every((ing) =>
          pantryNames.includes(
            ing.toLowerCase().trim()
          )
        )
      );

      setSuggestions(filtered);
    } catch (error) {
      toast.error("Failed to load meal data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================================
     ADD PLAN
  ================================= */
  const handleAdd = async (form) => {
    try {
      await addMealPlan(form);
      toast.success("Meal added!");
      fetchData();
    } catch {
      toast.error("Add failed");
    }
  };

  /* ================================
     DELETE PLAN
  ================================= */
  const handleDelete = async (id) => {
    try {
      await deleteMealPlan(id);
      toast.success("Meal deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
                    dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]
                    px-6 py-14">

      <div className="max-w-7xl mx-auto space-y-14">

        <h2 className="text-4xl font-bold text-[#BF360C] dark:text-orange-400">
          Meal Planner
        </h2>

        <MealPlannerForm onAdd={handleAdd} />

        {/* Planned Meals */}
        <div>
          <h3 className="text-2xl font-semibold text-[#BF360C] dark:text-orange-400 mb-6">
            Planned Meals
          </h3>

          <div className="grid gap-6">
            {plans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="text-2xl font-semibold text-[#BF360C] dark:text-orange-400 mb-6">
            Suggested Meals From Pantry
          </h3>

          <MealSuggestions suggestions={suggestions} />
        </div>
        <div className="mt-16">
  <NutritionPage />
</div>

      </div>
    </div>
  );
};

export default MealPlannerPage;