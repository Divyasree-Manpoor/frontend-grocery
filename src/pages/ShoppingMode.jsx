import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getItems,
  updateItem,
  completeShopping,
  getCoupons,
} from "../services/groceryService";
import { getDashboardStats } from "../services/dashboardService";
import ShoppingItemCard from "../components/shopping/ShoppingItemCard";
import { toast } from "sonner";

const ShoppingMode = () => {
  const { listId } = useParams();

  const [items, setItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);

  /* =========================
     Fetch Items + Coupons + Budget
  ========================= */
  useEffect(() => {
    if (listId) {
      fetchItems();
      fetchCoupons();
      fetchBudget();
    }
  }, [listId]);

  const fetchItems = async () => {
    try {
      const res = await getItems(listId);
      setItems(res.data || []);
    } catch {
      toast.error("Failed to load shopping items");
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons(listId);
      setCoupons(res.data || []);
    } catch {
      console.log("Coupon fetch failed");
    }
  };
const fetchBudget = async () => {
  try {
    const res = await fetch("/api/budget/current", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setBudgetLimit(Number(data.amount) || 0);
  } catch {
    console.log("Budget fetch failed");
  }
};
  

  /* =========================
     Toggle Purchased
  ========================= */
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

  /* =========================
     Calculate Totals + Coupon
  ========================= */

  const purchasedItems = items.filter(
    (item) => item.purchased === true
  );

  let subtotal = 0;
  let totalDiscount = 0;

  purchasedItems.forEach((item) => {
    const itemPrice = parseFloat(item.price) || 0;
    subtotal += itemPrice;

    const matchedCoupon = coupons.find(
      (c) =>
        c.item_name.toLowerCase().trim() ===
        item.item_name.toLowerCase().trim()
    );

    if (matchedCoupon) {
      const discount =
        (itemPrice * matchedCoupon.discount_percentage) / 100;
      totalDiscount += discount;
    }
  });

  const finalTotal = subtotal - totalDiscount;

  const isOverBudget = budgetLimit > 0 && finalTotal > budgetLimit;
  const remainingBudget = budgetLimit - finalTotal;

  /* =========================
     Complete Shopping
  ========================= */
  const handleComplete = async () => {
    try {
      if (purchasedItems.length === 0) {
        toast.warning("No items selected");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) {
        toast.error("User not found. Please login again.");
        return;
      }

      if (isOverBudget) {
        toast.warning("You are completing shopping over budget!");
      }

      await completeShopping({
        user_id: user.id,
        total_amount: finalTotal,
        discount_amount: totalDiscount,
      });

      toast.success("Shopping completed 🎉");

      // Reset purchased state
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          purchased: false,
        }))
      );

    } catch (error) {
      console.log("COMPLETE ERROR:", error);
      toast.error("Completion failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B] 
                    px-6 py-14">

      <div className="max-w-6xl mx-auto space-y-8">

        <h2 className="text-4xl font-bold text-[#BF360C]">
          Shopping Mode
        </h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-orange-200">
            <h3 className="text-xl font-semibold text-[#BF360C]">
              No Items Found
            </h3>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <ShoppingItemCard
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {/* Budget Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-md mt-6 space-y-3">

              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

              <p className="text-green-600">
                Discount: -₹{totalDiscount.toFixed(2)}
              </p>

              <p className={`text-xl font-bold ${
                isOverBudget ? "text-red-600" : "text-orange-600"
              }`}>
                Final Total: ₹{finalTotal.toFixed(2)}
              </p>

              <div className="border-t pt-3 mt-3">
                <p className="font-semibold">
                  Budget Limit: ₹{budgetLimit}
                </p>

                {budgetLimit > 0 && (
                  isOverBudget ? (
                    <p className="text-red-600 font-bold">
                      ⚠ Over Budget by ₹{Math.abs(remainingBudget).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-green-600 font-semibold">
                      ✔ Remaining Budget: ₹{remainingBudget.toFixed(2)}
                    </p>
                  )
                )}
              </div>

              <button
                onClick={handleComplete}
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl"
              >
                Complete Shopping
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ShoppingMode;