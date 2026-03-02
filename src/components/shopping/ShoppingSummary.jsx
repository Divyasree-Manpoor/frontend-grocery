import { useMemo } from "react";
import { CheckCircle } from "lucide-react";

const ShoppingSummary = ({
  total = 0,
  savings = 0,
  budgetLimit = 0,
  onComplete,
  loading = false,
}) => {
  const safeTotal = Number(total) || 0;
  const safeSavings = Number(savings) || 0;
  const safeBudget = Number(budgetLimit) || 0;

  /* ===============================
     FORMATTERS
  =============================== */
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  const formattedTotal = formatCurrency(safeTotal);
  const formattedSavings = formatCurrency(safeSavings);

  const remainingBudget =
    safeBudget > 0 ? safeBudget - safeTotal : 0;

  const budgetPercent =
    safeBudget > 0
      ? Math.min((safeTotal / safeBudget) * 100, 100)
      : 0;

  const isDisabled = safeTotal <= 0 || loading;
  const isOverBudget =
    safeBudget > 0 && safeTotal > safeBudget;

  /* ===============================
     SMART INSIGHT
  =============================== */
  const insight = useMemo(() => {
    if (safeTotal === 0)
      return "Add items to begin your shopping journey.";
    if (isOverBudget)
      return "⚠ You're exceeding your budget. Consider adjusting items.";
    if (safeSavings > 0)
      return "🎉 Great job saving money today!";
    return "✔ You're managing your budget well.";
  }, [safeTotal, isOverBudget, safeSavings]);

  return (
    <div
      className={`
        bg-white dark:bg-gray-900
        border
        ${
          isOverBudget
            ? "border-red-400 shadow-red-200"
            : "border-orange-200 dark:border-gray-700"
        }
        p-6 sm:p-8
        rounded-3xl
        shadow-xl
        mt-10
        transition-all duration-300
        space-y-6
      `}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#BF360C] dark:text-orange-400">
          Shopping Summary
        </h3>

        <p
          className={`text-2xl sm:text-3xl font-extrabold ${
            isOverBudget
              ? "text-red-600"
              : "text-orange-600"
          }`}
        >
          {formattedTotal}
        </p>
      </div>

      {/* SAVINGS */}
      {safeSavings > 0 && (
        <div className="text-green-600 font-semibold text-sm sm:text-base animate-pulse">
          🎉 You saved {formattedSavings}
        </div>
      )}

      {/* BUDGET PROGRESS */}
      {safeBudget > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Budget Usage</span>
            <span>
              {Math.round(budgetPercent)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                isOverBudget
                  ? "bg-red-500"
                  : "bg-orange-500"
              }`}
              style={{ width: `${budgetPercent}%` }}
            />
          </div>

          <div className="text-sm">
            {isOverBudget ? (
              <span className="text-red-600 font-semibold">
                ⚠ Over Budget by{" "}
                {formatCurrency(
                  safeTotal - safeBudget
                )}
              </span>
            ) : (
              <span className="text-green-600">
                Remaining:{" "}
                {formatCurrency(remainingBudget)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* SMART INSIGHT */}
      <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-xl text-sm">
        {insight}
      </div>

      {/* COMPLETE BUTTON */}
      <button
        onClick={onComplete}
        disabled={isDisabled}
        className={`
          w-full py-4 rounded-2xl font-semibold
          transition-all duration-300
          shadow-md active:scale-95
          ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : isOverBudget
              ? "bg-red-500 hover:bg-red-600 text-white hover:scale-[1.02]"
              : "bg-gradient-to-r from-orange-600 to-orange-700 hover:shadow-xl text-white hover:scale-[1.02]"
          }
        `}
      >
        {loading ? (
          "Processing..."
        ) : (
          <span className="flex justify-center items-center gap-2">
            <CheckCircle size={18} />
            Complete Shopping 🛒
          </span>
        )}
      </button>
    </div>
  );
};

export default ShoppingSummary;