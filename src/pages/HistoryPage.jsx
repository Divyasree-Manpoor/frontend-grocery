import { useEffect, useState } from "react";
import { getShoppingHistory } from "../services/groceryService";
import ShoppingHistoryCard from "../components/history/ShoppingHistoryCard";
import Loader from "../components/common/Loader";
import { toast } from "sonner";
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

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  const [totalSpending, setTotalSpending] = useState(0);
  const [averageSpending, setAverageSpending] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  const COLORS = [
    "#f97316",
    "#fb923c",
    "#fdba74",
    "#ea580c",
    "#c2410c",
  ];

  /* =========================
     Fetch History
  ========================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
          toast.error("User not found");
          return;
        }

        const res = await getShoppingHistory(user.id);
        const data = res.data || [];

        setHistory(data);
        prepareAnalytics(data);
      } catch (error) {
        console.log("History error:", error);
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* =========================
     Prepare Analytics
  ========================= */
  const prepareAnalytics = (data) => {
    if (!data.length) {
      setChartData([]);
      setSavingsData([]);
      setTotalSpending(0);
      setTotalSaved(0);
      setAverageSpending(0);
      return;
    }

    const monthlySpending = {};
    const monthlySavings = {};

    let total = 0;
    let totalSavings = 0;

    data.forEach((item) => {
      const date = new Date(item.completed_at || item.created_at);

      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      const amount = Number(item.total_amount || 0);
      const saved = Number(item.discount_amount || 0);

      if (!monthlySpending[month]) monthlySpending[month] = 0;
      if (!monthlySavings[month]) monthlySavings[month] = 0;

      monthlySpending[month] += amount;
      monthlySavings[month] += saved;

      total += amount;
      totalSavings += saved;
    });

    const formattedSpending = Object.keys(monthlySpending).map(
      (key) => ({
        month: key,
        total: monthlySpending[key],
      })
    );

    const formattedSavings = Object.keys(monthlySavings).map(
      (key) => ({
        month: key,
        saved: monthlySavings[key],
      })
    );

    setChartData(formattedSpending);
    setSavingsData(formattedSavings);
    setTotalSpending(total);
    setTotalSaved(totalSavings);
    setAverageSpending(
      formattedSpending.length > 0
        ? total / formattedSpending.length
        : 0
    );
  };

  if (loading) return <Loader />;

  return (
    <div
      className="min-h-screen px-6 py-14
                 bg-gradient-to-br
                 from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
                 dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#BF360C] dark:text-orange-500">
            Shopping History
          </h2>
          <p className="text-[#8D2B0B] dark:text-gray-400 mt-3">
            Track your previous grocery spending.
          </p>
        </div>

        {/* =========================
           Analytics Section
        ========================= */}
        {chartData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-orange-200 dark:border-gray-700 mb-10 space-y-10">

            <h3 className="text-2xl font-bold text-[#BF360C] dark:text-orange-500">
              Spending & Savings Dashboard
            </h3>

            {/* Stat Cards */}
            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-orange-100 dark:bg-gray-700 p-6 rounded-2xl">
                <p>Total Lists Completed</p>
                <p className="text-3xl font-bold text-orange-600">
                  {history.length}
                </p>
              </div>

              <div className="bg-orange-100 dark:bg-gray-700 p-6 rounded-2xl">
                <p>Total Spending</p>
                <p className="text-3xl font-bold text-orange-600">
                  ₹{totalSpending.toFixed(2)}
                </p>
              </div>

              <div className="bg-green-100 dark:bg-gray-700 p-6 rounded-2xl">
                <p>Total Savings</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalSaved.toFixed(2)}
                </p>
              </div>

              <div className="bg-orange-100 dark:bg-gray-700 p-6 rounded-2xl">
                <p>Average Monthly Spending</p>
                <p className="text-3xl font-bold text-orange-600">
                  ₹{averageSpending.toFixed(2)}
                </p>
              </div>

            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* Spending Bar */}
              <div>
                <h4 className="font-semibold mb-4">
                  Monthly Spending
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Savings Bar */}
              <div>
                <h4 className="font-semibold mb-4">
                  Monthly Savings
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="saved" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Pie Chart */}
            <div>
              <h4 className="font-semibold mb-4">
                Spending Distribution
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="month"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

        {/* History Cards */}
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-16 rounded-3xl border border-orange-200 dark:border-gray-700 text-center">
            <h3 className="text-xl font-semibold text-[#BF360C] dark:text-orange-500">
              No Shopping History Yet
            </h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {history.map((record) => (
              <ShoppingHistoryCard
                key={record.id}
                record={record}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HistoryPage;