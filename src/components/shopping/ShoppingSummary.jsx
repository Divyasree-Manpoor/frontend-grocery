const ShoppingSummary = ({ total = 0, onComplete }) => {
  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(total);

  const isDisabled = total <= 0;

  return (
    <div
      className="bg-white border border-orange-200 
                 p-8 rounded-3xl shadow-xl mt-12 
                 transition-all duration-300"
    >
      <div className="flex justify-between items-center">

        <h3 className="text-2xl font-bold text-[#BF360C]">
          Total Spending
        </h3>

        <p className="text-3xl font-extrabold text-orange-600">
          {formattedTotal}
        </p>
      </div>

      <button
        onClick={onComplete}
        disabled={isDisabled}
        className={`mt-8 w-full py-4 rounded-2xl font-semibold
                    transition-all duration-300 shadow-md
                    ${
                      isDisabled
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-orange-600 hover:bg-orange-700 hover:shadow-xl text-white"
                    }`}
      >
        Complete Shopping
      </button>
    </div>
  );
};

export default ShoppingSummary;