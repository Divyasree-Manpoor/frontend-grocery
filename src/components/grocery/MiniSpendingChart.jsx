import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MiniSpendingChart = ({ items = [] }) => {

  const chartData = items.map((item) => ({
    name: item.item_name,
    total:
      Number(item.quantity || 0) *
      Number(item.price || 0),
  }));

  if (!chartData.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-orange-200 dark:border-gray-700">
      <h4 className="font-semibold mb-4">
        Item Cost Breakdown
      </h4>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" hide />
          <Tooltip />
          <Bar dataKey="total" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniSpendingChart;