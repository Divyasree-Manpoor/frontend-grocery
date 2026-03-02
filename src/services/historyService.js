import API from "./api";

/* =========================
   📜 SHOPPING HISTORY SERVICES
========================= */

// Get all shopping history
export const getShoppingHistory = () =>
  API.get("/shopping/history");



// Get single history record (optional future use)
export const getHistoryById = (id) =>
  API.get(`/shopping/history/${id}`);