import { useEffect, useState } from "react";
import {
  addPantryItem,
  getPantryItems,
  deletePantryItem,
} from "../services/pantryService";
import PantryForm from "../components/pantry/PantryForm";
import PantryList from "../components/pantry/PantryList";
import Loader from "../components/common/Loader";
import { toast } from "sonner";

const PantryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     SMART CATEGORY
  =============================== */
  const detectCategory = (name) => {
    const item = name.toLowerCase();

    if (["milk", "cheese", "butter", "yogurt"].includes(item))
      return "Dairy";

    if (["tomato", "onion", "carrot", "potato"].includes(item))
      return "Vegetables";

    if (["apple", "banana", "orange"].includes(item))
      return "Fruits";

    if (["rice", "wheat", "oats"].includes(item))
      return "Grains";

    return "Others";
  };

  /* ===============================
     FETCH FROM BACKEND
  =============================== */
  const fetchItems = async () => {
    try {
      const res = await getPantryItems();
      const backendData = res.data || [];

      setItems(backendData);

      localStorage.setItem(
        "pantry",
        JSON.stringify(backendData)
      );
    } catch {
      toast.error("Failed to load pantry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ===============================
     ADD ITEM (Backend First)
  =============================== */
  const handleAdd = async (formData) => {
  try {
    const category = detectCategory(formData.item_name);

    const res = await addPantryItem({
      ...formData,
      category,
    });

    const newItem = res.data.item[0];

    const updated = [...items, newItem];

    setItems(updated);

    toast.success("Item added successfully");

  } catch (error) {
    console.log("ADD ERROR:", error);
    toast.error("Failed to add item");
  }
};
  /* ===============================
     DELETE ITEM
  =============================== */
  const handleDelete = async (id) => {
    try {
      await deletePantryItem(id);

      const updated = items.filter(
        (item) => item.id !== id
      );

      setItems(updated);

      localStorage.setItem(
        "pantry",
        JSON.stringify(updated)
      );

      toast.success("Item removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ===============================
     UPDATE QUANTITY (Frontend Only)
  =============================== */
  const handleUpdate = async (id, newQuantity) => {
    try {
      const updated = items.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      );

      setItems(updated);

      localStorage.setItem(
        "pantry",
        JSON.stringify(updated)
      );

      toast.success("Quantity updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
      dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]
      px-6 py-14
      transition-colors duration-300
    "
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#BF360C] dark:text-orange-400">
            Pantry Management
          </h2>

          <p className="text-[#8D2B0B] dark:text-gray-400 mt-3 text-base md:text-lg">
            Smart inventory tracking with expiry alerts and low-stock reminders.
          </p>
        </div>

        <div
          className="
          bg-white dark:bg-[#1f2937]
          p-8 rounded-2xl shadow-lg
          border border-orange-200 dark:border-gray-700
          transition-all duration-300
        "
        >
          <PantryForm onAdd={handleAdd} />
        </div>

        <div className="mt-14">
          <PantryList
            items={items}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default PantryPage;