import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const GrocerySummary = ({ items = [], listId }) => {
  const navigate = useNavigate();

  const {
    totalItems,
    purchased,
    remaining,
    estimatedTotal,
    percent,
  } = useMemo(() => {
    const totalItems = items.length;

    const purchased = items.filter(i => i.purchased).length;
    const remaining = totalItems - purchased;

    const estimatedTotal = items.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0) *
        Number(item.price || 0),
      0
    );

    const percent =
      totalItems > 0
        ? Math.round((purchased / totalItems) * 100)
        : 0;

    return {
      totalItems,
      purchased,
      remaining,
      estimatedTotal,
      percent,
    };
  }, [items]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-orange-200 dark:border-gray-700 space-y-6">

      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
        Shopping Overview
      </h2>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Total Items" value={totalItems} />
        <StatCard label="Purchased" value={purchased} highlight />
        <StatCard label="Remaining" value={remaining} />
        <StatCard
          label="Estimated Total"
          value={`₹${estimatedTotal.toFixed(2)}`}
        />
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span className="font-semibold">{percent}%</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Smart Status */}
      <div className="text-sm font-medium">
        {percent === 100
          ? "🎉 All items purchased!"
          : percent > 50
          ? "🔥 You're halfway there!"
          : "🛒 Let's start shopping!"}
      </div>

      {/* Action */}
      {listId && (
        <button
          onClick={() => navigate(`/shopping/${listId}`)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition"
        >
          Start Shopping
        </button>
      )}
    </div>
  );
};

const StatCard = ({ label, value, highlight }) => (
  <div className="bg-orange-50 dark:bg-gray-800 p-5 rounded-2xl border border-orange-200 dark:border-gray-700">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-xl font-bold mt-2 ${highlight ? "text-green-600" : "text-orange-600"}`}>
      {value}
    </p>
  </div>
);

export default GrocerySummary;