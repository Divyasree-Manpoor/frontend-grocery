import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLists, createList } from "../../services/groceryService";
import GroceryForm from "../../components/grocery/GroceryListForm";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { toast } from "sonner";

const suggestions = [
  "Weekly Shopping",
  "Monthly Supplies",
  "Vegetables",
  "Fruits",
  "Supermarket",
  "Home Essentials",
  "Trip Groceries",
  "Thursday Market",
];

const GroceryPage = () => {
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);

  /* Fetch Lists */
  const fetchLists = async () => {
    try {
      setLoading(true);
      const res = await getLists();
      const sorted = (res.data || []).reverse();
      setLists(sorted);
    } catch {
      toast.error("Failed to load lists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleTitleChange = (value) => {
    setTitle(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const result = suggestions.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Enter a list title");
      return;
    }

    try {
      const res = await createList({ title });
      const newList = res.data.list;

      setLists((prev) => [newList, ...prev]);
      setTitle("");
      setFiltered([]);
      toast.success("List created successfully 🎉");
    } catch {
      toast.error("Failed to create list");
    }
  };

  const handleOpenShare = (listId) => {
    setSelectedListId(listId);
    setShowShareModal(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Premium Hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
            alt="Groceries"
            className="w-full h-40 sm:h-56 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center px-6 sm:px-12">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white">
                Smart Grocery Management
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2">
                Organize, share, and manage your shopping effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Create Form Card */}
        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-gray-700 transition hover:shadow-2xl">
          <GroceryForm
            title={title}
            filtered={filtered}
            handleTitleChange={handleTitleChange}
            setTitle={setTitle}
            handleCreate={handleCreate}
          />
        </div>

        {/* Lists */}
        {lists.length === 0 ? (
          <EmptyState
            title="No Grocery Lists Yet"
            description="Create your first grocery list to start organizing."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lists.map((list) => (
              <div
                key={list.id}
                onClick={() => navigate(`/grocery/${list.id}`)}
                className="group bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-md border border-orange-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-orange-500/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="relative flex justify-between items-start">
                  <h3 className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 break-words">
                    {list.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenShare(list.id);
                    }}
                    className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition"
                  >
                    Share 🔗
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Click to manage items →
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Premium Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl w-full max-w-md shadow-2xl border border-orange-200 dark:border-gray-700 space-y-6">

            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Share Grocery List
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check this grocery list: ${window.location.origin}/shared/${selectedListId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl text-center transition hover:scale-105"
              >
                WhatsApp
              </a>

              <a
                href={`mailto:?subject=Grocery List&body=Check this list: ${window.location.origin}/shared/${selectedListId}`}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl text-center transition hover:scale-105"
              >
                Email
              </a>

              <a
                href={`sms:?body=Check this grocery list: ${window.location.origin}/shared/${selectedListId}`}
                className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-xl text-center transition hover:scale-105"
              >
                SMS
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/shared/${selectedListId}`
                  );
                  toast.success("Link copied!");
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl transition hover:scale-105"
              >
                Copy Link
              </button>
            </div>

            <input
              readOnly
              value={`${window.location.origin}/shared/${selectedListId}`}
              className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
            />

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => {
                  setShowShareModal(false);
                  navigate(`/grocery/${selectedListId}`);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
              >
                Open List →
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryPage;