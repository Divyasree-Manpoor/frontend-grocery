import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  highlight,
  icon,
  trend, // positive | negative
  loading = false,
}) => {
  return (
    <div
      className="
        relative
        bg-white dark:bg-gray-900
        p-5 sm:p-6
        rounded-3xl
        shadow-md hover:shadow-2xl
        border border-orange-200 dark:border-gray-700
        transition-all duration-300
        hover:-translate-y-1
        overflow-hidden
      "
    >
      {/* Subtle Glow */}
      <div className="
        absolute inset-0
        opacity-0 hover:opacity-5
        bg-orange-500
        transition duration-300
      " />

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wide">
          {title}
        </p>

        {icon && (
          <div className="
            p-2 rounded-xl
            bg-orange-100 dark:bg-orange-500/20
            text-orange-500 dark:text-orange-400
            shadow-sm
          ">
            {icon}
          </div>
        )}
      </div>

      {/* Value Section */}
      <div className="mt-4 flex items-end justify-between gap-2">
        {loading ? (
          <div className="
            h-7 w-24
            bg-gray-200 dark:bg-gray-700
            rounded-md
            animate-pulse
          " />
        ) : (
          <p
            className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
              highlight
                ? "text-green-600 dark:text-green-400"
                : "text-orange-600 dark:text-orange-400"
            }`}
          >
            {value}
          </p>
        )}

        {/* Trend Indicator */}
        {trend && !loading && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              trend === "positive"
                ? "text-green-600 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {trend === "positive" ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;