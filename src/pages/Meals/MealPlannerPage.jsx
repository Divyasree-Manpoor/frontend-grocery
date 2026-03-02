import { useEffect, useState } from "react";
import {
  addMealPlan,
  getMealPlans,
  deleteMealPlan,
  getMealSuggestions,
} from "../../services/mealService";

import MealPlannerForm from "../../components/meals/MealPlannerForm";
import MealPlanCard from "../../components/meals/MealPlanCard";
import MealSuggestions from "../../components/meals/MealSuggestionCard";
import WeeklyCalendar from "../../components/meals/WeeklyCalendar";
import WeeklyProgress from "../../components/meals/WeeklyProgress";
import FitnessGoalCard from "../../components/meals/FitnessGoalCard";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";

const MealPlannerPage = () => {
  const [plans, setPlans] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const plansRes = await getMealPlans();
      const suggestionsRes = await getMealSuggestions();

      setPlans(plansRes.data || []);
      setSuggestions(suggestionsRes.data?.suggestions || []);
    } catch {
      toast.error("Failed to load meal data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (form) => {
    try {
      await addMealPlan(form);
      toast.success("Meal added!");
      fetchData();
    } catch {
      toast.error("Add failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMealPlan(id);
      toast.success("Meal deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-6 py-10 space-y-12">

      {/* 🔥 Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          alt="Meal Planning"
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center px-10">
          <h2 className="text-3xl font-bold text-white">
            Smart Meal Planning
          </h2>
        </div>
      </div>


      {/* 📅 Weekly Calendar View */}
      <WeeklyCalendar plans={plans} />

      {/* 📊 Weekly Progress */}
      <WeeklyProgress plans={plans} />

      {/* 🏋️ Fitness Goals */}
      <FitnessGoalCard />

      {/* ➕ Add Meal */}
      <MealPlannerForm onAdd={handleAdd} />

      {/* Planned Meals */}
      <div>
        <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
          Planned Meals
        </h3>

        {plans.length === 0 ? (
          <EmptyState
            title="No Meals Planned"
            description="Add a meal plan to organize your weekly food."
          />
        ) : (
          <div className="grid gap-6">
            {plans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
          Suggested Meals From Pantry
        </h3>

        {suggestions.length === 0 ? (
          <EmptyState
            title="No Matching Meals"
            description="Add pantry items to get meal suggestions."
          />
        ) : (
          <MealSuggestions suggestions={suggestions} />
        )}
      </div>

    </div>
  );
};

export default MealPlannerPage;