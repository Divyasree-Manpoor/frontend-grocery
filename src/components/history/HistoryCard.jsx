import {
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const HistoryCard = ({ record }) => {
  const navigate = useNavigate();

  const total = Number(record?.total_amount) || 0;
  const discount = Number(record?.discount_amount) || 0;

  const formattedTotal = formatCurrency(total);
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

  const isHighSpending = total > 3000; // Smart highlight threshold

  return (
    <div
      onClick={() => navigate(`/history/${record.id}`)}
      className="
        relative
        bg-white dark:bg-gray-900
        border border-orange-200 dark:border-gray-700
        rounded-3xl
        p-6
        flex flex-col sm:flex-row
        justify-between
        sm:items-center
        gap-6
        shadow-md hover:shadow-2xl
        hover:scale-[1.02]
        transition-all duration-300
        cursor-pointer
        overflow-hidden
      "
    >
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

      {/* LEFT SECTION */}
      <div className="flex items-start sm:items-center gap-4">

        {/* Icon */}
        <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full shadow-sm">
          <ShoppingBag className="text-orange-600 dark:text-orange-400" />
        </div>

        {/* Info */}
        <div className="space-y-2">

          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {formattedTotal}
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

          {/* Mini Savings Bar */}
          {discount > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(savingsPercent, 100)}%` }}
              />
            </div>
          )}

          {/* High Spending Badge */}
          {isHighSpending && (
            <span className="inline-block text-xs bg-red-50 dark:bg-red-900/30 text-red-600 px-3 py-1 rounded-full font-medium">
              High Spending
            </span>
          )}

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-between sm:justify-end gap-4">

        <span className="
          flex items-center gap-2
          text-xs
          bg-green-50 dark:bg-green-900/30
          text-green-600 dark:text-green-400
          px-4 py-1
          rounded-full
          font-medium
        ">
          <CheckCircle2 size={14} />
          Completed
        </span>

        <ArrowRight
          size={20}
          className="text-gray-400 transition-transform group-hover:translate-x-1"
        />

      </div>
    </div>
  );
};

export default HistoryCard;