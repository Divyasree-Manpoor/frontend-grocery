import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { getLists, createList } from "../services/groceryService";
import GroceryForm from "../components/grocery/GroceryForm";
import Loader from "../components/common/Loader";
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

  // Share states
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);

  /* ========================================
     Fetch Lists
  ======================================== */
  const fetchLists = async () => {
    try {
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

  /* ========================================
     Handle Title Change
  ======================================== */
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

  /* ========================================
     Create List
  ======================================== */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Enter a list title");
      return;
    }

    try {
      const res = await createList({ title });
      const newList = res.data.list[0];
      setLists([newList, ...lists]);
      setTitle("");
      setFiltered([]);
      toast.success("List created successfully 🎉");
    } catch {
      toast.error("Failed to create list");
    }
  };

  /* ========================================
     Share Logic
  ======================================== */
  const handleOpenShare = (listId) => {
    setSelectedListId(listId);
    setShowShareModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-[#FCE4DC] via-[#FFD8C8] to-[#F28B6B]
                    dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0b1120]
                    px-6 py-14">

      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#BF360C] dark:text-orange-400">
            Grocery Lists
          </h1>
          <p className="text-[#8D2B0B] dark:text-gray-400">
            Organize, manage and shop smarter.
          </p>
        </div>

        {/* Create Form */}
        <div className="bg-white dark:bg-[#1f2937] p-8 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-500/30">
          <GroceryForm
            title={title}
            filtered={filtered}
            handleTitleChange={handleTitleChange}
            setTitle={setTitle}
            handleCreate={handleCreate}
          />
        </div>

        {/* Lists */}
        <div className="space-y-6">
          {lists.map((list) => (
            <div
              key={list.id}
              onClick={() => navigate(`/grocery/${list.id}`)}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-orange-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-orange-600">
                  {list.title}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigation
                    handleOpenShare(list.id);
                  }}
                  className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
                >
                  Share 🔗
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[420px] shadow-xl">

            <h3 className="text-xl font-bold mb-6 text-orange-600">
              Share Grocery List
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check this grocery list: ${window.location.origin}/shared/${selectedListId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-xl hover:scale-105 transition"
              >
                🟢 WhatsApp
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=Grocery List&body=Check this list: ${window.location.origin}/shared/${selectedListId}`}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-xl hover:scale-105 transition"
              >
                📧 Email
              </a>

              {/* SMS */}
              <a
                href={`sms:?body=Check this grocery list: ${window.location.origin}/shared/${selectedListId}`}
                className="flex items-center justify-center gap-2 bg-purple-500 text-white p-3 rounded-xl hover:scale-105 transition"
              >
                💬 SMS
              </a>

              {/* Instagram Copy */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/shared/${selectedListId}`
                  );
                  toast.success("Link copied! Paste on Instagram");
                }}
                className="flex items-center justify-center gap-2 bg-pink-500 text-white p-3 rounded-xl hover:scale-105 transition"
              >
                📸 Instagram
              </button>

            </div>

            <div className="mt-6">
              <input
                readOnly
                value={`${window.location.origin}/shared/${selectedListId}`}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>

            <div className="flex justify-between items-center mt-6">

  {/* Open Button */}
  <button
    onClick={() => {
      setShowShareModal(false);
      navigate(`/grocery/${selectedListId}`);
    }}
    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
  >
    Open List →
  </button>

  {/* Close Button */}
  <button
    onClick={() => setShowShareModal(false)}
    className="px-4 py-2 bg-gray-300 rounded-lg"
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

