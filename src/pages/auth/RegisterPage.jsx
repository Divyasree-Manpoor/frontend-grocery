import { useState, useEffect } from "react";
import { registerUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/common/PasswordInput";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* =============================
     DARK MODE STATE
  ============================== */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* =============================
     FORM STATE (REMOVED CONFIRM PASSWORD)
  ============================== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* =============================
     Handle Submit
  ============================== */
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
        error.response?.data?.message || "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br
        from-orange-100 via-amber-100 to-orange-200
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        transition-colors duration-500
      "
    >
      <div
        className="
          w-full max-w-md
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl
          border border-orange-200 dark:border-gray-700
          p-8 rounded-3xl
          shadow-2xl
          animate-fadeIn
          relative
        "
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            absolute top-4 right-4
            px-3 py-1 text-xs rounded-lg
            bg-orange-500 text-white
            hover:bg-orange-600 transition
          "
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Heading */}
        <h2
          className="
            text-3xl font-bold text-center mb-8
            text-orange-600 dark:text-orange-400
          "
        >
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="
              w-full px-4 py-3 rounded-xl
              bg-orange-50 dark:bg-gray-800
              border border-orange-200 dark:border-gray-600
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-orange-500
              focus:border-orange-500
              outline-none transition duration-200
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="
              w-full px-4 py-3 rounded-xl
              bg-orange-50 dark:bg-gray-800
              border border-orange-200 dark:border-gray-600
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-orange-500
              focus:border-orange-500
              outline-none transition duration-200
            "
          />

          {/* Password */}
          <PasswordInput
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Password"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-orange-600 hover:bg-orange-700
              dark:bg-orange-500 dark:hover:bg-orange-600
              text-white font-semibold
              transition duration-300
              flex items-center justify-center gap-2
              disabled:opacity-70 disabled:cursor-not-allowed
              hover:scale-[1.02]
            "
          >
            {loading && <Loader size="sm" color="white" />}
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-orange-600 dark:text-orange-400
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;