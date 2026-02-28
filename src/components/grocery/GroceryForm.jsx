import { useEffect } from "react";

const GroceryForm = ({
  title,
  filtered = [],
  handleTitleChange,
  setTitle,
  handleCreate,
}) => {

  /* ===============================
     🔥 Save Last Typed Title (Frontend)
  ================================ */
  useEffect(() => {
    const savedTitle = localStorage.getItem("lastListTitle");
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  const handleSelectSuggestion = (item) => {
    setTitle(item);
    handleTitleChange(item);
    localStorage.setItem("lastListTitle", item);
  };

  const handleInputChange = (value) => {
    setTitle(value);
    handleTitleChange(value);
    localStorage.setItem("lastListTitle", value);
  };

  return (
    <form
      onSubmit={handleCreate}
      className="relative space-y-6"
    >
      <div className="flex gap-5 flex-col sm:flex-row">

        {/* ================= Input ================= */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Create new grocery list..."
          className="
            flex-1 px-6 py-4 rounded-3xl
            bg-white dark:bg-[#111827]
            border border-orange-300 dark:border-orange-500/30
            shadow-[0_10px_25px_rgba(191,54,12,0.15)]
            focus:ring-2 focus:ring-orange-400
            focus:border-orange-400
            outline-none
            transition-all duration-300
            text-[#BF360C] dark:text-orange-300
            placeholder-[#A64B2A] dark:placeholder-gray-400
          "
        />

        {/* ================= Button ================= */}
        <button
          type="submit"
          className="
            bg-gradient-to-r from-[#F4511E] to-[#D84315]
            text-white px-8 py-4
            rounded-3xl
            shadow-[0_10px_30px_rgba(244,81,30,0.35)]
            hover:shadow-[0_20px_50px_rgba(244,81,30,0.55)]
            hover:-translate-y-1
            active:scale-95
            transition-all duration-300
            font-semibold tracking-wide
          "
        >
          Create
        </button>
      </div>

      {/* ================= Suggestions ================= */}
      {filtered.length > 0 && (
        <div
          className="
            absolute w-full
            bg-white dark:bg-[#1f2937]
            border border-orange-300 dark:border-orange-500/30
            rounded-3xl
            shadow-[0_25px_60px_rgba(191,54,12,0.25)]
            mt-3 z-50 overflow-hidden
            backdrop-blur-sm
          "
        >
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelectSuggestion(item)}
              className="
                px-6 py-4
                hover:bg-[#FFF4EE] dark:hover:bg-[#111827]
                cursor-pointer
                transition-all duration-300
                text-[#BF360C] dark:text-orange-300
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default GroceryForm;