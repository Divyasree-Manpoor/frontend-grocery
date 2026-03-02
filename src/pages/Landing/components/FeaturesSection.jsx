import { ShoppingCart, Package, Utensils } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-28 bg-orange-50 dark:bg-gray-900 transition-colors duration-500">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Designed to simplify grocery management, reduce waste,
            and help you stay within your budget effortlessly.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Feature 1 */}
          <div className="group bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 
                          rounded-3xl overflow-hidden shadow-md
                          hover:shadow-2xl transition duration-300 
                          hover:-translate-y-2">

            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                alt="Grocery List"
                className="h-48 w-full object-cover 
                           group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-6 text-center">
              <ShoppingCart className="text-orange-500 mb-4 mx-auto" size={28} />
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Smart Lists
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize shopping items efficiently and track spending in real time.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 
                          rounded-3xl overflow-hidden shadow-md
                          hover:shadow-2xl transition duration-300 
                          hover:-translate-y-2">

            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
                alt="Pantry"
                className="h-48 w-full object-cover 
                           group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-6 text-center">
              <Package className="text-orange-500 mb-4 mx-auto" size={28} />
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Pantry Control
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor stock levels and expiration dates easily.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 
                          rounded-3xl overflow-hidden shadow-md
                          hover:shadow-2xl transition duration-300 
                          hover:-translate-y-2">

            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="Meal Planning"
                className="h-48 w-full object-cover 
                           group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-6 text-center">
              <Utensils className="text-orange-500 mb-4 mx-auto" size={28} />
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Meal Planning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Plan weekly meals based on what’s already in your pantry.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;