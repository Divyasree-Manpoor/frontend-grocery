import API from "./api";

/* ==========================
   USER SETTINGS
========================== */

export const updateFitnessGoal = (goal) =>
  API.put("/users/fitness-goal", {
    fitness_goal: goal,
  });