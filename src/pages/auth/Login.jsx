import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/common/PasswordInput";
import Loader from "../../components/common/Loader";

const Login = () => {
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ Typing Animation State
  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome Back 👋";

  // Redirect after login
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // ✅ Typing Animation Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 80); // typing speed

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
                 bg-gradient-to-br 
                 from-orange-100 via-amber-100 to-orange-200
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 transition-colors duration-500"
    >
      {/* Glass Card */}
      <div
        className="w-full max-w-md
                   bg-white/80 dark:bg-gray-900/80
                   backdrop-blur-xl
                   border border-orange-200 dark:border-gray-700
                   p-8 rounded-3xl
                   shadow-xl dark:shadow-orange-500/10
                   transition-colors duration-500"
      >
        {/* ✅ Typing Heading */}
        <h2
          className="text-3xl font-bold text-center 
                     text-orange-600 dark:text-orange-400 mb-8"
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            autoComplete="email"
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
            autoComplete="current-password"
            className="bg-orange-50 dark:bg-gray-800 border-orange-200 dark:border-gray-600"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-orange-600 hover:bg-orange-700
                       dark:bg-orange-500 dark:hover:bg-orange-600
                       text-white font-semibold
                       transition duration-300
                       flex justify-center items-center"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;