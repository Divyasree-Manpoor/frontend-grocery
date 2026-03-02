import { useEffect, useMemo, useState } from "react";
import {
  addPantryItem,
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from "../../services/pantryService";

import PantryForm from "../../components/pantry/PantryForm";
import PantryList from "../../components/pantry/PantryList";
import PantryAnalytics from "../../components/pantry/pantryAnalytics";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";

const PantryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);

  /* ===============================
     SMART CATEGORY DETECTION
  =============================== */
  const detectCategory = (name) => {
    const item = name.toLowerCase();

    if (item.includes("milk") || item.includes("cheese") || item.includes("butter"))
      return "Dairy";
    if (item.includes("tomato") || item.includes("onion") || item.includes("carrot") || item.includes("potato"))
      return "Vegetables";
    if (item.includes("apple") || item.includes("banana") || item.includes("orange"))
      return "Fruits";
    if (item.includes("rice") || item.includes("wheat") || item.includes("oats"))
      return "Grains";

    return "Others";
  };

  /* ===============================
     FETCH ITEMS
  =============================== */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getPantryItems();
      setItems(res.data || []);
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
     AUTO EXPIRY ALERT
  =============================== */
  useEffect(() => {
    const today = new Date();
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    items.forEach((item) => {
      if (!item.expiry_date) return;

      const expiry = new Date(item.expiry_date);
      const diff = expiry - today;

      if (diff > 0 && diff <= threeDays) {
        toast.warning(`${item.item_name} expires soon!`);
      }
    });
  }, [items]);

  /* ===============================
     ADD ITEM
  =============================== */
  const handleAdd = async (formData) => {
    try {
      const category = detectCategory(formData.item_name);

      const res = await addPantryItem({
        ...formData,
        category,
      });

      setItems((prev) => [...prev, res.data]);
      toast.success("Item added successfully");
    } catch {
      toast.error("Failed to add item");
    }
  };

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = async (id) => {
    try {
      await deletePantryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ===============================
     UPDATE
  =============================== */
  const handleUpdate = async (id, newQuantity) => {
    try {
      const res = await updatePantryItem(id, {
        quantity: newQuantity,
      });

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? res.data : item
        )
      );

      toast.success("Quantity updated");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ===============================
     FILTER + SEARCH
  =============================== */
  const filteredItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return items.filter((item) => {
      const matchSearch =
        item.item_name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        filterCategory === "All" ||
        item.category === filterCategory;

      let matchExpired = true;

      if (showExpiredOnly && item.expiry_date) {
        const expiry = new Date(item.expiry_date);
        expiry.setHours(0, 0, 0, 0);
        matchExpired = expiry < today;
      }

      return matchSearch && matchCategory && matchExpired;
    });
  }, [items, search, filterCategory, showExpiredOnly]);

  /* ===============================
     SMART INSIGHT
  =============================== */
  const smartInsight = useMemo(() => {
    const lowStock = items.filter(i => i.quantity <= 2).length;
    const expired = items.filter(i => {
      if (!i.expiry_date) return false;
      return new Date(i.expiry_date) < new Date();
    }).length;

    if (expired > 0)
      return "⚠️ You have expired items. Clean them soon.";
    if (lowStock > 3)
      return "🛒 Many items are low stock. Time to restock!";
    if (items.length === 0)
      return "Start adding pantry items to track inventory.";
    return "✅ Pantry looks healthy and organized!";
  }, [items]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 space-y-12">

      {/* HEADER */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
          alt="Pantry"
          className="w-full h-44 md:h-52 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center px-6 md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Smart Pantry Management
          </h2>
        </div>
      </div>

      {/* SMART INSIGHT */}
      <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-2xl border border-orange-200 dark:border-gray-700">
        <p className="font-semibold text-orange-600">
          Pantry Insight
        </p>
        <p className="mt-2 text-sm">{smartInsight}</p>
      </div>

      {/* ANALYTICS */}
      <PantryAnalytics items={items} />

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md border border-orange-200 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <input
          type="text"
          placeholder="Search pantry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-orange-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white w-full md:w-64"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-xl border border-orange-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Others">Others</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showExpiredOnly}
            onChange={() =>
              setShowExpiredOnly(!showExpiredOnly)
            }
          />
          Show Expired Only
        </label>
      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-lg border border-orange-200">
        <PantryForm onAdd={handleAdd} pantryItems={items} />
      </div>

      {/* LIST */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No Pantry Items Found"
          description="Try changing filters or add new items."
        />
      ) : (
        <PantryList
          items={filteredItems}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default PantryPage;