import { Trash2, Pencil, Check } from "lucide-react";
import { useState } from "react";

const PantryCard = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQty, setNewQty] = useState(item.quantity);

  /* =============================
     IMAGE MAPPING
  ============================= */
  const imageMap = {
    milk:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
    tomato:
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=800&auto=format&fit=crop",
    onion:
      "https://images.unsplash.com/photo-1615485925763-86786288908f?q=80&w=800&auto=format&fit=crop",
    rice:
      "https://images.unsplash.com/photo-1604908177522-040a8c9a8b04?q=80&w=800&auto=format&fit=crop",
    apple:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
    pasta:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
    egg:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=800&auto=format&fit=crop",
    cheese:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop",
    spinach:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop",
    coriander:
      "https://images.unsplash.com/photo-1625944230935-9f5c99d9db0d?q=80&w=800&auto=format&fit=crop",
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop";

  const imageUrl =
    imageMap[item.item_name?.toLowerCase()] || defaultImage;

  /* =============================
     EXPIRY LOGIC
  ============================= */
  const today = new Date();
  const expiry = item.expiry_date
    ? new Date(item.expiry_date)
    : null;

  let status = "fresh";
  let daysLeft = null;

  if (expiry) {
    const diffTime = expiry - today;
    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    daysLeft = diffDays;

    if (diffDays < 0) status = "expired";
    else if (diffDays <= 3) status = "warning";
  }

  /* =============================
     LOW STOCK
  ============================= */
  const isLowStock = Number(item.quantity) <= 2;

  const handleSave = () => {
    onUpdate(item.id, Number(newQty));
    setIsEditing(false);
  };

  return (
    <div
      className={`
        rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300 overflow-hidden flex flex-col group
        ${
          status === "expired"
            ? "bg-red-50 border border-red-400"
            : status === "warning"
            ? "bg-yellow-50 border border-yellow-400"
            : "bg-white dark:bg-[#1f2937] border border-orange-200"
        }
      `}
    >
      {/* Image */}
      <div className="w-full max-h-40 aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={item.item_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
            {item.item_name}
          </h3>

          {isEditing ? (
            <div className="flex gap-2 mt-3">
              <input
                type="number"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="border rounded px-3 py-1 w-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-3 rounded transition"
              >
                <Check size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              Quantity:
              <span className="font-medium ml-1">
                {Number(item.quantity)} {item.unit}
              </span>
            </p>
          )}

          {item.expiry_date && (
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              Expiry:{" "}
              {new Date(item.expiry_date).toLocaleDateString()}
            </p>
          )}

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mt-3">

            {status === "expired" && (
              <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                Expired ❌
              </span>
            )}

            {status === "warning" && (
              <span className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full">
                {daysLeft === 0
                  ? "Expires Today ⚠️"
                  : `${daysLeft} days left ⚠️`}
              </span>
            )}

            {status === "fresh" && item.expiry_date && (
              <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
                Fresh ✅
              </span>
            )}

            {isLowStock && (
              <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
                Low Stock ⚠️
              </span>
            )}

          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:scale-110 transition-transform duration-200"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-500 hover:scale-110 transition-transform duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PantryCard;