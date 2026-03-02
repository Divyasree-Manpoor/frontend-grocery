import { useState, useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  /* ================= CLOSE HANDLERS ================= */
  const closeModal = () => setOpen(false);

  /* ESC KEY SUPPORT */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* CLICK OUTSIDE SUPPORT */
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <>
      {/* Trigger */}
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer inline-block"
      >
        {children}
      </span>

      {/* Modal */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            px-4
            bg-black/40 dark:bg-black/60
            backdrop-blur-md
            animate-fadeIn
          "
          onMouseDown={handleOutsideClick}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="
              w-full max-w-md
              rounded-3xl
              p-6 sm:p-7
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-700
              shadow-2xl
              max-h-[90vh] overflow-y-auto
              animate-scaleIn
              transition-all duration-300
            "
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-5">
              <div className="
                p-3
                bg-red-100 dark:bg-red-900/40
                rounded-full
                flex items-center justify-center
              ">
                <AlertTriangle
                  className="text-red-500"
                  size={20}
                />
              </div>

              <div>
                <h3 className="
                  text-lg sm:text-xl
                  font-semibold
                  text-gray-800 dark:text-gray-100
                ">
                  {title}
                </h3>

                <p className="
                  mt-1 text-sm
                  text-gray-500 dark:text-gray-400
                ">
                  {description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="
              flex flex-col sm:flex-row
              justify-end
              gap-3
            ">
              <button
                onClick={closeModal}
                className="
                  px-4 py-2.5
                  rounded-xl
                  border border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                  bg-gray-50 dark:bg-gray-800
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition duration-200
                "
              >
                {cancelText}
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  closeModal();
                }}
                className="
                  px-4 py-2.5
                  rounded-xl
                  bg-orange-500 hover:bg-orange-600
                  dark:bg-orange-600 dark:hover:bg-orange-500
                  text-white
                  shadow-lg
                  transition duration-200
                "
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0 }
            to { transform: scale(1); opacity: 1 }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.2s ease-in-out;
          }
        `}
      </style>
    </>
  );
};

export default ConfirmDialog;