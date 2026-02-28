import API from "./api";

/* =========================
   🛒 GROCERY LIST SERVICES
========================= */

// Create List
export const createList = (data) =>
  API.post("/grocery/list", data);

// Get Lists
export const getLists = () =>
  API.get("/grocery/lists");

// Update List
export const updateList = (id, data) =>
  API.put(`/grocery/list/${id}`, data);

// Delete List
export const deleteList = (id) =>
  API.delete(`/grocery/list/${id}`);


/* =========================
   🧺 GROCERY ITEM SERVICES
========================= */

// Add Item
export const addItem = (data) =>
  API.post("/grocery/item", data);

// Get Items By List
export const getItems = (listId) =>
  API.get(`/grocery/items/${listId}`);

// Update Item
export const updateItem = (id, data) =>
  API.put(`/grocery/item/${id}`, data);

// Delete Item
export const deleteItem = (id) =>
  API.delete(`/grocery/item/${id}`);


/* =========================
   💰 BUDGET + COUPONS
========================= */

export const getBudgetSummary = () =>
  API.get("/grocery/budget");

export const getCoupons = (listId) =>
  API.get(`/grocery/coupons/${listId}`);


/* =========================
   🛍 SHOPPING
========================= */

// Complete Shopping
// Complete Shopping
// export const completeShopping = (data) =>
//   API.post("/shopping/complete-shopping", data);
export const completeShopping = (data) =>
  API.post("/grocery/complete", data);


// Get Shopping History
export const getShoppingHistory = () =>
  API.get("/grocery/history");

export const getMeals = () =>
  API.get("/meals");

export const getPantry = () =>
  API.get("/pantry");

/* =========================
   🥫 PANTRY SERVICES
========================= */

export const addPantryItem = (data) =>
  API.post("/pantry", data);

export const getPantryItems = () =>
  API.get("/pantry");