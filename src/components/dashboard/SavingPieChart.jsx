import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#f97316", "#16a34a", "#3b82f6", "#ea580c"];

const SavingsPieChart = ({ data }) => {
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
        Category Spending
      </h3>

      <div className="w-full h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

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

            <Legend
              wrapperStyle={{
                fontSize: "14px",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SavingsPieChart;