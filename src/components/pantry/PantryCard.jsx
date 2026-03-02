import { Trash2, Pencil, Check } from "lucide-react";
import { useState, useMemo } from "react";

const PantryCard = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQty, setNewQty] = useState(Number(item.quantity) || 0);

  const itemName = (item.item_name || "").toLowerCase();

  const imageMap = {
    milk: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
    tomato: "https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=800&auto=format&fit=crop",
    onion: "https://images.unsplash.com/photo-1615485925763-86786288908f?q=80&w=800&auto=format&fit=crop",
    rice: "https://images.unsplash.com/photo-1604908177522-040a8c9a8b04?q=80&w=800&auto=format&fit=crop",
    apple: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
    pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop";

  const imageUrl = imageMap[itemName] || defaultImage;

  /* ================= EXPIRY ================= */
  const { status, daysLeft, expiryPercent } = useMemo(() => {
    if (!item.expiry_date) {
      return { status: "fresh", daysLeft: null, expiryPercent: 100 };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(item.expiry_date);
    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    let currentStatus = "fresh";
    if (diffDays < 0) currentStatus = "expired";
    else if (diffDays <= 3) currentStatus = "warning";

    const totalLife = 10;

    const percent =
      diffDays <= 0
        ? 0
        : Math.min((diffDays / totalLife) * 100, 100);

    return {
      status: currentStatus,
      daysLeft: diffDays,
      expiryPercent: percent,
    };
  }, [item.expiry_date]);

  /* ================= STOCK ================= */
  const quantity = Number(item.quantity) || 0;
  const isLowStock = quantity <= 2;
  const stockPercent = Math.min((quantity / 10) * 100, 100);

  const handleSave = () => {
    if (newQty < 0) return;
    onUpdate(item.id, newQty);
    setIsEditing(false);
  };

  const statusBorder =
    status === "expired"
      ? "border-red-400"
      : status === "warning"
      ? "border-yellow-400"
      : "border-orange-200";

  return (
    <div
      className={`rounded-3xl overflow-hidden border ${statusBorder}
        bg-white dark:bg-[#1f2937]
        shadow-md hover:shadow-2xl
        transition-all duration-300
        flex flex-col w-full`}
    >
      <div className="w-full h-40 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={item.item_name || "item"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white break-words">
            {item.item_name}
          </h3>

          {item.category && (
            <p className="text-xs text-orange-500 mt-1">
              {item.category}
            </p>
          )}

          {isEditing ? (
            <div className="flex gap-3 mt-4">
              <input
                type="number"
                min="0"
                value={newQty}
                onChange={(e) => setNewQty(Number(e.target.value))}
                className="border rounded-xl px-4 py-2 w-24 bg-white dark:bg-gray-700"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-xl transition"
              >
                <Check size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              Quantity:
              <span className="font-medium ml-1">
                {quantity} {item.unit || ""}
              </span>
            </p>
          )}

          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  isLowStock ? "bg-orange-500" : "bg-green-500"
                }`}
                style={{ width: `${stockPercent}%` }}
              />
            </div>
          </div>

          {item.expiry_date && (
            <>
              <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">
                Expiry:{" "}
                {new Date(item.expiry_date).toLocaleDateString()}
              </p>

              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      status === "expired"
                        ? "bg-red-500"
                        : status === "warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${expiryPercent}%` }}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {status === "expired" && (
              <Badge color="red">Expired ❌</Badge>
            )}
            {status === "warning" && (
              <Badge color="yellow">
                {daysLeft === 0
                  ? "Expires Today ⚠️"
                  : `${daysLeft} days left ⚠️`}
              </Badge>
            )}
            {isLowStock && (
              <Badge color="orange">Low Stock ⚠️</Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:scale-110 transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-500 hover:scale-110 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children, color }) => {
  const colors = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <span className={`text-xs text-white px-3 py-1 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export default PantryCard;