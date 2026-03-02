import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PantryAnalytics = ({ items = [] }) => {
  /* =============================
     ANALYTICS CALCULATIONS
  ============================= */
  const { totalItems, lowStock, expiringSoon, chartData } =
    useMemo(() => {
      const totalItems = items.length;

      const lowStock = items.filter(
        (i) => Number(i.quantity) <= 2
      ).length;

      const expiringSoon = items.filter((i) => {
        if (!i.expiry_date) return false;

        const diff =
          new Date(i.expiry_date) - new Date();

        return diff > 0 && diff <= 3 * 86400000;
      }).length;

      const chartData = [
        { name: "Total", value: totalItems },
        { name: "Low Stock", value: lowStock },
        { name: "Expiring", value: expiringSoon },
      ];

      return { totalItems, lowStock, expiringSoon, chartData };
    }, [items]);

  // ✅ Prevent rendering if no items
  if (!items || items.length === 0) return null;//updated

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700 space-y-8">

      <h2 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
        Pantry Analytics
      </h2>

      {/* 📊 Chart */}
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📦 Progress Bars */}
      <div className="space-y-6">

        <ProgressBar
          label="Low Stock Items"
          value={lowStock}
          total={totalItems}
          color="bg-orange-500"
        />

        <ProgressBar
          label="Expiring Soon"
          value={expiringSoon}
          total={totalItems}
          color="bg-yellow-500"
        />

      </div>
    </div>
  );
};

/* =============================
   Progress Bar Component
============================= */
const ProgressBar = ({ label, value, total, color }) => {
  const percent =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="font-semibold">
          {value} ({percent}%)
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
        <div
          className={`${color} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default PantryAnalytics;