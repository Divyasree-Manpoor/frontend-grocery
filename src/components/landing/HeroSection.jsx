import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Plan Your <span className="text-orange-400">Groceries</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Smart grocery lists, pantry tracking, meal planning and budget
          management — all in one powerful platform.
        </p>

        <Link
          to="/register"
          className="bg-orange-500 hover:bg-orange-600 
                     text-white px-8 py-3 rounded-full 
                     text-lg font-semibold transition duration-300"
        >
          Get Started 🚀
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;