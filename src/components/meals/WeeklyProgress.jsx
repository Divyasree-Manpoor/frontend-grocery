import { useMemo } from "react";

const WeeklyProgress = ({ plans = [] }) => {
  const total = plans.length;
  const goal = 21; // 3 meals × 7 days
  const percent = Math.min((total / goal) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">
        Weekly Progress
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {total} of {goal} meals planned
      </p>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
        <div
          className="bg-orange-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm font-semibold text-orange-600">
        {percent.toFixed(0)}% Completed
      </p>
    </div>
  );
};

export default WeeklyProgress;