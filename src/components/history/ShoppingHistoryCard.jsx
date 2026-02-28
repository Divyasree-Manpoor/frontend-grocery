import { ShoppingCart } from "lucide-react";

const ShoppingHistoryCard = ({ record }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(record?.total_amount || 0);

  const formattedDate = record?.completed_at
    ? new Date(record.completed_at).toLocaleString("en-IN")
    : "—";

  return (
    <div
      className="bg-white dark:bg-[#1f2937]
                 rounded-3xl shadow-md 
                 border border-orange-200 dark:border-gray-700
                 p-6 flex justify-between items-center
                 hover:shadow-xl transition-all duration-300"
    >

      <div className="flex items-center gap-4">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full">
          <ShoppingCart size={22} className="text-orange-600 dark:text-orange-400" />
        </div>

        <div>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {formattedAmount}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>

      <span
        className="text-xs bg-orange-50 dark:bg-orange-900/30
                   text-orange-600 dark:text-orange-400
                   px-4 py-1 rounded-full font-medium"
      >
        Completed
      </span>

    </div>
  );
};

export default ShoppingHistoryCard;