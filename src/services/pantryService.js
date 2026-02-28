import API from "./api";

export const addPantryItem = (data) =>
  API.post("/pantry", data);

export const getPantryItems = () =>
  API.get("/pantry");

export const deletePantryItem = (id) =>
  API.delete(`/pantry/${id}`);

export const updatePantryItem = (id, data) =>
  API.put(`/pantry/${id}`, data);