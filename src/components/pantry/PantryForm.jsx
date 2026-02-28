import { useState } from "react";

const PantryForm = ({ onAdd }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    unit: "",          // ✅ MUST be empty
    expiry_date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = form.item_name.trim();

    if (!trimmedName) return;
    if (!form.unit) return;
    if (Number(form.quantity) <= 0) return;

    onAdd({
      ...form,
      item_name: trimmedName,
      quantity: Number(form.quantity) || 1,
    });

    // ✅ Reset correctly
    setForm({
      item_name: "",
      quantity: "",
      unit: "",        // ✅ Reset empty
      expiry_date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        grid gap-6
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
      "
    >
      {/* Item Name */}
      <input
        type="text"
        placeholder="Item name"
        value={form.item_name}
        onChange={(e) =>
          setForm({ ...form, item_name: e.target.value })
        }
        className="input-style col-span-2 md:col-span-1"
        required
      />

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        min="1"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
        className="input-style"
        required
      />

      {/* Unit Select */}
      <select
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
        className="input-style"
        required
      >
        <option value="" disabled hidden>
          Select Unit
        </option>
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="L">L</option>
        <option value="ml">ml</option>
        <option value="pcs">pcs</option>
      </select>

      {/* Expiry Date */}
      <input
        type="date"
        min={today}
        value={form.expiry_date}
        onChange={(e) =>
          setForm({ ...form, expiry_date: e.target.value })
        }
        className="input-style"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="
          col-span-2 sm:col-span-2 md:col-span-1
          bg-orange-600 hover:bg-orange-700
          dark:bg-orange-500 dark:hover:bg-orange-600
          text-white rounded-2xl font-semibold
          px-6 py-3
          transition-all duration-300
          shadow-md hover:shadow-lg
        "
      >
        Add
      </button>
    </form>
  );
};

export default PantryForm;