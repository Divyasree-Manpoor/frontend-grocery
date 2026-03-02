import { useEffect, useMemo, useState } from "react";
import { getShoppingHistory } from "../../services/historyService";
import ShoppingHistoryCard from "../../components/history/ShoppingHistoryCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
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
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#ea580c", "#c2410c"];

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW FILTER STATES
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getShoppingHistory();
        const data = res.data || [];

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.completed_at) -
            new Date(a.completed_at)
        );

        setHistory(sorted);
      } catch {
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ================= FILTERED DATA ================= */

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const date = new Date(item.completed_at);
      const year = date.getFullYear();
      const month = date.getMonth();

      const yearMatch =
        selectedYear === "All" ||
        year === Number(selectedYear);

      const monthMatch =
        selectedMonth === "All" ||
        month === Number(selectedMonth);

      return yearMatch && monthMatch;
    });
  }, [history, selectedYear, selectedMonth]);

  /* ================= ANALYTICS ================= */

  const analytics = useMemo(() => {
    if (!filteredHistory.length) {
      return {
        monthlyData: [],
        weeklyData: [],
        savingsData: [],
        totalPaid: 0,
        totalSaved: 0,
        averageSpend: 0,
        insight: "",
        topMonth: "",
        bestSavingMonth: "",
      };
    }

    const monthly = {};
    const weekly = {};
    const monthlySavings = {};

    let paid = 0;
    let saved = 0;

    filteredHistory.forEach((item) => {
      const date = new Date(item.completed_at);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const weekNumber = Math.ceil(date.getDate() / 7);
      const weekKey = `W${weekNumber} ${date.toLocaleString(
        "default",
        { month: "short" }
      )}`;

      const total = Number(item.total_amount) || 0;
      const discount = Number(item.discount_amount) || 0;

      monthly[monthKey] = (monthly[monthKey] || 0) + total;
      weekly[weekKey] = (weekly[weekKey] || 0) + total;
      monthlySavings[monthKey] =
        (monthlySavings[monthKey] || 0) + discount;

      paid += total;
      saved += discount;
    });

    const formattedMonthly = Object.keys(monthly)
      .sort()
      .map((key) => {
        const [y, m] = key.split("-");
        const date = new Date(y, m - 1);
        return {
          month: date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          total: monthly[key],
        };
      });

    const formattedWeekly = Object.keys(weekly).map(
      (key) => ({
        week: key,
        total: weekly[key],
      })
    );

    const formattedSavings = Object.keys(monthlySavings)
      .sort()
      .map((key) => {
        const [y, m] = key.split("-");
        const date = new Date(y, m - 1);
        return {
          month: date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          saved: monthlySavings[key],
        };
      });

    // NEW: Top Spending Month
    const topMonth =
      formattedMonthly.sort((a, b) => b.total - a.total)[0]
        ?.month || "";

    // NEW: Best Saving Month
    const bestSavingMonth =
      formattedSavings.sort((a, b) => b.saved - a.saved)[0]
        ?.month || "";

    let insight = "";
    if (formattedMonthly.length >= 2) {
      const current = formattedMonthly.at(-1).total;
      const previous =
        formattedMonthly.at(-2).total || 1;

      const diff = current - previous;
      const percent = ((diff / previous) * 100).toFixed(1);

      insight =
        diff > 0
          ? `⚠ Spending increased by ${percent}% compared to last period.`
          : `🎉 Spending decreased by ${Math.abs(
              percent
            )}% compared to last period.`;
    }

    return {
      monthlyData: formattedMonthly,
      weeklyData: formattedWeekly,
      savingsData: formattedSavings,
      totalPaid: paid,
      totalSaved: saved,
      averageSpend: paid / filteredHistory.length,
      insight,
      topMonth,
      bestSavingMonth,
    };
  }, [filteredHistory]);

  const availableYears = [
    ...new Set(
      history.map((item) =>
        new Date(item.completed_at).getFullYear()
      )
    ),
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 space-y-12">

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value)
          }
          className="px-4 py-2 rounded-xl border"
        >
          <option value="All">All Years</option>
          {availableYears.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
          className="px-4 py-2 rounded-xl border"
        >
          <option value="All">All Months</option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString(
                "default",
                { month: "long" }
              )}
            </option>
          ))}
        </select>
      </div>

      {filteredHistory.length === 0 ? (
        <EmptyState
          title="No History Found"
          description="Try changing filters."
        />
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Paid"
              value={`₹${analytics.totalPaid.toFixed(2)}`}
            />
            <StatCard
              title="Total Saved"
              value={`₹${analytics.totalSaved.toFixed(2)}`}
              highlight
            />
            <StatCard
              title="Average Spend"
              value={`₹${analytics.averageSpend.toFixed(2)}`}
            />
            <StatCard
              title="Sessions"
              value={filteredHistory.length}
            />
          </div>

          {/* Top Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            <HighlightBox
              title="Highest Spending Month"
              value={analytics.topMonth}
            />
            <HighlightBox
              title="Best Saving Month"
              value={analytics.bestSavingMonth}
            />
          </div>

          {/* CHARTS (unchanged logic) */}
          <ChartBox title="Monthly Spending">
            <BarChart data={analytics.monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#f97316" />
            </BarChart>
          </ChartBox>

          <ChartBox title="Weekly Trend">
            <LineChart data={analytics.weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#ea580c"
                strokeWidth={3}
              />
            </LineChart>
          </ChartBox>

          <ChartBox title="Savings Distribution">
            <PieChart>
              <Pie
                data={analytics.savingsData}
                dataKey="saved"
                nameKey="month"
                outerRadius={100}
                label
              >
                {analytics.savingsData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      COLORS[i % COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartBox>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHistory.map((record) => (
              <ShoppingHistoryCard
                key={record.id}
                record={record}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, highlight }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <p className="text-sm text-gray-500">{title}</p>
    <p
      className={`text-2xl font-bold mt-2 ${
        highlight
          ? "text-green-600"
          : "text-orange-600"
      }`}
    >
      {value}
    </p>
  </div>
);

const HighlightBox = ({ title, value }) => (
  <div className="bg-orange-100 p-6 rounded-2xl font-semibold">
    {title}: {value || "—"}
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-3xl shadow-xl">
    <h3 className="text-lg font-semibold mb-6 text-orange-600">
      {title}
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default HistoryPage;