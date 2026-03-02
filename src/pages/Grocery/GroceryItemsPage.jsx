import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  addItem,
  getItems,
  deleteItem,
  getCoupons,
} from "../../services/groceryService";

import GroceryItemForm from "../../components/grocery/GroceryItemForm";
import GroceryItemCard from "../../components/grocery/GroceryItemCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { toast } from "sonner";
import calculateBudget from "../../utils/calculateBudget";

const GroceryItemsPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCoupons, setShowCoupons] = useState(false);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("name");

  const [form, setForm] = useState({
    item_name: "",
    category: "",
    quantity: "",
    unit: "piece",
    price: "",
  });

  /* Fetch Data */
  const fetchData = async () => {
    try {
      setLoading(true);
      const itemsRes = await getItems(listId);
      const couponRes = await getCoupons(listId);

      setItems(itemsRes.data || []);
      setCoupons(couponRes.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listId]);

  /* Add Item */
  const handleAdd = async (data) => {
    try {
      await addItem({ ...data, list_id: listId });
      toast.success("Item added");
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

  /* Delete Item */
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* Filter + Sort */
  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortType === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
      );
    }

    return filtered;
  }, [items, search, sortType]);

  const total = useMemo(() => {
    return calculateBudget(filteredItems);
  }, [filteredItems]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Grocery"
            className="w-full h-40 sm:h-52 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center px-6">
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              Grocery Items Overview
            </h2>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* Add Form */}
        <GroceryItemForm
          form={form}
          setForm={setForm}
          onAdd={handleAdd}
        />

        {/* Items */}
        {filteredItems.length === 0 ? (
          <EmptyState
            title="No Items Found"
            description="Add items or adjust search."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <GroceryItemCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                refresh={fetchData}
              />
            ))}
          </div>
        )}

        {/* Buttons */}
        {filteredItems.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(`/shopping/${listId}`)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Start Shopping 🛒
            </button>

            {coupons.length > 0 && (
              <button
                onClick={() => setShowCoupons(!showCoupons)}
                className="bg-orange-700 text-white px-6 py-3 rounded-xl transition"
              >
                {showCoupons ? "Hide Coupons" : "View Coupons 🎉"}
              </button>
            )}
          </div>
        )}

        {/* Coupons */}
        {showCoupons && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow border space-y-6">
            <h3 className="text-xl font-bold text-orange-600">
              Available Coupons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-5 bg-orange-50 dark:bg-gray-800 rounded-xl border shadow-sm"
                >
                  <p className="font-semibold">
                    {coupon.item_name}
                  </p>
                  <p className="text-orange-600 font-bold mt-2">
                    {coupon.discount_percentage}% OFF
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Total Bar (Mobile) */}
      {filteredItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-lg p-4 sm:hidden">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-bold text-green-600">
              ₹{total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryItemsPage;