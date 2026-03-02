import { Toaster } from "sonner";
import { useEffect, useState } from "react";

const ToasterProvider = () => {
  const [isMobile, setIsMobile] = useState(false);

  /* ================= Responsive Position ================= */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Toaster
      position={isMobile ? "bottom-center" : "top-right"}
      richColors
      closeButton
      expand
      visibleToasts={4}
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "16px",
          padding: "14px 18px",
          fontSize: "14px",
          backdropFilter: "blur(8px)",
        },
        classNames: {
          toast: `
            shadow-2xl
            border border-gray-200 dark:border-gray-700
            bg-white/90 dark:bg-gray-900/90
            backdrop-blur-md
            transition-all duration-300
          `,
          title: `
            font-semibold
            text-gray-800 dark:text-gray-100
          `,
          description: `
            text-gray-500 dark:text-gray-400
            text-sm
          `,
          actionButton: `
            bg-orange-600 hover:bg-orange-700
            dark:bg-orange-500 dark:hover:bg-orange-600
            text-white
            rounded-lg
            px-3 py-1.5
            transition
          `,
          cancelButton: `
            bg-gray-200 hover:bg-gray-300
            dark:bg-gray-700 dark:hover:bg-gray-600
            text-gray-800 dark:text-gray-200
            rounded-lg
            px-3 py-1.5
            transition
          `,
        },
      }}
    />
  );
};

export default ToasterProvider;