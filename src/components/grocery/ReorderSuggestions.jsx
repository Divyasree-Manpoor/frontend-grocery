import { useEffect, useState } from "react";
import API from "../../services/api";

const ReorderSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await API.get("/shopping/history");
      const data = res.data || [];

      const frequency = {};

      data.forEach((record) => {
        if (!record.items) return;

        record.items.forEach((item) => {
          frequency[item.item_name] =
            (frequency[item.item_name] || 0) + 1;
        });
      });

      const sorted = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      setSuggestions(sorted.map((s) => s[0]));

    } catch (err) {
      console.log("Suggestion error");
    }
  };

  if (!suggestions.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-orange-200 dark:border-gray-700">
      <h4 className="font-semibold mb-4">
        Frequently Bought Items
      </h4>

      <div className="flex flex-wrap gap-3">
        {suggestions.map((item, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReorderSuggestions;