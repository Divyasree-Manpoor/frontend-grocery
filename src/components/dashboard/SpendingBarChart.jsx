import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SpendingBarChart = ({ data }) => {
  return (
    <div
      className="
        bg-white dark:bg-gray-900
        p-6 sm:p-8
        rounded-3xl
        shadow-xl hover:shadow-2xl
        border border-orange-200 dark:border-gray-700
        transition-all duration-300
      "
    >
      <h3
        className="
          text-lg sm:text-xl
          font-semibold
          text-orange-600 dark:text-orange-400
          mb-6
        "
      >
        Monthly Spending
      </h3>

      <div className="w-full h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px",
              }}
              labelStyle={{ color: "#f97316" }}
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

export default SpendingBarChart;