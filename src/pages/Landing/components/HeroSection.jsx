import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920')",
        }}
      />

      {/* Light Overlay (NOT too dark) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Plan Your <span className="text-orange-500">Groceries</span> Smarter
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mb-10">
          Smart grocery lists, pantry tracking, meal planning, and budget
          management — all in one powerful platform.
        </p>

        <div className="flex gap-6 justify-center flex-wrap">

          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600
                       text-white px-8 py-3 rounded-full
                       font-semibold transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border-2 border-white
                       text-white px-8 py-3
                       rounded-full font-semibold
                       hover:bg-white hover:text-black transition"
          >
            Login
          </Link>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;