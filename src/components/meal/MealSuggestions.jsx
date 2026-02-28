const MealSuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1f2937]
                      rounded-3xl shadow-md 
                      p-14 text-center 
                      border border-orange-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No meal suggestions available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {suggestions.map((meal) => (
        <div
          key={meal.id}
          className="bg-white dark:bg-[#1f2937]
                     rounded-3xl shadow-md
                     border border-orange-200 dark:border-gray-700
                     overflow-hidden">

          {/* <img
            src={meal.image_url}
            alt={meal.meal_name}
            className="w-full h-44 object-cover"
          /> */}

<img
  src={
    meal.image ||
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
  }
  alt={meal.meal_name}
  className="w-full h-48 object-cover rounded-t-2xl"
/>

          <div className="p-6">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {meal.meal_name}
            </p>

            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">
              {meal.instructions}
            </div>

            <div className="mt-4 flex gap-3 flex-wrap text-xs">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                {meal.calories} kcal
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {meal.protein}g protein
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealSuggestions;