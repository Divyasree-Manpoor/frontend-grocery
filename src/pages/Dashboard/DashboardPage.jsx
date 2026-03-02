import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";
import {
  ClipboardList,
  IndianRupee,
  Wallet,
  TrendingUp,
  Pencil,
  Check,
  Sparkles,
} from "lucide-react";

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

import { getDashboardStats } from "../../services/dashboardService";
import { getShoppingHistory } from "../../services/groceryService";
import { saveMonthlyBudget } from "../../services/budgetService";

const COLORS = ["#f97316", "#16a34a", "#3b82f6", "#ea580c"];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalLists: 0,
    totalSpending: 0,
    monthlyBudget: 0,
  });

  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");

  /* ================= LOAD ================= */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await getDashboardStats();
        const dashboardData = statsRes?.data?.data || {};

        setStats({
          totalLists: dashboardData.totalLists || 0,
          totalSpending: dashboardData.totalSpending || 0,
          monthlyBudget: dashboardData.monthlyBudget || 0,
        });

        const historyRes = await getShoppingHistory();
        setHistory(historyRes?.data || []);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* ================= FORMAT ================= */

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value || 0);

  /* ================= WEEKLY SPENT ================= */

  const weeklySpent = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return history.reduce((sum, record) => {
      const recordDate = new Date(record.completed_at);
      if (recordDate >= sevenDaysAgo) {
        return sum + Number(record.total_amount || 0);
      }
      return sum;
    }, 0);
  }, [history]);

  /* ================= MONTHLY TREND (FIXED SORT) ================= */

  const monthlyData = useMemo(() => {
    const map = {};

    history.forEach((item) => {
      const date = new Date(item.completed_at);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      map[key] =
        (map[key] || 0) +
        Number(item.total_amount || 0);
    });

    return Object.keys(map)
      .sort()
      .map((key) => {
        const [year, month] = key.split("-");
        const date = new Date(year, month);
        return {
          month: date.toLocaleString("default", {
            month: "short",
          }),
          amount: map[key],
        };
      });
  }, [history]);

  /* ================= PIE BREAKDOWN ================= */

  const categoryData = useMemo(() => {
    return [
      { name: "Groceries", value: stats.totalSpending * 0.6 },
      { name: "Vegetables", value: stats.totalSpending * 0.25 },
      { name: "Others", value: stats.totalSpending * 0.15 },
    ];
  }, [stats.totalSpending]);

  /* ================= BUDGET ================= */

  const monthlyPercentage =
    stats.monthlyBudget > 0
      ? Math.min(
          (stats.totalSpending / stats.monthlyBudget) * 100,
          100
        )
      : 0;

  const remaining =
    stats.monthlyBudget > 0
      ? stats.monthlyBudget - stats.totalSpending
      : 0;

  const budgetStatus =
    monthlyPercentage < 70
      ? "Safe"
      : monthlyPercentage < 90
      ? "Warning"
      : "Over Budget";

  const handleSaveBudget = async () => {
    try {
      await saveMonthlyBudget({
        amount: Number(budgetInput),
      });

      setStats((prev) => ({
        ...prev,
        monthlyBudget: Number(budgetInput),
      }));

      setEditingBudget(false);
      toast.success("Budget updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 space-y-12 
      bg-gradient-to-br 
      from-orange-100 via-amber-100 to-orange-200 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          className="w-full h-48 md:h-56 object-cover"
          alt="Dashboard"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center px-6 md:px-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Smart Grocery Dashboard
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard icon={<ClipboardList />} title="Total Lists" value={stats.totalLists} />
        <StatCard icon={<IndianRupee />} title="Total Spending" value={formatCurrency(stats.totalSpending)} />
        <StatCard icon={<Wallet />} title="Remaining Budget" value={formatCurrency(remaining)} highlight={remaining < 0} />
        <StatCard icon={<TrendingUp />} title="Weekly Spending" value={formatCurrency(weeklySpent)} />
      </div>

      {/* Budget Section */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border space-y-6">

        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="font-semibold text-lg dark:text-white">
            Monthly Budget Usage
          </h2>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            budgetStatus === "Safe"
              ? "bg-green-100 text-green-600"
              : budgetStatus === "Warning"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}>
            {budgetStatus}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-700 ${
              monthlyPercentage < 70
                ? "bg-green-500"
                : monthlyPercentage < 90
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${monthlyPercentage}%` }}
          />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-6">

          <div>
            <p className="text-sm text-gray-500">Spent</p>
            <p className="text-xl font-bold dark:text-white">
              {formatCurrency(stats.totalSpending)}
            </p>
          </div>

          {editingBudget ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) =>
                  setBudgetInput(e.target.value)
                }
                className="px-3 py-2 border rounded-lg w-32"
              />
              <button
                onClick={handleSaveBudget}
                className="bg-orange-500 text-white px-3 rounded-lg"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setEditingBudget(true);
                setBudgetInput(stats.monthlyBudget);
              }}
              className="text-orange-600 flex items-center gap-1"
            >
              <Pencil size={16} /> Edit Budget
            </button>
          )}
        </div>
      </div>

      {/* Charts */}
      {history.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl">
            <h3 className="mb-4 font-semibold text-orange-600">
              Monthly Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#f97316" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl">
            <h3 className="mb-4 font-semibold text-orange-600">
              Spending Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

      {stats.totalLists === 0 && (
        <EmptyState
          title="No Grocery Lists Yet"
          description="Create your first grocery list to start tracking."
        />
      )}
    </div>
  );
};

const StatCard = ({ icon, title, value, highlight }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
    <div className="flex items-center gap-2 text-orange-500 text-sm">
      {icon}
      {title}
    </div>
    <p className={`text-2xl font-bold mt-3 dark:text-white ${
      highlight ? "text-red-600" : ""
    }`}>
      {value}
    </p>
  </div>
);

export default DashboardPage;