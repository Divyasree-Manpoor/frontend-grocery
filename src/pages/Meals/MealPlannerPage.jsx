import { useEffect, useState } from "react";
import {
addMealPlan,
getMealPlans,
deleteMealPlan,
getMealSuggestions,
} from "../../services/mealService";
import API from "../../services/api";
import MealPlannerForm from "../../components/meals/MealPlannerForm";
import MealPlanCard from "../../components/meals/MealPlanCard";
import MealSuggestions from "../../components/meals/MealSuggestionCard";
import WeeklyCalendar from "../../components/meals/WeeklyCalendar";
import WeeklyProgress from "../../components/meals/WeeklyProgress";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";

const MealPlannerPage = () => {

const [plans, setPlans] = useState([]);
const [suggestions, setSuggestions] = useState([]);
const [loading, setLoading] = useState(true);

const [lists, setLists] = useState([]);

/* Store missing ingredients per meal */
const [missingMap, setMissingMap] = useState({});

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

/* ---------------- ADD MEAL ---------------- */

const handleAdd = async (form) => {

try {

  const res = await addMealPlan(form);

  if (res.data?.missingIngredients) {

    setMissingMap(prev => ({
      ...prev,
      [res.data.mealPlan.id]: res.data.missingIngredients
    }));

    setLists(res.data.lists);

    toast.warning("Some ingredients are missing");

  } else {

    toast.success("Meal added!");

  }

  fetchData();

} catch {

  toast.error("Add failed");

}

};

/* ---------------- DELETE MEAL ---------------- */

const handleDelete = async (id) => {

try {

  await deleteMealPlan(id);

  toast.success("Meal deleted");

  fetchData();

} catch {

  toast.error("Delete failed");

}

};

/* ---------------- UPDATE MEAL ---------------- */

const handleUpdate = async (id, mealName) => {

try {

  await API.put(`/meals/${id}`, {
    meal_name: mealName
  });

  toast.success("Meal updated");

  fetchData();

} catch {

  toast.error("Update failed");

}

};

/* ---------------- ADD MISSING ITEMS ---------------- */

const handleAddMissingItems = async (listId, planId) => {

  try {

    const plan = plans.find(p => p.id === planId);

    if (!plan || !plan.missing_ingredients) {
      toast.error("No missing ingredients found");
      return;
    }

    await API.post("/grocery/add-items", {
      list_id: listId,
      items: plan.missing_ingredients
    });

    toast.success("Items added to grocery list");

    fetchData(); // refresh meals

  } catch (err) {

    toast.error("Failed to add items");

  }

};

if (loading)
return ( <div className="flex justify-center items-center min-h-[60vh]"> <Loader size="lg" /> </div>
);

return (

<div className="px-6 py-10 space-y-12">

  {/* Banner */}

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

  {/* Weekly Calendar */}

  <WeeklyCalendar plans={plans} />

  {/* Weekly Progress */}

  <WeeklyProgress plans={plans} />

  {/* Add Meal */}

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
    onUpdate={handleUpdate}
    missingItems={plan.missing_ingredients}
    lists={lists}
    onAddMissing={handleAddMissingItems}
  />
))}

      </div>

    )}

  </div>

  {/* Meal Suggestions */}

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
