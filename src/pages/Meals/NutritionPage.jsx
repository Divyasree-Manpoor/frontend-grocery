import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { toast } from "sonner";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { getMealPlans } from "../../services/mealService";

const NutritionPage = () => {
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState([]);

  const COLORS = ["#f97316", "#16a34a", "#3b82f6"];

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await getMealPlans();
      setMealData(res.data || []);
    } catch {
      toast.error("Failed to load nutrition data");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     PREPARE DATA (SAFE + SORTED)
  =============================== */
  const {
    dailyData,
    macroData,
    totalCalories,
    weeklyAverage,
  } = useMemo(() => {
    if (!mealData.length) {
      return {
        dailyData: [],
        macroData: [],
        totalCalories: 0,
        weeklyAverage: 0,
      };
    }

    const dailyCalories = {};
    let totalCal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealData.forEach((plan) => {
      const dateObj = new Date(plan.meal_date);
      const formattedDate = dateObj.toLocaleDateString();

      const meal = plan.meals || plan || {};

      const calories = Number(meal.calories || 0);
      const protein = Number(meal.protein || 0);
      const carbs = Number(meal.carbs || 0);
      const fat = Number(meal.fat || 0);

      if (!dailyCalories[formattedDate])
        dailyCalories[formattedDate] = 0;

      dailyCalories[formattedDate] += calories;

      totalCal += calories;
      totalProtein += protein;
      totalCarbs += carbs;
      totalFat += fat;
    });

    const sortedDaily = Object.keys(dailyCalories)
      .map((date) => ({
        date,
        calories: dailyCalories[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const macroArray = [
      { name: "Protein", value: totalProtein },
      { name: "Carbs", value: totalCarbs },
      { name: "Fat", value: totalFat },
    ];

    const avg =
      sortedDaily.length > 0
        ? Math.round(totalCal / sortedDaily.length)
        : 0;

    return {
      dailyData: sortedDaily,
      macroData: macroArray,
      totalCalories: totalCal,
      weeklyAverage: avg,
    };
  }, [mealData]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 space-y-12">

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
          alt="Nutrition"
          className="w-full h-40 sm:h-56 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center px-6 sm:px-12">
          <h2 className="text-xl sm:text-3xl font-bold text-white">
            Nutrition Analytics Dashboard
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Total Calories"
          value={`${totalCalories} kcal`}
          highlight
        />

        <StatCard
          title="Daily Average"
          value={`${weeklyAverage} kcal`}
        />

        <StatCard
          title="Days Tracked"
          value={dailyData.length}
        />

      </div>

      {dailyData.length === 0 ? (
        <EmptyState
          title="No Nutrition Data"
          description="Add meal plans with nutrition info to see analytics."
        />
      ) : (
        <>
          {/* Daily Chart */}
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-6">
              Daily Calorie Intake
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="calories"
                  fill="#f97316"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Macro Chart */}
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-6">
              Macro Distribution
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {macroData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

/* ===============================
   Premium Stat Card Component
================================ */
const StatCard = ({ title, value, highlight }) => (
  <div
    className={`p-6 rounded-3xl border shadow-md transition hover:shadow-xl ${
      highlight
        ? "bg-orange-50 border-orange-300"
        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
    }`}
  >
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {title}
    </p>
    <p
      className={`text-2xl sm:text-3xl font-bold mt-2 ${
        highlight
          ? "text-orange-600"
          : "text-gray-800 dark:text-gray-200"
      }`}
    >
      {value}
    </p>
  </div>
);

export default NutritionPage;