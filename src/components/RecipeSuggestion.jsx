import { useEffect, useState } from "react";
import { getMeals, getPantry } from "../services/groceryService";

// 🔥 Import Images
import defaultImg from "../assets/images/meal.jpg";

const RecipeSuggestion = () => {
  const [suggestedMeals, setSuggestedMeals] = useState([]);

  // 🔥 Image Mapping (MUST be outside useEffect)
  const mealImages = {
    "Tomato Chutney": tomato,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pantryRes = await getPantry();
        const mealsRes = await getMeals();

        const pantryItems =
          pantryRes?.data?.map(item =>
            item.item_name.toLowerCase().trim()
          ) || [];

        const meals = mealsRes?.data || [];

        const matchedMeals = meals.filter(meal => {
          let ingredients = [];

          if (Array.isArray(meal.ingredients)) {
            ingredients = meal.ingredients;
          } else {
            ingredients = JSON.parse(meal.ingredients);
          }

          ingredients = ingredients.map(i =>
            i.toLowerCase().trim()
          );

          const matchCount = ingredients.filter(ing =>
            pantryItems.includes(ing)
          ).length;

          const matchPercentage =
            matchCount / ingredients.length;

          return matchPercentage >= 0.6;
        });

        setSuggestedMeals(matchedMeals);
      } catch (error) {
        console.log("Recipe suggestion error", error);
      }
    };

    fetchData();
  }, []);

  if (suggestedMeals.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold">
          Suggested Meals From Pantry
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          No matching meals available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-6 text-orange-600">
        Suggested Meals From Pantry
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {suggestedMeals.map(meal => {
          let ingredients = [];

          if (Array.isArray(meal.ingredients)) {
            ingredients = meal.ingredients;
          } else {
            ingredients = JSON.parse(meal.ingredients);
          }

          return (
            <div
              key={meal.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {/* ✅ Correct Image Usage */}
              <img
                src={mealImages[meal.meal_name] || defaultImg}
                alt={meal.meal_name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-orange-600">
                  {meal.meal_name}
                </h3>

                <div className="flex gap-3 mt-3">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    {meal.calories} kcal
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {meal.protein}g protein
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Ingredients: {ingredients.join(", ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeSuggestion;