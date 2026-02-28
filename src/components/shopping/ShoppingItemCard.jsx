import { CheckCircle } from "lucide-react";

const ShoppingItemCard = ({ item, onToggle }) => {
  const itemTotal =
    Number(item.price || 0) * Number(item.quantity || 1);

  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm transition-all duration-300
        ${
          item.purchased
            ? "bg-green-50 border-green-300"
            : "bg-white border-orange-200"
        }`}
    >
      <div className="flex justify-between items-center">

        <div className="space-y-1">
          <p className="text-lg font-semibold text-gray-800">
            {item.item_name}
          </p>

          <p className="text-sm text-gray-500">
            Qty: {item.quantity} {item.unit || ""}
          </p>

          <p className="text-sm text-gray-600">
            ₹{item.price} × {item.quantity}
          </p>

          <p className="font-semibold text-orange-600">
            ₹{itemTotal}
          </p>
        </div>

        <button
          onClick={() => onToggle(item)}
          className={`transition transform hover:scale-110 ${
            item.purchased
              ? "text-green-600"
              : "text-orange-500"
          }`}
        >
          <CheckCircle size={28} />
        </button>

      </div>
    </div>
  );
};


export default ShoppingItemCard;