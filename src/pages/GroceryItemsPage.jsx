import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addItem,
  getItems,
  deleteItem,
  getCoupons,
} from "../services/groceryService";
import GroceryItemForm from "../components/grocery/GroceryItemForm";
import GroceryItemCard from "../components/grocery/GroceryItemCard";
import Loader from "../components/common/Loader";
import { toast } from "sonner";
import calculateBudget from "../utils/calculateBudget";

const GroceryItemsPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCoupons, setShowCoupons] = useState(false);

  const [form, setForm] = useState({
    item_name: "",
    category: "",
    quantity: "",
    unit: "piece",
    price: "",
  });

  /* ===============================
     Fetch Items + Coupons
  =============================== */
  const fetchData = async () => {
    try {
      const itemsRes = await getItems(listId);
      const couponRes = await getCoupons(listId);

      const fetchedItems = itemsRes.data || [];
      const calculatedTotal = calculateBudget(fetchedItems);

      setItems(fetchedItems);
      setTotal(calculatedTotal);
      setCoupons(couponRes.data || []);

      localStorage.setItem("totalSpent", calculatedTotal);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listId]);

  /* ===============================
     Add Item
  =============================== */
  const handleAdd = async (data) => {
    try {
      await addItem({
        list_id: listId,
        item_name: data.item_name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        price: data.price,
      });

      toast.success("Item added successfully!");

      setForm({
        item_name: "",
        category: "",
        quantity: "",
        unit: "piece",
        price: "",
      });

      fetchData();
    } catch {
      toast.error("Failed to add item");
    }
  };

  /* ===============================
     Delete Item
  =============================== */
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully!");
      fetchData();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  if (loading) return <Loader />;

  /* ===============================
     Group By Category
  =============================== */
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-[#FFF6F1] via-[#FFE5DB] to-[#FFD2C2]
                    dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]
                    px-6 py-16">

      <div className="max-w-6xl mx-auto space-y-16">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-[#BF360C] dark:text-orange-400">
          Grocery Items
        </h2>

        {/* Add Form */}
        <GroceryItemForm
          form={form}
          setForm={setForm}
          onAdd={handleAdd}
        />

        {/* Items */}
        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#1f2937] p-16 rounded-3xl border text-center">
            No items added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {Object.keys(groupedItems).map((category) => (
              <div
                key={category}
                className="bg-white dark:bg-[#1f2937] p-8 rounded-3xl shadow-md"
              >
                <h3 className="font-bold text-2xl mb-6 text-[#BF360C] dark:text-orange-400">
                  {category}
                </h3>

                <div className="space-y-6">
                  {groupedItems[category].map((item) => (
                    <GroceryItemCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      refresh={fetchData}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex items-center mt-16 gap-6">

          {/* Start Shopping Button */}
          <button
            onClick={() => navigate(`/shopping/${listId}`)}
            className="bg-orange-600 text-white px-8 py-3 rounded-2xl shadow-md hover:bg-orange-700 transition-all font-semibold"
          >
            Start Shopping 🛒
          </button>

          {/* Coupons Button */}
          {coupons.length > 0 && (
            <button
              onClick={() => setShowCoupons(!showCoupons)}
              className="bg-gradient-to-r from-[#F4511E] to-[#D84315] text-white px-8 py-3 rounded-2xl shadow-md transition-all font-semibold"
            >
              {showCoupons ? "Hide Coupons" : "View Coupons 🎉"}
            </button>
          )}

          {/* Total Box */}
          <div className="ml-auto bg-green-50 dark:bg-green-900/30 border border-green-400 px-8 py-4 rounded-2xl text-right shadow-md">
            <p className="text-sm font-semibold text-green-700">
              Total
            </p>
            <p className="text-3xl font-extrabold text-green-600">
              ₹{total}
            </p>
          </div>
        </div>

        {/* Coupons Section */}
        {showCoupons && (
          <div className="bg-white dark:bg-[#1f2937] p-10 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-[#BF360C] dark:text-orange-400">
              Available Coupons
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="bg-[#FFF8F4] dark:bg-[#111827] p-6 rounded-2xl border"
                >
                  <p className="font-semibold text-lg">
                    {coupon.item_name}
                  </p>
                  <p className="text-orange-600 font-bold mt-2">
                    {coupon.discount_percentage}% Off
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GroceryItemsPage;