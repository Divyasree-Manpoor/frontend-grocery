import API from "./api";

/* =========================
   💰 BUDGET SERVICES
========================= */

// Save or Update Monthly Budget
export const saveMonthlyBudget = (data) =>
  API.post("/budget", data);

// Get Current Month Budget
export const getCurrentMonthBudget = () =>
  API.get("/budget/current");