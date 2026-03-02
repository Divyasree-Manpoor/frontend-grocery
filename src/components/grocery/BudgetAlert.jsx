import { useMemo } from "react";

const BudgetAlert = ({ items = [], budgetLimit = 0 }) => {
  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0) *
        Number(item.price || 0),
      0
    );
  }, [items]);

  if (!budgetLimit) return null;

  const isOver = total > budgetLimit;
  const remaining = budgetLimit - total;

  return (
    <div
      className={`
        w-full
        p-5 sm:p-6 md:p-7
        rounded-3xl
        border
        shadow-lg
        transition-all duration-300
        ${
          isOver
            ? "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
            : "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
        }
      `}
    >
      {/* Title */}
      <h4 className="font-semibold text-base sm:text-lg md:text-xl">
        Budget Overview
      </h4>

      {/* Info Section */}
      <div className="mt-4 space-y-2 text-sm sm:text-base text-foreground">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Budget</span>
          <span className="font-medium">₹{budgetLimit}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Total</span>
          <span className="font-medium">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Status Message */}
      {isOver ? (
        <div className="mt-4 text-red-600 dark:text-red-400 font-semibold text-sm sm:text-base">
          ⚠ Over Budget by ₹{Math.abs(remaining).toFixed(2)}
        </div>
      ) : (
        <div className="mt-4 text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
          ✔ Remaining Budget ₹{remaining.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default BudgetAlert;