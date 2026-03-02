import API from "./api";

/* =========================
   🛒 GROCERY LIST SERVICES
========================= */

// Create List
export const createList = (data) =>
  API.post("/grocery/lists", data);

// Get Lists
export const getLists = () =>
  API.get("/grocery/lists");

// Update List
export const updateList = (id, data) =>
  API.put(`/grocery/lists/${id}`, data);

// Delete List
export const deleteList = (id) =>
  API.delete(`/grocery/lists/${id}`);


/* =========================
   🧺 GROCERY ITEM SERVICES
========================= */

// Add Item
export const addItem = (data) =>
  API.post("/grocery/items", data);

// Get Items By List
export const getItems = (listId) =>
  API.get(`/grocery/items/${listId}`);

// Update Item
export const updateItem = (id, data) =>
  API.put(`/grocery/items/${id}`, data);

// Delete Item
export const deleteItem = (id) =>
  API.delete(`/grocery/items/${id}`);


/* =========================
   🎟 COUPONS
========================= */

export const getCoupons = (listId) =>
  API.get(`/grocery/coupons/${listId}`);


/* =========================
   💰 BUDGET
========================= */

export const getBudgetSummary = () =>
  API.get("/grocery/budget");


/* =========================
   🛍 SHOPPING (Separate Route)
========================= */

export const completeShopping = (data) =>
  API.post("/shopping/complete", data);

export const getShoppingHistory = () =>
  API.get("/shopping/history");


/* =========================
   🥫 PANTRY (Separate Route)
========================= */

export const addPantryItem = (data) =>
  API.post("/pantry", data);

export const getPantryItems = () =>
  API.get("/pantry");


/* =========================
   🍽 MEALS (Separate Route)
========================= */

export const getMeals = () =>
  API.get("/meals/plans");