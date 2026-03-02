import {
  ShoppingCart,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const ShoppingHistoryCard = ({ record }) => {
  const navigate = useNavigate();

  const total = Number(record?.total_amount) || 0;
  const discount = Number(record?.discount_amount) || 0;

  const formattedAmount = formatCurrency(total);
  const formattedDiscount = formatCurrency(discount);

  const formattedDate = record?.completed_at
    ? new Date(record.completed_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const savingsPercent =
    total > 0
      ? Math.round((discount / total) * 100)
      : 0;

  const handleView = () => {
    navigate(`/history/${record.id}`);
  };

  return (
    <div
      onClick={handleView}
      className="
        relative
        bg-white dark:bg-[#1f2937]
        rounded-3xl shadow-md
        border border-orange-200 dark:border-gray-700
        p-6
        flex flex-col sm:flex-row
        justify-between
        sm:items-center
        gap-6
        hover:shadow-2xl hover:scale-[1.02]
        transition-all duration-300
        cursor-pointer
        overflow-hidden
      "
    >
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

      {/* LEFT SECTION */}
      <div className="flex items-start sm:items-center gap-4">

        {/* Icon */}
        <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full shadow-sm">
          <ShoppingCart
            size={22}
            className="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Info */}
        <div className="space-y-2">

          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {formattedAmount}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>

          {/* Savings */}
          {discount > 0 && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <TrendingDown size={14} />
              Saved {formattedDiscount} ({savingsPercent}%)
            </div>
          )}

          {/* Mini Discount Progress */}
          {discount > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    savingsPercent,
                    100
                  )}%`,
                }}
              />
            </div>
          )}

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-between sm:justify-end gap-4">

        <span
          className="
            flex items-center gap-2
            text-xs
            bg-green-50 dark:bg-green-900/30
            text-green-600 dark:text-green-400
            px-4 py-1
            rounded-full
            font-medium
          "
        >
          <CheckCircle2 size={14} />
          Completed
        </span>

        <ArrowRight
          size={20}
          className="text-gray-400 group-hover:translate-x-1 transition"
        />

      </div>
    </div>
  );
};

export default ShoppingHistoryCard;