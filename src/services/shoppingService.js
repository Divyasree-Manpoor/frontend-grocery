import API from "./api";

/* =========================
   🛍 SHOPPING SERVICES
========================= */

// Complete Shopping
export const completeShopping = (data) =>
  API.post("/shopping/complete", data);

// Get Shopping History
export const getShoppingHistory = () =>
  API.get("/shopping/history");