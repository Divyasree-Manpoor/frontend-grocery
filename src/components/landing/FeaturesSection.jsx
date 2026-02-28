import { ShoppingCart, Refrigerator, Utensils } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-28 bg-muted">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed to simplify grocery management and reduce waste while saving money.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Feature Card */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
              alt="Grocery List"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <ShoppingCart className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Smart Lists</h3>
              <p className="text-muted-foreground">
                Organize shopping items efficiently and track spending in real time.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
              alt="Pantry"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <Refrigerator className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Pantry Control</h3>
              <p className="text-muted-foreground">
                Monitor stock levels and expiration dates easily.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Meal Planning"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <Utensils className="text-primary mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Meal Planning</h3>
              <p className="text-muted-foreground">
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