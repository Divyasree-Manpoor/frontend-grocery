import { useEffect, useState } from "react";
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
import API from "../services/api";

const NutritionPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dailyData, setDailyData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [macroData, setMacroData] = useState([]);

  const COLORS = ["#f97316", "#16a34a", "#3b82f6", "#e11d48"];

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        toast.error("User not found");
        return;
      }

      const res = await API.get(`/meals?user_id=${user.id}`);
      const data = res.data?.data || [];

      setMeals(data);
      prepareNutrition(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load meals");
    } finally {
      setLoading(false);
    }
  };

  const prepareNutrition = (data) => {
    if (!data || data.length === 0) {
      setDailyData([]);
      setMacroData([]);
      setTotalCalories(0);
      return;
    }

    const daily = {};
    let totalCal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    data.forEach((meal) => {
      // 🔥 FIX 1: Use created_at instead of meal.date
      const date = new Date(meal.created_at).toLocaleDateString();

      if (!daily[date]) daily[date] = 0;

      const calories = Number(meal.calories) || 0;
      const protein = Number(meal.protein) || 0;
      const carbs = Number(meal.carbs) || 0;
      const fat = Number(meal.fat) || 0;

      daily[date] += calories;

      totalCal += calories;
      totalProtein += protein;
      totalCarbs += carbs;
      totalFat += fat;
    });

    const formattedDaily = Object.keys(daily).map((key) => ({
      date: key,
      calories: daily[key],
    }));

    setDailyData(formattedDaily);
    setTotalCalories(totalCal);

    setMacroData([
      { name: "Protein", value: totalProtein },
      { name: "Carbs", value: totalCarbs },
      { name: "Fat", value: totalFat },
    ]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-6 py-14 bg-gradient-to-br from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]">
      <div className="max-w-6xl mx-auto space-y-12">

        <div>
          <h2 className="text-4xl font-bold text-[#BF360C]">
            Nutrition Dashboard
          </h2>
          <p className="text-[#8D2B0B] mt-2">
            Track your calorie and macro intake.
          </p>
        </div>

        {/* Total Calories */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <p className="text-lg">Total Calories Consumed</p>
          <p className="text-4xl font-bold text-orange-600">
            {totalCalories} kcal
          </p>
        </div>

        {/* Daily Calories Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6">
            Daily Calorie Intake
          </h3>

          {dailyData.length === 0 ? (
            <p className="text-gray-500">No calorie data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Macro Distribution */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6">
            Macro Distribution
          </h3>

          {macroData.length === 0 ? (
            <p className="text-gray-500">No macro data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
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
          )}
        </div>

      </div>
    </div>
  );
};

export default NutritionPage;