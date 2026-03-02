import MealPlanCard from "./MealPlanCard";
import EmptyState from "../common/EmptyState";
import { useMemo } from "react";

const MealList = ({ plans = [], onDelete }) => {
  /* ===============================
     SORT + GROUP BY DATE
  =============================== */
  const groupedPlans = useMemo(() => {
    const grouped = {};

    plans.forEach((plan) => {
      const date = new Date(plan.meal_date)
        .toISOString()
        .split("T")[0];

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(plan);
    });

    return grouped;
  }, [plans]);

  if (!plans.length) {
    return (
      <EmptyState
        title="No Meals Planned"
        description="Add a meal plan to organize your weekly food."
      />
    );
  }

  return (
    <div className="space-y-10">
      {Object.keys(groupedPlans)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((date) => (
          <div key={date} className="space-y-4">

            {/* Date Header */}
            <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </h3>

            {/* Meal Cards */}
            <div className="grid gap-6">
              {groupedPlans[date].map((plan) => (
                <MealPlanCard
                  key={plan.id}
                  plan={plan}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MealList;