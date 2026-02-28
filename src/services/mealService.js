import API from "./api";

export const addMealPlan = (data) =>
  API.post("/meals", data);

export const getMealPlans = () =>
  API.get("/meals/plans");

export const deleteMealPlan = (id) =>
  API.delete(`/meals/plans/${id}`);

export const getMealSuggestions = () =>
  API.get("/meals/suggestions");