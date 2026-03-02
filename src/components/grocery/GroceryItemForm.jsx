import { useState } from "react";

const GroceryItemForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    item_name: "",
    quantity: 1,
    unit: "piece",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.item_name.trim()) return;

    onAdd({
      item_name: form.item_name.trim().toLowerCase(),
      quantity: Number(form.quantity) || 1,
      unit: form.unit,
      price: Number(form.price) || 0,
    });

    setForm({
      item_name: "",
      quantity: 1,
      unit: "piece",
      price: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white dark:bg-gray-900 p-6 rounded-2xl border border-orange-200 dark:border-gray-700 shadow-md
                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      {/* Item Name */}
      <input
        type="text"
        placeholder="Enter item name..."
        value={form.item_name}
        onChange={(e) =>
          setForm({ ...form, item_name: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
      />

      {/* Quantity */}
      <input
        type="number"
        min="1"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
      />

      {/* Unit */}
      <select
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
      >
        <option value="piece">Piece</option>
        <option value="kg">Kg</option>
        <option value="g">Gram</option>
        <option value="litre">Litre</option>
        <option value="ml">ML</option>
      </select>

      {/* Price */}
      <input
        type="number"
        min="0"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
      />

      {/* Button */}
      <button
        type="submit"
        className="w-full lg:w-auto bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
      >
        Add
      </button>
    </form>
  );
};

export default GroceryItemForm;