
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PasswordInput from "../../components/common/PasswordInput";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="
          fixed top-5 left-5 z-50
          flex items-center gap-2
          px-4 py-2
          rounded-xl
          bg-white dark:bg-gray-800
          text-gray-700 dark:text-white
          shadow-lg
          hover:scale-105
          transition-all duration-300
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Register Card */}
      <div
        className="
          w-full
          max-w-md

          bg-white
          dark:bg-gray-900

          rounded-3xl

          shadow-2xl

          border
          border-orange-200
          dark:border-gray-700

          p-8
        "
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-600 dark:text-orange-400">
            GroceryGo
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Smart Grocery Management
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
              w-full
              px-4 py-3
              rounded-xl
              bg-orange-50 dark:bg-gray-800
              border border-orange-200 dark:border-gray-600
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-orange-500
              outline-none
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
              w-full
              px-4 py-3
              rounded-xl
              bg-orange-50 dark:bg-gray-800
              border border-orange-200 dark:border-gray-600
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-orange-500
              outline-none
            "
          />

          {/* Password */}
          <PasswordInput
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Password"
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-orange-600 hover:bg-orange-700
              dark:bg-orange-500 dark:hover:bg-orange-600
              text-white
              font-semibold
              flex items-center justify-center gap-2
              transition-all duration-300
              disabled:opacity-70
            "
          >
            {loading && (
              <Loader size="sm" color="white" />
            )}

            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-orange-600
              dark:text-orange-400
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
