const BudgetCard = ({ data }) => {
  const spent = data.currentMonthSpent || 0;
  const budget = data.monthlyBudget || 1;

  const percent = Math.min((spent / budget) * 100, 100);

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        p-6 sm:p-8
        rounded-3xl
        shadow-xl hover:shadow-2xl
        border border-orange-200 dark:border-gray-700
        transition-all duration-300
      "
    >
      <h3 className="
        text-lg sm:text-xl
        font-semibold
        text-orange-600 dark:text-orange-400
        mb-6
      ">
        Monthly Budget Progress
      </h3>

      {/* Progress Bar Background */}
      <div className="
        w-full
        bg-gray-200 dark:bg-gray-800
        rounded-full h-4
        overflow-hidden
      ">
        <div
          style={{ width: `${percent}%` }}
          className="
            h-full
            bg-orange-500 dark:bg-orange-600
            transition-all duration-700 ease-in-out
            shadow-inner
          "
        />
      </div>

      {/* Numbers */}
      <div className="
        flex justify-between
        mt-4
        text-sm sm:text-base
        text-gray-600 dark:text-gray-300
        font-medium
      ">
        <span>₹{spent}</span>
        <span>₹{budget}</span>
      </div>
    </div>
  );
};

export default BudgetCard;