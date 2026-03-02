import API from "./api";

/* =========================
   🍽 MEAL PLAN SERVICES
========================= */

// Add Meal Plan
export const addMealPlan = (data) =>
  API.post("/meals/plans", data);

// Get All Meal Plans
export const getMealPlans = () =>
  API.get("/meals/plans");

// Delete Meal Plan
export const deleteMealPlan = (id) =>
  API.delete(`/meals/plans/${id}`);

// Get Suggested Meals
export const getMealSuggestions = () =>
  API.get("/meals/suggestions");