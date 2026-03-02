import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const MonthlyAnalytics = ({ history = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );

  /* ===============================
     FILTER DATA BY MONTH
  =============================== */
  const filteredData = useMemo(() => {
    return history.filter((record) => {
      const date = new Date(record.completed_at);
      return date.getMonth() === Number(selectedMonth);
    });
  }, [history, selectedMonth]);

  /* ===============================
     CALCULATIONS
  =============================== */
  const { totalSpending, totalSavings, chartData } =
    useMemo(() => {
      let spending = 0;
      let savings = 0;

      const dailyMap = {};

      filteredData.forEach((record) => {
        const date = new Date(record.completed_at);
        const day = date.getDate();

        spending += Number(record.total_amount) || 0;
        savings += Number(record.discount_amount) || 0;

        if (!dailyMap[day]) dailyMap[day] = 0;

        dailyMap[day] +=
          Number(record.total_amount) || 0;
      });

      const chart = Object.keys(dailyMap).map(
        (day) => ({
          day,
          amount: dailyMap[day],
        })
      );

      return {
        totalSpending: spending,
        totalSavings: savings,
        chartData: chart,
      };
    }, [filteredData]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white dark:bg-gray-900 
      border border-orange-200 dark:border-gray-700
      rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
          Monthly Analytics
        </h3>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
          className="px-4 py-2 rounded-xl border border-orange-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-2xl text-center">
          <p className="text-sm text-gray-500">
            Total Spending
          </p>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {formatCurrency(totalSpending)}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-2xl text-center">
          <p className="text-sm text-gray-500">
            Total Savings
          </p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {formatCurrency(totalSavings)}
          </p>
        </div>

      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                formatCurrency(value)
              }
            />
            <Bar
              dataKey="amount"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default MonthlyAnalytics;