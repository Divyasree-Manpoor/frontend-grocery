import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { toast } from "sonner";
import {
  ClipboardList,
  IndianRupee,
  Wallet,
} from "lucide-react";
import { getDashboardStats } from "../services/dashboardService";
import { getShoppingHistory } from "../services/groceryService";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [weeklyBudget, setWeeklyBudget] = useState("");

  const [editingMonthly, setEditingMonthly] = useState(false);
  const [editingWeekly, setEditingWeekly] = useState(false);

  const [totalSpent, setTotalSpent] = useState(0);
  const [weeklySpent, setWeeklySpent] = useState(0);
  const [totalLists, setTotalLists] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await getDashboardStats();
        const stats = statsRes?.data?.data;

        // ✅ FIXED (no fake fallback)
        setTotalLists(stats?.totalLists ?? 0);
        setMonthlyBudget(stats?.monthlyBudget ??null);
        setTotalSpent(stats?.totalSpending ?? 0);

        // Weekly budget from localStorage
        const savedWeekly = localStorage.getItem("weeklyBudget");
        if (savedWeekly) setWeeklyBudget(Number(savedWeekly));

        const historyRes = await getShoppingHistory();
        const history = historyRes?.data || [];

        const now = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);

        const weeklyTotal = history.reduce((sum, record) => {
          const recordDate = new Date(record.completed_at);
          if (recordDate >= sevenDaysAgo) {
            return sum + Number(record.total_amount || 0);
          }
          return sum;
        }, 0);

        setWeeklySpent(weeklyTotal);

      } catch (err) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <Loader />;

  const monthlyPercentage =
    monthlyBudget > 0
      ? Math.min((totalSpent / monthlyBudget) * 100, 100)
      : 0;

  const weeklyPercentage =
    weeklyBudget > 0
      ? Math.min((weeklySpent / weeklyBudget) * 100, 100)
      : 0;

  const remaining =
    monthlyBudget > 0
      ? monthlyBudget - totalSpent
      : 0;

  /* =========================
     SAVE MONTHLY TO BACKEND
  ========================= */
  const handleSaveMonthly = async () => {
    try {
      await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: monthlyBudget,
        }),
      });

      setEditingMonthly(false);
      toast.success("Monthly Budget Updated");
    } catch {
      toast.error("Failed to update monthly budget");
    }
  };

  /* =========================
     SAVE WEEKLY TO LOCAL
  ========================= */
  const handleSaveWeekly = () => {
    localStorage.setItem("weeklyBudget", weeklyBudget);
    setEditingWeekly(false);
    toast.success("Weekly Budget Updated");
  };

  return (
    <div className="min-h-screen
                    bg-gradient-to-br
                    from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
                    dark:from-gray-900 dark:via-gray-800 dark:to-black
                    px-6 py-12 transition-colors duration-500">

      <div className="max-w-7xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold text-[#BF360C] dark:text-orange-400">
          Smart Planning Dashboard
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            icon={<ClipboardList size={18} />}
            label="Total Lists"
            value={totalLists}
          />
          <StatCard
            icon={<IndianRupee size={18} />}
            label="Total Spending"
            value={`₹${Number(totalSpent).toFixed(2)}`}
          />
          <StatCard
            icon={<Wallet size={18} />}
            label="Remaining Budget"
            value={`₹${Number(remaining).toFixed(2)}`}
            highlight={remaining < 0}
          />
        </div>

        {/* MONTHLY BUDGET */}
        <BudgetBox
          title="Monthly Budget Usage"
          percentage={monthlyPercentage}
          spent={totalSpent}
          budget={monthlyBudget}
          editing={editingMonthly}
          setEditing={setEditingMonthly}
          setBudget={setMonthlyBudget}
          onSave={handleSaveMonthly}
        />

        {/* WEEKLY BUDGET */}
        <BudgetBox
          title="Weekly Budget Usage"
          percentage={weeklyPercentage}
          spent={weeklySpent}
          budget={weeklyBudget}
          editing={editingWeekly}
          setEditing={setEditingWeekly}
          setBudget={setWeeklyBudget}
          onSave={handleSaveWeekly}
        />

      </div>
    </div>
  );
};

/* =========================
   BUDGET COMPONENT
========================= */
const BudgetBox = ({
  title,
  percentage,
  spent,
  budget,
  editing,
  setEditing,
  setBudget,
  onSave,
}) => (
  <div className="bg-white dark:bg-gray-900
                  p-8 rounded-3xl shadow-xl
                  border border-orange-200 dark:border-gray-700
                  space-y-6 transition-colors duration-500">

    <div className="flex justify-between">
      <p className="font-semibold dark:text-white">
        {title}
      </p>
      <p className="text-sm dark:text-gray-300">
        {percentage.toFixed(0)}% Used
      </p>
    </div>

    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
      <div
        className={`h-4 rounded-full transition-all duration-700 ${
          percentage < 70
            ? "bg-green-500"
            : percentage < 90
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>

    <div className="flex justify-between mt-4">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Current Spent
        </p>
        <p className="text-xl font-bold dark:text-white">
          ₹{Number(spent).toFixed(2)}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Budget
        </p>

        {editing ? (
          <div className="flex gap-2">
            <input
  type="number"
  value={budget ?? ""}
  onChange={(e) =>
    setBudget(e.target.value === "" ? null : Number(e.target.value))
  }
  placeholder="Enter amount"
  className="px-2 py-1 border rounded w-24
             dark:bg-gray-800 dark:text-white dark:border-gray-600"
/>
            <button
              onClick={onSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-green-600">
              {budget !== null? `₹${budget}` : "Not Set"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="text-orange-600 text-xs font-semibold"
            >
              {budget > 0 ? "Edit" : "Set"}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* =========================
   STAT CARD
========================= */
const StatCard = ({ icon, label, value, highlight }) => (
  <div className="bg-white dark:bg-gray-900
                  p-6 rounded-2xl shadow-md
                  border border-orange-200 dark:border-gray-700
                  transition-colors duration-500">
    <div className="flex items-center gap-2
                    text-orange-600 dark:text-orange-400 text-sm">
      {icon}
      {label}
    </div>
    <p className={`text-xl font-bold mt-3
                   dark:text-white
                   ${highlight ? "text-red-600" : ""}`}>
      {value}
    </p>
  </div>
);

export default Dashboard;