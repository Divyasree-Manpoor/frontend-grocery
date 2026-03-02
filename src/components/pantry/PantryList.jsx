import { useMemo } from "react";
import PantryCard from "./PantryCard";

const PantryList = ({ items = [], onDelete, onUpdate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ===============================
     CLASSIFY + SORT ITEMS
  =============================== */
  const {
    expired,
    expiring,
    lowStock,
    fresh,
    stats,
  } = useMemo(() => {
    const expiredArr = [];
    const expiringArr = [];
    const lowStockArr = [];
    const freshArr = [];

    let expiredCount = 0;
    let lowStockCount = 0;

    items.forEach((item) => {
      const quantity = Number(item.quantity) || 0;

      let isExpired = false;
      let isExpiring = false;

      if (item.expiry_date) {
        const expiry = new Date(item.expiry_date);
        expiry.setHours(0, 0, 0, 0);

        const diffDays =
          (expiry - today) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) {
          isExpired = true;
          expiredCount++;
        } else if (diffDays <= 3) {
          isExpiring = true;
        }
      }

      if (quantity <= 2) {
        lowStockCount++;
      }

      if (isExpired) expiredArr.push(item);
      else if (isExpiring) expiringArr.push(item);
      else if (quantity <= 2) lowStockArr.push(item);
      else freshArr.push(item);
    });

    return {
      expired: expiredArr,
      expiring: expiringArr,
      lowStock: lowStockArr,
      fresh: freshArr,
      stats: {
        total: items.length,
        expired: expiredCount,
        lowStock: lowStockCount,
      },
    };
  }, [items]);

  if (!items.length) {
    return (
      <div className="bg-white dark:bg-[#1f2937] p-16 rounded-3xl shadow-lg border border-orange-200 text-center text-gray-500 dark:text-gray-400">
        No pantry items available.
      </div>
    );
  }

  /* ===============================
     SECTION RENDER
  =============================== */
  const renderSection = (title, data) => {
    if (!data.length) return null;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item) => (
            <PantryCard
              key={item.id}
              item={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
    );
  };

  /* ===============================
     STATS PERCENTAGES
  =============================== */
  const expiredPercent =
    stats.total > 0
      ? Math.round((stats.expired / stats.total) * 100)
      : 0;

  const lowStockPercent =
    stats.total > 0
      ? Math.round((stats.lowStock / stats.total) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-6">

      {/* ===============================
           STATS HEADER (Animated)
      =============================== */}
      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-3xl shadow-md border border-orange-200 space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <StatCard
            label="Total Items"
            value={stats.total}
            color="text-orange-600"
          />

          <StatCard
            label="Expired"
            value={stats.expired}
            color="text-red-500"
          />

          <StatCard
            label="Low Stock"
            value={stats.lowStock}
            color="text-yellow-500"
          />

        </div>

        {/* Animated Bars */}
        <ProgressBar
          label="Expired Items"
          percent={expiredPercent}
          color="bg-red-500"
        />

        <ProgressBar
          label="Low Stock Items"
          percent={lowStockPercent}
          color="bg-yellow-500"
        />

      </div>

      {/* ===============================
           GROUPED SECTIONS
      =============================== */}
      {renderSection("Expired ❌", expired)}
      {renderSection("Expiring Soon ⚠️", expiring)}
      {renderSection("Low Stock ⚠️", lowStock)}
      {renderSection("Fresh Items ✅", fresh)}

    </div>
  );
};

/* ===============================
   STAT CARD
=============================== */
const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-orange-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {label}
    </p>
    <p className={`text-2xl font-bold mt-2 ${color}`}>
      {value}
    </p>
  </div>
);

/* ===============================
   ANIMATED PROGRESS BAR
=============================== */
const ProgressBar = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span className="font-semibold">{percent}%</span>
    </div>

    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
      <div
        className={`${color} h-3 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default PantryList;