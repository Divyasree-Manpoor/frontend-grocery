import { useState } from "react";

const MealSuggestions = ({ suggestions = [] }) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d";

  if (!suggestions || suggestions.length === 0) {
    return (
      <div
        className="
          bg-white dark:bg-[#1f2937]
          rounded-3xl shadow-md
          p-10 sm:p-14
          text-center
          border border-orange-200 dark:border-gray-700
        "
      >
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No meal suggestions available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {suggestions.map((meal) => (
        <MealCard key={meal.id} meal={meal} fallbackImage={fallbackImage} />
      ))}
    </div>
  );
};

const MealCard = ({ meal, fallbackImage }) => {
  const [imgSrc, setImgSrc] = useState(
    meal.image || meal.image_url || fallbackImage
  );

  return (
    <div
      className="
        group
        bg-white dark:bg-[#1f2937]
        rounded-3xl
        shadow-md hover:shadow-2xl
        border border-orange-200 dark:border-gray-700
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-2
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={meal.meal_name}
          loading="lazy"
          onError={() => setImgSrc(fallbackImage)}
          className="
            w-full h-48 sm:h-52
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">

        {/* Title */}
        <h3
          className="
            text-lg sm:text-xl
            font-bold
            text-gray-800 dark:text-gray-200
            break-words
          "
        >
          {meal.meal_name || "Unnamed Meal"}
        </h3>

        {/* Instructions (Clamped) */}
        <p
          className="
            text-sm text-gray-500 dark:text-gray-400
            line-clamp-3
          "
        >
          {meal.instructions || "No instructions provided."}
        </p>

        {/* Nutrition Badges */}
        <div className="flex flex-wrap gap-2 pt-2">

          {meal.calories && (
            <span
              className="
                bg-orange-100 dark:bg-orange-500/20
                text-orange-600 dark:text-orange-400
                px-3 py-1
                rounded-full
                text-xs font-semibold
              "
            >
              {meal.calories} kcal
            </span>
          )}

          {meal.protein && (
            <span
              className="
                bg-blue-100 dark:bg-blue-500/20
                text-blue-600 dark:text-blue-400
                px-3 py-1
                rounded-full
                text-xs font-semibold
              "
            >
              {meal.protein}g protein
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

export default MealSuggestions;