import { useEffect, useMemo, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import {
  getItems,
  updateItem,
  completeShopping,
  getCoupons,
} from "../../services/groceryService";
import { getDashboardStats } from "../../services/dashboardService";
import ShoppingItemCard from "../../components/shopping/ShoppingItemCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const ShoppingMode = () => {
  const { listId } = useParams();
  const navigate = useNavigate(); 
  const [items, setItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completing, setCompleting] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (listId) {
      fetchAll();
    }
  }, [listId]);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [itemsRes, couponRes, statsRes] = await Promise.all([
        getItems(listId),
        getCoupons(listId),
        getDashboardStats(),
      ]);

      setItems(itemsRes?.data || []);
      setCoupons(couponRes?.data || []);

      const stats = statsRes?.data?.data;
      setBudgetLimit(Number(stats?.monthlyBudget) || 0);
    } catch {
      toast.error("Failed to load shopping data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE ================= */

  const handleToggle = async (item) => {
    try {
      await updateItem(item.id, {
        purchased: !item.purchased,
      });

      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, purchased: !i.purchased }
            : i
        )
      );
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= CALCULATIONS ================= */

  const calculations = useMemo(() => {
    const purchased = items.filter((i) => i.purchased);

    let subtotal = 0;
    let discount = 0;

    purchased.forEach((item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      const itemTotal = price * qty;
      subtotal += itemTotal;

      const matchedCoupon = coupons.find(
        (c) =>
          c.item_name?.toLowerCase().trim() ===
          item.item_name?.toLowerCase().trim()
      );

      if (matchedCoupon) {
        discount +=
          (itemTotal *
            Number(matchedCoupon.discount_percentage || 0)) /
          100;
      }
    });

    const finalTotal = subtotal - discount;
    const isOverBudget =
      budgetLimit > 0 && finalTotal > budgetLimit;

    const purchasePercent =
      items.length > 0
        ? Math.round(
            (purchased.length / items.length) * 100
          )
        : 0;

    return {
      purchased,
      subtotal,
      discount,
      finalTotal,
      isOverBudget,
      remainingBudget: budgetLimit - finalTotal,
      purchasePercent,
    };
  }, [items, coupons, budgetLimit]);

  const {
    purchased,
    subtotal,
    discount,
    finalTotal,
    isOverBudget,
    remainingBudget,
    purchasePercent,
  } = calculations;

  /* ================= COMPLETE ================= */

  // 
  const handleComplete = async () => {
  try {
    if (purchased.length === 0) {
      toast.warning("No items selected");
      return;
    }

    setCompleting(true);

    await completeShopping({
      list_id: listId,
    });

    toast.success("Shopping completed 🎉");

    // ✅ ADD THIS LINE
    navigate("/history");

  } catch {
    toast.error("Completion failed");
  } finally {
    setCompleting(false);
  }
};

 /* ================= LOADING ================= */

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );

  /* ================= NO LIST SELECTED ================= */

  if (!listId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="Select a Grocery List"
          description="Go to Grocery page and open a list to start shopping."
        />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen 
      bg-gradient-to-br 
      from-orange-100 via-amber-100 to-orange-200
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      px-4 sm:px-6 lg:px-10 py-10">

      <div className="max-w-7xl mx-auto space-y-10">

        <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-400">
          Shopping Mode
        </h2>

        {items.length === 0 ? (
          <EmptyState
            title="No Items Found"
            description="Add items in grocery list to start shopping."
          />
        ) : (
          <div className="grid xl:grid-cols-3 gap-8">

            {/* ITEMS */}
            <div className="xl:col-span-2 grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <ShoppingItemCard
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white dark:bg-gray-900 
              p-6 rounded-3xl shadow-2xl 
              border border-orange-200 dark:border-gray-700
              h-fit space-y-6">

              <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400">
                Summary
              </h3>

              <p>Subtotal: {formatCurrency(subtotal)}</p>
              <p className="text-green-600">
                Discount: -{formatCurrency(discount)}
              </p>

              <div className="border-t pt-4">
                <p
                  className={`text-lg font-bold ${
                    isOverBudget
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  Final: {formatCurrency(finalTotal)}
                </p>
              </div>

              <button
                onClick={handleComplete}
                disabled={completing}
                className="w-full py-4 rounded-2xl font-semibold
                  bg-gradient-to-r from-orange-600 to-orange-700
                  text-white shadow-lg
                  hover:scale-[1.02] transition-all
                  disabled:opacity-60"
              >
                {completing
                  ? "Processing..."
                  : "Complete Shopping 🛒"}
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingMode;