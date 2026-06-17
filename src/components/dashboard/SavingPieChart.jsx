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
bg-white
dark:bg-gray-900


    p-6 sm:p-8

    rounded-3xl

    border
    border-gray-200
    dark:border-gray-700

    shadow-lg
    hover:shadow-2xl

    transition-all duration-300
  "
>
  <h3
    className="
      text-lg sm:text-xl
      font-semibold

      text-orange-600
      dark:text-orange-400

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
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "12px",
            color: "#ffffff",
            fontSize: "14px",
          }}
          labelStyle={{
            color: "#f97316",
            fontWeight: 600,
          }}
        />

        <Legend
          wrapperStyle={{
            fontSize: "14px",
            paddingTop: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>


);
};

export default SavingsPieChart;
