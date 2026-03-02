import { useMemo } from "react";

const WeeklyCalendar = ({ plans = [] }) => {
  const grouped = useMemo(() => {
    const result = {};
    plans.forEach((plan) => {
      const date = new Date(plan.meal_date).toDateString();
      if (!result[date]) result[date] = [];
      result[date].push(plan);
    });
    return result;
  }, [plans]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-6 text-orange-600 dark:text-orange-400">
        Weekly Calendar
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {Object.keys(grouped).map((date) => (
          <div
            key={date}
            className="bg-orange-50 dark:bg-gray-800 p-4 rounded-2xl text-center"
          >
            <p className="text-sm font-semibold">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(date).getDate()}
            </p>

            <div className="mt-2 text-xs">
              {grouped[date].map((meal) => (
                <p key={meal.id} className="truncate">
                  {meal.meal_name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;