import { useState, useEffect } from "react";
import { Trash2, Pencil, CheckCircle } from "lucide-react";
import { updateItem } from "../../services/groceryService";
import { toast } from "sonner";

const GroceryItemCard = ({ item, onDelete, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const [form, setForm] = useState({
    item_name: item.item_name,
    quantity: item.quantity,
    unit: item.unit || "piece",
    category: item.category || "",
    price: item.price,
  });

  /* ===================================
     🔥 Load purchased state (frontend)
  ==================================== */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("purchasedItems")) || [];

    if (stored.includes(item.id)) {
      setIsPurchased(true);
    }
  }, [item.id]);

  /* ===================================
     🔥 Toggle Purchased (Frontend Only)
  ==================================== */
  const togglePurchased = () => {
    const stored =
      JSON.parse(localStorage.getItem("purchasedItems")) || [];

    let updated;

    if (stored.includes(item.id)) {
      updated = stored.filter((id) => id !== item.id);
      setIsPurchased(false);
    } else {
      updated = [...stored, item.id];
      setIsPurchased(true);
    }

    localStorage.setItem(
      "purchasedItems",
      JSON.stringify(updated)
    );
  };

  /* ===================================
     🔥 Update Item (Backend)
  ==================================== */
  const handleUpdate = async () => {
    if (!form.item_name.trim()) {
      toast.warning("Item name required");
      return;
    }

    try {
      await updateItem(item.id, {
        item_name: form.item_name,
        quantity: Number(form.quantity) || 1,
        unit: form.unit,
        category: form.category,
        price: Number(form.price) || 0,
      });

      toast.success("Item updated successfully");
      setIsEditing(false);
      refresh();
    } catch {
      toast.error("Failed to update item");
    }
  };

  return (
    <div
      className={`
        rounded-2xl p-6 flex justify-between items-center
        transition-all duration-300 ease-out
        border
        ${
          isPurchased
            ? "bg-green-50 dark:bg-green-900/20 border-green-400"
            : "bg-[#FAF4F0] dark:bg-[#1f2937] border-orange-200 dark:border-orange-500/30"
        }
        shadow-[0_15px_40px_rgba(191,54,12,0.15)]
        hover:shadow-[0_25px_60px_rgba(191,54,12,0.25)]
        hover:-translate-y-1
      `}
    >
      {/* ================= Left Section ================= */}
      {isEditing ? (
        <div className="flex gap-3 flex-wrap flex-1">

          <input
            className="border border-orange-300 dark:border-orange-500/30 px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#111827] text-[#BF360C] dark:text-orange-300"
            value={form.item_name}
            onChange={(e) =>
              setForm({ ...form, item_name: e.target.value })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border border-orange-300 dark:border-orange-500/30 px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#111827] text-[#BF360C] dark:text-orange-300"
          >
            <option value="">Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Groceries">Groceries</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="number"
            className="border border-orange-300 dark:border-orange-500/30 px-3 py-2 rounded-xl w-20 focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#111827] text-[#BF360C] dark:text-orange-300"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <select
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
            className="border border-orange-300 dark:border-orange-500/30 px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#111827] text-[#BF360C] dark:text-orange-300"
          >
            <option value="piece">Piece</option>
            <option value="kg">Kg</option>
            <option value="g">Gram</option>
            <option value="litre">Litre</option>
            <option value="ml">ML</option>
          </select>

          <input
            type="number"
            className="border border-orange-300 dark:border-orange-500/30 px-3 py-2 rounded-xl w-24 focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#111827] text-[#BF360C] dark:text-orange-300"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>
      ) : (
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              isPurchased
                ? "line-through text-green-600 dark:text-green-400"
                : "text-[#BF360C] dark:text-orange-400"
            }`}
          >
            {item.item_name}
          </h3>

          <p className="text-sm mt-1 opacity-80 text-[#8D2B0B] dark:text-gray-400">
            Qty: {item.quantity} {item.unit} | ₹{item.price}
          </p>

          {item.category && (
            <span className="inline-flex items-center mt-3 text-xs bg-orange-100 dark:bg-orange-900/30 text-[#BF360C] dark:text-orange-300 px-3 py-1 rounded-full font-medium">
              {item.category}
            </span>
          )}
        </div>
      )}

      {/* ================= Right Section ================= */}
      <div className="flex gap-4 ml-4 items-center">

        {/* Purchased Toggle */}
        <CheckCircle
          onClick={togglePurchased}
          className={`cursor-pointer transition-all duration-300 ${
            isPurchased
              ? "text-green-600 dark:text-green-400 scale-110"
              : "text-gray-400 hover:text-green-500"
          }`}
        />

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-[#F4511E] to-[#D84315] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 font-semibold"
          >
            Save
          </button>
        ) : (
          <Pencil
            className="cursor-pointer text-[#F4511E] dark:text-orange-400 hover:text-[#D84315] hover:scale-110 transition-all duration-300"
            onClick={() => setIsEditing(true)}
          />
        )}

        <Trash2
          className="cursor-pointer text-[#C62828] dark:text-red-400 hover:text-[#B71C1C] hover:scale-110 transition-all duration-300"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
};

export default GroceryItemCard;