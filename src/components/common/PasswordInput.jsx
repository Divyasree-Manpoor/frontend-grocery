import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter password",
  name,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required
        className="
          w-full px-4 py-2.5 pr-11
          rounded-2xl
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          text-gray-800 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-orange-500/70
          focus:border-orange-500
          focus:shadow-md
          transition-all duration-200
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          p-1 rounded-md
          text-gray-500 dark:text-gray-400
          hover:text-orange-500
          dark:hover:text-orange-400
          hover:bg-gray-100 dark:hover:bg-gray-800
          active:scale-90
          transition-all duration-200
        "
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;