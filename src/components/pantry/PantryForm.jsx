import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";

const PantryForm = ({ onAdd, pantryItems = [] }) => {
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    unit: "",
    expiry_date: "",
    category: "Other",
  });

  /* =============================
     SMART UNIT SUGGESTION
  ============================= */
  useEffect(() => {
    const name = form.item_name.toLowerCase();

    if (!form.unit) {
      if (["milk", "oil", "juice"].includes(name))
        setForm((prev) => ({ ...prev, unit: "L" }));

      if (["rice", "flour", "sugar"].includes(name))
        setForm((prev) => ({ ...prev, unit: "kg" }));

      if (["egg", "apple", "banana"].includes(name))
        setForm((prev) => ({ ...prev, unit: "pcs" }));
    }
  }, [form.item_name]);

  /* =============================
     EXPIRY REMINDER SYSTEM
  ============================= */
  useEffect(() => {
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    const now = new Date();

    pantryItems.forEach((item) => {
      if (!item.expiry_date) return;

      const expiry = new Date(item.expiry_date);
      const diff = expiry - now;

      if (diff > 0 && diff <= threeDays) {
        toast.warning(`${item.item_name} expires soon!`);
      }
    });
  }, [pantryItems]);

  /* =============================
     ANALYTICS
  ============================= */
  const analytics = useMemo(() => {
    const total = pantryItems.length;
    const lowStock = pantryItems.filter((i) => i.quantity <= 1).length;

    const expiring = pantryItems.filter((i) => {
      if (!i.expiry_date) return false;
      return new Date(i.expiry_date) - new Date() < 3 * 86400000;
    }).length;

    return { total, lowStock, expiring };
  }, [pantryItems]);

  /* =============================
     VALIDATION
  ============================= */
  const validateForm = () => {
    if (!form.item_name.trim()) {
      toast.warning("Item name required");
      return false;
    }

    if (Number(form.quantity) <= 0) {
      toast.warning("Quantity must be greater than 0");
      return false;
    }

    if (form.expiry_date && form.expiry_date < today) {
      toast.warning("Expiry date cannot be in the past");
      return false;
    }

    return true;
  };

  /* =============================
     SUBMIT
  ============================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await onAdd({
        item_name: form.item_name.trim(),
        quantity: Number(form.quantity),
        unit: form.unit,
        expiry_date: form.expiry_date || null,
        category: form.category,
      });

      if (Number(form.quantity) <= 1) {
        toast.info("Low stock detected — consider adding to grocery list 🛒");
      }

      toast.success("Item added successfully");

      setForm({
        item_name: "",
        quantity: "",
        unit: "",
        expiry_date: "",
        category: "Other",
      });
    } catch {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* 📊 Pantry Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat title="Total Items" value={analytics.total} />
        <Stat title="Low Stock" value={analytics.lowStock} />
        <Stat title="Expiring Soon" value={analytics.expiring} />
      </div>

      {/* 📝 Pantry Form */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white dark:bg-[#1f2937]
          p-6 sm:p-8
          rounded-3xl
          shadow-xl
          border border-orange-200 dark:border-gray-700
          grid gap-5
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
        "
      >
        <input
          type="text"
          placeholder="Item name"
          value={form.item_name}
          onChange={(e) =>
            setForm({ ...form, item_name: e.target.value })
          }
          className="premium-input"
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          min="1"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="premium-input"
          required
        />

        <select
          value={form.unit}
          onChange={(e) =>
            setForm({ ...form, unit: e.target.value })
          }
          className="premium-input"
        >
          <option value="">Select Unit</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="pcs">pcs</option>
        </select>

        <input
          type="date"
          min={today}
          value={form.expiry_date}
          onChange={(e) =>
            setForm({ ...form, expiry_date: e.target.value })
          }
          className="premium-input"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="premium-input"
        >
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Grains</option>
          <option>Snacks</option>
          <option>Other</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="
            bg-orange-600 hover:bg-orange-700
            dark:bg-orange-500 dark:hover:bg-orange-600
            text-white rounded-2xl font-semibold
            px-6 py-3
            transition-all duration-300
            shadow-md hover:shadow-lg
          "
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {/* Local Premium Styles */}
      <style>
        {`
          .premium-input {
            padding: 12px 16px;
            border-radius: 16px;
            border: 1px solid #f97316;
            background: white;
            outline: none;
            transition: all 0.3s ease;
          }

          .premium-input:focus {
            border-color: #ea580c;
            box-shadow: 0 0 0 2px rgba(249,115,22,0.3);
          }

          .dark .premium-input {
            background: #111827;
            border-color: #374151;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-orange-200 dark:border-gray-700">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-orange-600 mt-2">
      {value}
    </p>
  </div>
);

export default PantryForm;