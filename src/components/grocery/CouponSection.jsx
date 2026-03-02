import { useMemo } from "react";

const CouponSection = ({ coupons = [], items = [] }) => {
  const today = new Date();

  const validCoupons = useMemo(() => {
    return coupons.filter(
      (c) => new Date(c.valid_until) >= today
    );
  }, [coupons]);

  const estimatedSavings = useMemo(() => {
    let total = 0;

    validCoupons.forEach((coupon) => {
      const matchedItem = items.find(
        (item) =>
          item.item_name?.toLowerCase().trim() ===
          coupon.item_name?.toLowerCase().trim()
      );

      if (matchedItem) {
        const price =
          Number(matchedItem.price || 0) *
          Number(matchedItem.quantity || 1);

        total +=
          (price * coupon.discount_percentage) / 100;
      }
    });

    return total;
  }, [validCoupons, items]);

  if (!validCoupons.length) return null;

  return (
    <div
      className="
        w-full
        bg-card text-card-foreground
        p-5 sm:p-6 md:p-8
        rounded-3xl
        shadow-xl
        border border-border
        space-y-6
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <h3
          className="
            text-lg sm:text-xl md:text-2xl
            font-semibold
          "
        >
          Available Coupons 🎉
        </h3>

        <span
          className="
            text-xs sm:text-sm
            bg-green-100 dark:bg-green-900/30
            text-green-600 dark:text-green-400
            px-3 sm:px-4 py-1.5
            rounded-full
            font-medium
            shadow-sm
            whitespace-nowrap
          "
        >
          Save up to ₹{estimatedSavings.toFixed(2)}
        </span>
      </div>

      {/* Coupon Grid */}
      <div
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 sm:gap-6
        "
      >
        {validCoupons.map((coupon, index) => (
          <div
            key={coupon.id}
            className="
              relative
              bg-muted
              p-5 sm:p-6
              rounded-2xl
              border border-border
              hover:shadow-lg
              transition-all duration-300
              break-words
            "
          >
            {index === 0 && (
              <span
                className="
                  absolute top-3 right-3
                  text-[10px] sm:text-xs
                  bg-primary text-primary-foreground
                  px-3 py-1
                  rounded-full
                  font-semibold
                "
              >
                Best Deal
              </span>
            )}

            <p
              className="
                font-semibold
                text-base sm:text-lg
                truncate sm:break-words
              "
            >
              {coupon.item_name}
            </p>

            <p className="text-sm text-muted-foreground mt-2">
              {coupon.discount_percentage}% Discount
            </p>

            <p className="text-xs text-muted-foreground mt-2">
              Valid till{" "}
              {new Date(
                coupon.valid_until
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;