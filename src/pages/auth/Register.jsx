import { useState } from "react";
import { registerUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/common/PasswordInput";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";

const Register = () => {
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
      await registerUser(form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br 
                 from-orange-100 via-amber-100 to-orange-200
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 transition-colors duration-500"
    >
      <div
        className="w-full max-w-md
                   bg-white/80 dark:bg-gray-900/80
                   backdrop-blur-xl
                   border border-orange-200 dark:border-gray-700
                   p-8 rounded-3xl
                   shadow-xl dark:shadow-orange-500/10
                   transition-colors duration-500"
      >
        <h2
          className="text-3xl font-bold text-center mb-6
                     text-orange-600 dark:text-orange-400"
        >
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl
                       bg-orange-50 dark:bg-gray-800
                       border border-orange-200 dark:border-gray-600
                       text-gray-800 dark:text-white
                       focus:border-orange-500
                       focus:ring-2 focus:ring-orange-400
                       outline-none transition"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl
                       bg-orange-50 dark:bg-gray-800
                       border border-orange-200 dark:border-gray-600
                       text-gray-800 dark:text-white
                       focus:border-orange-500
                       focus:ring-2 focus:ring-orange-400
                       outline-none transition"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* Password */}
          <PasswordInput
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Password"
            className="bg-orange-50 dark:bg-gray-800 border-orange-200 dark:border-gray-600"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl
                       bg-orange-600 hover:bg-orange-700
                       dark:bg-orange-500 dark:hover:bg-orange-600
                       text-white font-semibold
                       transition duration-300
                       flex justify-center items-center"
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;