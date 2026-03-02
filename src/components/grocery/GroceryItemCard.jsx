import { useState } from "react";
import { Trash2, Pencil, CheckCircle } from "lucide-react";
import { updateItem } from "../../services/groceryService";
import { toast } from "sonner";

const GroceryItemCard = ({ item, onDelete, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    item_name: item.item_name,
    quantity: item.quantity || 1,
    unit: item.unit || "piece",
    price: item.price || 0,
  });

  const togglePurchased = async () => {
    try {
      await updateItem(item.id, {
        purchased: !item.purchased,
      });
      refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleUpdate = async () => {
    if (!form.item_name.trim()) {
      toast.warning("Item name required");
      return;
    }

    try {
      await updateItem(item.id, {
        item_name: form.item_name.trim().toLowerCase(),
        quantity: Number(form.quantity) || 1,
        unit: form.unit || "piece",
        price: Number(form.price) || 0,
      });

      toast.success("Item updated");
      setIsEditing(false);
      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div
      className={`
        w-full
        rounded-2xl
        p-4 sm:p-6
        border
        transition-all duration-300
        shadow-md hover:shadow-lg
        ${
          item.purchased
            ? "bg-green-50 dark:bg-green-900/20 border-green-400"
            : "bg-white dark:bg-gray-900 border-orange-200 dark:border-gray-700"
        }
      `}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        {/* LEFT SECTION */}
        {isEditing ? (
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full">

            <input
              className="flex-1 w-full min-w-[120px] border px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
              value={form.item_name}
              onChange={(e) =>
                setForm({ ...form, item_name: e.target.value })
              }
            />

            <input
              type="number"
              min="1"
              className="w-full sm:w-24 border px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
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
              className="w-full sm:w-28 border px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
            >
              <option value="piece">Piece</option>
              <option value="kg">Kg</option>
              <option value="g">Gram</option>
              <option value="litre">Litre</option>
              <option value="ml">ML</option>
            </select>

            <input
              type="number"
              min="0"
              className="w-full sm:w-28 border px-3 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              placeholder="Price"
            />

            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex-1 w-full">
            <h3
              className={`font-semibold text-base sm:text-lg break-words ${
                item.purchased
                  ? "line-through text-green-600"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {item.item_name}
            </h3>

            <p className="text-sm text-gray-500 mt-1 break-words">
              {item.quantity} {item.unit} | ₹{item.price}
            </p>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex flex-wrap justify-start lg:justify-end gap-4 items-center w-full lg:w-auto">
          <CheckCircle
            onClick={togglePurchased}
            className={`cursor-pointer transition ${
              item.purchased
                ? "text-green-600 scale-110"
                : "text-gray-400 hover:text-green-500"
            }`}
          />

          {!isEditing && (
            <Pencil
              className="cursor-pointer text-orange-500 hover:scale-110 transition"
              onClick={() => setIsEditing(true)}
            />
          )}

          <Trash2
            className="cursor-pointer text-red-500 hover:scale-110 transition"
            onClick={() => onDelete(item.id)}
          />
        </div>

      </div>
    </div>
  );
};

export default GroceryItemCard;