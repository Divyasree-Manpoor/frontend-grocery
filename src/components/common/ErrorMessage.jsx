import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { useState } from "react";

const VARIANTS = {
  error: {
    bg: "bg-red-50 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-700",
    text: "text-red-600 dark:text-red-400",
    icon: AlertCircle,
  },
  success: {
    bg: "bg-green-50 dark:bg-green-900/30",
    border: "border-green-200 dark:border-green-700",
    text: "text-green-600 dark:text-green-400",
    icon: CheckCircle2,
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    border: "border-yellow-200 dark:border-yellow-700",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-700",
    text: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
};

const ErrorMessage = ({
  message,
  variant = "error",
  dismissible = false,
}) => {
  const [visible, setVisible] = useState(true);

  if (!message || !visible) return null;

  const config = VARIANTS[variant] || VARIANTS.error;
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`
        relative
        flex items-start sm:items-center gap-3
        ${config.bg}
        border ${config.border}
        ${config.text}
        px-4 sm:px-5 py-3.5
        rounded-2xl
        mb-4
        shadow-md
        backdrop-blur-sm
        transition-all duration-200
        animate-fadeIn
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5 sm:mt-0">
        <Icon size={20} />
      </div>

      {/* Message */}
      <span className="
        text-sm sm:text-[15px]
        font-medium
        leading-relaxed
        break-words
        flex-1
      ">
        {message}
      </span>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="
            ml-2
            opacity-70 hover:opacity-100
            transition
            p-1 rounded-md
            hover:bg-black/5 dark:hover:bg-white/10
          "
        >
          <X size={16} />
        </button>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ErrorMessage;