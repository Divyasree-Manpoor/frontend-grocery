const BudgetCard = ({ data }) => {
  const spent = data.currentMonthSpent || 0;
  const budget = data.monthlyBudget || 1;

  const percent = Math.min((spent / budget) * 100, 100);

  return (
    <div
      className="
        bg-white
        dark:bg-gray-900

        p-6 sm:p-8

        rounded-3xl

        border
        border-gray-200
        dark:border-gray-700

        shadow-lg
        hover:shadow-2xl

        transition-all duration-300
      "
    >
      <h3
        className="
          text-lg sm:text-xl
          font-semibold

          text-orange-600
          dark:text-orange-400

          mb-6
        "
      >
        Monthly Budget Progress
      </h3>

      {/* Progress Bar */}
      <div
        className="
          w-full
          h-4

          bg-gray-200
          dark:bg-gray-800

          rounded-full
          overflow-hidden
        "
      >
        <div
          style={{ width: `${percent}%` }}
          className="
            h-full

            bg-orange-500
            dark:bg-orange-600

            rounded-full

            transition-all duration-700 ease-in-out
          "
        />
      </div>

      {/* Amounts */}
      <div
        className="
          flex justify-between

          mt-4

          text-sm sm:text-base
          font-medium

          text-gray-700
          dark:text-gray-300
        "
      >
        <span>₹{spent}</span>
        <span>₹{budget}</span>
      </div>

      {/* Percentage */}
      <div
        className="
          mt-3

          text-right

          text-xs sm:text-sm

          text-gray-500
          dark:text-gray-400
        "
      >
        {percent.toFixed(0)}% Used
      </div>
    </div>
  );
};

export default BudgetCard;