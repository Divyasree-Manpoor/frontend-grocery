import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-28 bg-background text-center">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-6">
          Take Control of Your Grocery Planning Today
        </h2>

        <p className="text-muted-foreground mb-8">
          Start saving money, reducing waste, and organizing smarter.
        </p>

        <Link
          to="/register"
          className="bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
          Start Free Today
        </Link>

      </div>
    </section>
  );
};

export default CTASection;