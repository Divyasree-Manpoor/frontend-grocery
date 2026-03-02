const GroceryListForm = ({
  title,
  filtered = [],
  handleTitleChange,
  setTitle,
  handleCreate,
}) => {
  const handleSelectSuggestion = (item) => {
    setTitle(item);
    handleTitleChange(item);
  };

  return (
    <form
      onSubmit={handleCreate}
      className="relative w-full space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-4 w-full">
        
        {/* Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Create new grocery list..."
          className="flex-1 w-full min-w-0 px-5 py-3 rounded-2xl border border-orange-300 dark:border-gray-700 
                     focus:ring-2 focus:ring-orange-400 outline-none
                     dark:bg-gray-900 dark:text-white"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full sm:w-auto sm:shrink-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 
                     rounded-2xl font-semibold transition"
        >
          Create
        </button>

      </div>

      {/* Suggestions Dropdown */}
      {filtered.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 w-full bg-white dark:bg-gray-900 
                     border border-orange-200 dark:border-gray-700 
                     rounded-2xl shadow-md mt-2 z-50 overflow-hidden"
        >
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelectSuggestion(item)}
              className="px-5 py-3 cursor-pointer hover:bg-orange-50 
                         dark:hover:bg-gray-800 transition break-words"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default GroceryListForm;