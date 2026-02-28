import { useState } from "react";

const ConfirmDialog = ({ onConfirm, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)}>
        {children}
      </span>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-card p-6 rounded-xl shadow max-w-sm w-full">
            <h3 className="font-semibold mb-4">
              Are you sure?
            </h3>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className="bg-destructive text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;