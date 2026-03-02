import { PackageOpen } from "lucide-react";

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "No Data Found",
  description = "There is nothing here yet.",
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryClick,
  fullHeight = false,
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        text-center
        px-6 sm:px-8
        ${fullHeight ? "min-h-[60vh]" : "py-16"}
        animate-fadeIn
      `}
    >
      {/* Icon */}
      <div
        className="
          p-6 sm:p-8
          rounded-full
          bg-orange-100 dark:bg-orange-900/30
          shadow-inner
          mb-6
          animate-float
        "
      >
        <Icon
          size={40}
          className="text-orange-500 dark:text-orange-400"
        />
      </div>

      {/* Title */}
      <h3 className="
        text-xl sm:text-2xl
        font-semibold
        text-gray-800 dark:text-gray-100
        mb-3
      ">
        {title}
      </h3>

      {/* Description */}
      <p className="
        text-gray-500 dark:text-gray-400
        max-w-md sm:max-w-lg
        mb-8
        text-sm sm:text-base
        leading-relaxed
      ">
        {description}
      </p>

      {/* Buttons */}
      {(buttonText || secondaryButtonText) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="
                px-6 py-2.5 rounded-xl
                bg-orange-500 hover:bg-orange-600
                dark:bg-orange-600 dark:hover:bg-orange-500
                text-white font-medium
                transition duration-200
                shadow-lg hover:scale-105 active:scale-95
              "
            >
              {buttonText}
            </button>
          )}

          {secondaryButtonText && (
            <button
              onClick={onSecondaryClick}
              className="
                px-6 py-2.5 rounded-xl
                border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-800
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition duration-200
              "
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default EmptyState;