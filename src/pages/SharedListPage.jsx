import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/common/Loader";
import { toast } from "sonner";

const SharedListPage = () => {
  const { listId } = useParams();

  const [items, setItems] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSharedList = async () => {
    try {
      // Fetch list details
      const listRes = await API.get(`/grocery/lists`);
      const matchedList = listRes.data.find(
        (list) => list.id === listId
      );

      if (matchedList) {
        setListTitle(matchedList.title);
      }

      // Fetch items
      const res = await API.get(`/grocery/items/${listId}`);
      setItems(res.data || []);

    } catch {
      toast.error("Failed to load shared list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedList();
  }, [listId]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
                    px-6 py-14">

      <div className="max-w-5xl mx-auto bg-white 
                      rounded-3xl shadow-xl 
                      p-10 border border-orange-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-orange-600">
              {listTitle || "Shared Grocery List"}
            </h1>
            <p className="text-gray-500 mt-2">
              This list was shared with you.
            </p>
          </div>

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            Shared 🔗
          </span>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No items in this list.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-orange-50 p-6 rounded-2xl shadow-sm 
                           hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.item_name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.quantity} {item.unit}
                </p>

                {item.price && (
                  <p className="text-orange-600 font-bold mt-2">
                    ₹{item.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SharedListPage;