import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const SharedListPage = () => {
  const { listId } = useParams();

  const [listTitle, setListTitle] = useState("");
  const [items, setItems] = useState([]);
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SHARED LIST ================= */

  const fetchSharedList = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/grocery/shared/${listId}`);

      const data = res.data || {};

      setListTitle(data.title || "Shared Grocery List");
      setItems(Array.isArray(data.items) ? data.items : []);
      setOwner(data.owner || "");
    } catch (error) {
      toast.error("Shared list not found or expired");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listId) fetchSharedList();
  }, [listId]);

  /* ================= CALCULATIONS ================= */

  const totalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        (Number(item.price) || 0) *
          (Number(item.quantity) || 1),
      0
    );
  }, [items]);

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalAmount);

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-50">
        <Loader size="lg" />
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-12 
                    bg-gradient-to-br 
                    from-orange-100 via-amber-100 to-orange-200 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    transition-colors duration-500">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* 🔥 Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Shared Grocery"
            className="w-full h-44 sm:h-52 md:h-60 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 md:px-10 space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {listTitle}
            </h1>

            <div className="flex items-center gap-3 text-sm text-white">
              <Lock size={16} />
              <span>View Only Mode</span>
              {owner && (
                <span className="opacity-80">
                  • Shared by {owner}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 🛒 Items Section */}
        {items.length === 0 ? (
          <EmptyState
            title="No Items Found"
            description="This shared list does not contain any items."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const itemTotal =
                  (Number(item.price) || 0) *
                  (Number(item.quantity) || 1);

                return (
                  <div
                    key={item.id}
                    className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl 
                               p-6 rounded-2xl shadow-lg 
                               border border-orange-200 dark:border-gray-700
                               hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                      {item.item_name}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                      {item.quantity} {item.unit || ""}
                    </p>

                    {item.price > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="text-orange-600 font-bold">
                          ₹{itemTotal.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 💰 Total Summary */}
            <div className="bg-white dark:bg-gray-900 
                            rounded-3xl shadow-xl 
                            border border-orange-200 dark:border-gray-700 
                            p-8 text-right transition-all duration-300">

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Estimated Amount
              </p>

              <p className="text-3xl sm:text-4xl font-bold text-orange-600 mt-2">
                {formattedTotal}
              </p>
            </div>
          </>
        )}

        {/* 🔗 Footer */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-8 border-t border-orange-200 dark:border-gray-700">
          Shared via{" "}
          <span className="font-semibold text-orange-600">
            GroceryGo
          </span>{" "}
          🔗
        </div>

      </div>
    </div>
  );
};

export default SharedListPage;