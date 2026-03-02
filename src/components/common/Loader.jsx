import { Loader2 } from "lucide-react";

const Loader = ({
  size = "md",
  color = "orange",
  center = false,
  fullscreen = false,
  label,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
    xl: "w-14 h-14 border-4",
  };

  const colorClasses = {
    orange: "border-orange-500 dark:border-orange-400",
    white: "border-white",
    gray: "border-gray-400 dark:border-gray-500",
    green: "border-green-500 dark:border-green-400",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          border-t-transparent
          rounded-full
          animate-spin
        `}
      />
      {label && (
        <p className="
          text-sm
          text-gray-500 dark:text-gray-400
          animate-pulse
        ">
          {label}
        </p>
      )}
    </div>
  );

  // Fullscreen overlay mode
  if (fullscreen) {
    return (
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/40 dark:bg-black/60
          backdrop-blur-md
          transition-opacity duration-300
        "
      >
        <div
          className="
            bg-white dark:bg-gray-900
            p-8 sm:p-10
            rounded-3xl
            shadow-2xl
            border border-gray-200 dark:border-gray-700
            transition-colors duration-300
          "
        >
          {spinner}
        </div>
      </div>
    );
  }

  // Center mode
  if (center) {
    return (
      <div className="flex items-center justify-center w-full py-10">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;