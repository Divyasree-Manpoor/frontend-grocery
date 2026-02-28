import { useEffect, useState } from "react";
import GroceryCard from "./GroceryCard";

const GroceryList = ({ lists = [], refresh }) => {
  const [lastOpenedId, setLastOpenedId] = useState(null);

  /* ===================================
     🔥 Highlight Last Opened List
     (Frontend Only)
  ==================================== */
  useEffect(() => {
    const stored = localStorage.getItem("lastOpenedList");
    if (stored) {
      const parsed = JSON.parse(stored);
      setLastOpenedId(parsed.id);
    }
  }, []);

  if (!lists || lists.length === 0) {
    return (
      <div
        className="
          text-[#8D2B0B] dark:text-orange-300
          text-lg text-center py-28
          bg-white dark:bg-[#1f2937]
          rounded-3xl
          border border-orange-300 dark:border-orange-500/30
          shadow-[0_30px_80px_rgba(191,54,12,0.2)]
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        "
      >
        No grocery lists created yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* 🔥 Total Lists Counter */}
      <div className="text-sm text-[#8D2B0B] dark:text-gray-400 font-medium">
        Total Lists: {lists.length}
      </div>

      {lists.map((list) => (
        <div
          key={list.id}
          className={`
            transition-all duration-300
            ${
              list.id === lastOpenedId
                ? "ring-2 ring-orange-400 rounded-3xl"
                : ""
            }
          `}
        >
          <GroceryCard
            list={list}
            refresh={refresh}
          />
        </div>
      ))}
    </div>
  );
};

export default GroceryList;