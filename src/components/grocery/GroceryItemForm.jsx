import { useEffect } from "react";

const GroceryItemForm = ({ form, setForm, onAdd }) => {

  /* =====================================
     🔥 Load Last Used Category & Unit
     (Frontend enhancement)
  ====================================== */
  useEffect(() => {
    const savedCategory = localStorage.getItem("lastCategory");
    const savedUnit = localStorage.getItem("lastUnit");

    if (savedCategory || savedUnit) {
      setForm((prev) => ({
        ...prev,
        category: savedCategory || prev.category,
        unit: savedUnit || prev.unit,
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.item_name.trim()) return;

    const newItem = {
      ...form,
      quantity: Number(form.quantity) || 1,
      price: Number(form.price) || 0,
    };

    onAdd(newItem);

    // 🔥 Save last selections
    localStorage.setItem("lastCategory", form.category);
    localStorage.setItem("lastUnit", form.unit);

    // 🔥 Reset form (but keep last used category & unit)
    setForm({
      item_name: "",
      category: form.category,
      quantity: "",
      unit: form.unit,
      price: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-[#1f2937]
        p-8 md:p-10
        rounded-3xl
        border border-orange-300 dark:border-orange-500/30
        shadow-[0_30px_80px_rgba(191,54,12,0.2)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        hover:shadow-[0_40px_100px_rgba(191,54,12,0.3)]
        transition-all duration-500 ease-out
        grid grid-cols-1 md:grid-cols-6 gap-6
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
        className="
          px-5 py-3
          border border-orange-300 dark:border-orange-500/30
          rounded-2xl
          focus:ring-2 focus:ring-orange-400
          focus:border-orange-400
          outline-none
          transition-all duration-300 ease-out
          text-[#BF360C] dark:text-orange-300
          placeholder-[#A64B2A] dark:placeholder-gray-400
          bg-[#FFFDFB] dark:bg-[#111827]
        "
      />

      {/* Category */}
      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="
          px-5 py-3
          border border-orange-300 dark:border-orange-500/30
          rounded-2xl
          focus:ring-2 focus:ring-orange-400
          outline-none
          transition-all duration-300
          text-[#BF360C] dark:text-orange-300
          bg-[#FFFDFB] dark:bg-[#111827]
        "
      >
        <option value="">Category</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="Groceries">Groceries</option>
        <option value="Others">Others</option>
      </select>

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
        className="
          px-5 py-3
          border border-orange-300 dark:border-orange-500/30
          rounded-2xl
          focus:ring-2 focus:ring-orange-400
          outline-none
          transition-all duration-300
          text-[#BF360C] dark:text-orange-300
          placeholder-[#A64B2A] dark:placeholder-gray-400
          bg-[#FFFDFB] dark:bg-[#111827]
        "
      />

      {/* Unit */}
      <select
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
        className="
          px-5 py-3
          border border-orange-300 dark:border-orange-500/30
          rounded-2xl
          focus:ring-2 focus:ring-orange-400
          outline-none
          transition-all duration-300
          text-[#BF360C] dark:text-orange-300
          bg-[#FFFDFB] dark:bg-[#111827]
        "
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
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="
          px-5 py-3
          border border-orange-300 dark:border-orange-500/30
          rounded-2xl
          focus:ring-2 focus:ring-orange-400
          outline-none
          transition-all duration-300
          text-[#BF360C] dark:text-orange-300
          placeholder-[#A64B2A] dark:placeholder-gray-400
          bg-[#FFFDFB] dark:bg-[#111827]
        "
      />

      {/* Button */}
      <button
        type="submit"
        className="
          relative
          bg-gradient-to-r from-[#F4511E] to-[#E64A19]
          text-white
          rounded-2xl
          py-3
          font-semibold tracking-wide
          shadow-[0_12px_35px_rgba(244,81,30,0.4)]
          hover:shadow-[0_18px_50px_rgba(244,81,30,0.6)]
          hover:-translate-y-1
          active:scale-95
          transition-all duration-300
          overflow-hidden
        "
      >
        <span className="relative z-10">Add Item</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      </button>
    </form>
  );
};

export default GroceryItemForm;