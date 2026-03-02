import {
  CheckCircle,
  Trash2,
  Pencil,
  Save,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect } from "react";

const ShoppingItemCard = ({
  item,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [qty, setQty] = useState(Number(item.quantity) || 1);
  const [price, setPrice] = useState(Number(item.price) || 0);
  const [discount, setDiscount] = useState(0);
  const [showUndo, setShowUndo] = useState(false);

  /* =============================
     CALCULATIONS
  ============================= */
  const subtotal = qty * price;
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount;

  const isCheap = price < 20;
  const isExpensive = price > 500;

  /* =============================
     HANDLE SAVE
  ============================= */
  const handleSave = () => {
    if (qty < 1 || price < 0) return;

    onUpdate?.(item.id, {
      quantity: qty,
      price: price,
    });

    setIsEditing(false);
  };

  /* =============================
     TOGGLE PURCHASE WITH UNDO
  ============================= */
  const handleToggle = () => {
    onToggle(item);
    setShowUndo(true);

    setTimeout(() => {
      setShowUndo(false);
    }, 4000);
  };

  const handleUndo = () => {
    onToggle(item);
    setShowUndo(false);
  };

  /* =============================
     DELETE CONFIRMATION
  ============================= */
  const handleDelete = () => {
    if (window.confirm("Delete this item?")) {
      onDelete?.(item.id);
    }
  };

  return (
    <div
      className={`
        relative
        p-5 sm:p-6
        rounded-2xl
        border
        shadow-sm hover:shadow-2xl
        transition-all duration-300
        flex flex-col sm:flex-row
        sm:items-center
        justify-between
        gap-4
        overflow-hidden
        ${
          item.purchased
            ? "bg-green-50 border-green-300 dark:bg-green-900/20"
            : "bg-white border-orange-200 dark:bg-gray-900 dark:border-gray-700"
        }
      `}
    >
      {/* Purchased Glow Animation */}
      {item.purchased && (
        <div className="absolute inset-0 bg-green-400/10 animate-pulse pointer-events-none" />
      )}

      {/* LEFT SECTION */}
      <div className="flex-1 space-y-3 relative z-10">

        {/* Name */}
        <h3
          className={`
            text-lg sm:text-xl font-semibold capitalize
            ${
              item.purchased
                ? "line-through text-green-600"
                : "text-gray-800 dark:text-gray-200"
            }
          `}
        >
          {item.item_name}
        </h3>

        {/* Smart Price Badge */}
        {isCheap && (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
            Budget Friendly 💚
          </span>
        )}

        {isExpensive && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
            Premium Item 💎
          </span>
        )}

        {/* EDIT MODE */}
        {isEditing ? (
          <div className="flex flex-wrap gap-3 mt-2">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-xl dark:bg-gray-800"
            />

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-24 px-3 py-2 border rounded-xl dark:bg-gray-800"
            />

            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="%"
              className="w-20 px-3 py-2 border rounded-xl dark:bg-gray-800"
            />

            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-xl transition"
            >
              <Save size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Quantity */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {qty} × ₹{price.toFixed(2)}
            </div>

            {/* Subtotal */}
            <p className="text-sm text-gray-500">
              Subtotal: ₹{subtotal.toFixed(2)}
            </p>

            {/* Discount */}
            {discount > 0 && (
              <p className="text-sm text-green-600">
                Discount: -₹{discountAmount.toFixed(2)}
              </p>
            )}

            {/* Final */}
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              ₹{finalTotal.toFixed(2)}
            </p>
          </>
        )}

        {/* Undo Option */}
        {showUndo && (
          <button
            onClick={handleUndo}
            className="text-sm text-blue-500 flex items-center gap-1 mt-2"
          >
            <RotateCcw size={14} /> Undo
          </button>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 relative z-10">

        {/* Toggle */}
        <button
          onClick={handleToggle}
          className={`transition-all duration-300 hover:scale-110 ${
            item.purchased
              ? "text-green-600"
              : "text-orange-500 hover:text-orange-600"
          }`}
        >
          <CheckCircle size={30} />
        </button>

        {/* Edit */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:scale-110 transition"
          >
            <Pencil size={20} />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 hover:scale-110 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ShoppingItemCard;