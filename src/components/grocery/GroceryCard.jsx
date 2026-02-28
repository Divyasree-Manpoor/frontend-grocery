import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateList, deleteList } from "../../services/groceryService";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

const GroceryCard = ({ list, refresh }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  /* ================================
     🔹 Save Recently Opened List
     (Frontend only feature)
  ================================= */
  const saveRecentList = () => {
    const existing =
      JSON.parse(localStorage.getItem("recentLists")) || [];

    const filtered = existing.filter(
      (item) => item.id !== list.id
    );

    const updated = [list, ...filtered].slice(0, 5);

    localStorage.setItem(
      "recentLists",
      JSON.stringify(updated)
    );

    localStorage.setItem(
      "lastOpenedList",
      JSON.stringify(list)
    );
  };

  /* ================================
     🔹 Open List
  ================================= */
  const handleOpen = () => {
    saveRecentList();
    navigate(`/grocery/${list.id}`);
  };

  /* ================================
     🔹 Update List (Backend)
  ================================= */
  const handleUpdate = async () => {
    if (!newTitle.trim()) {
      toast.warning("Title cannot be empty");
      return;
    }

    try {
      await updateList(list.id, { title: newTitle });

      toast.success("List updated successfully");

      setIsEditing(false);
      refresh();

      // 🔥 Update localStorage copy
      const stored =
        JSON.parse(localStorage.getItem("groceryLists")) || [];

      const updated = stored.map((item) =>
        item.id === list.id
          ? { ...item, title: newTitle }
          : item
      );

      localStorage.setItem(
        "groceryLists",
        JSON.stringify(updated)
      );
    } catch {
      toast.error("Failed to update list");
    }
  };

  /* ================================
     🔹 Delete List (Backend)
  ================================= */
  const handleDelete = async () => {
    try {
      await deleteList(list.id);

      toast.success("List deleted successfully");

      refresh();

      // 🔥 Remove from localStorage
      const stored =
        JSON.parse(localStorage.getItem("groceryLists")) || [];

      const updated = stored.filter(
        (item) => item.id !== list.id
      );

      localStorage.setItem(
        "groceryLists",
        JSON.stringify(updated)
      );
    } catch {
      toast.error("Failed to delete list");
    }
  };

  return (
    <div
      className="
        bg-white dark:bg-[#1f2937]
        border border-orange-300 dark:border-orange-500/30
        rounded-3xl
        p-8
        shadow-[0_25px_60px_rgba(191,54,12,0.25)]
        dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
        hover:shadow-[0_40px_100px_rgba(191,54,12,0.35)]
        dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        hover:-translate-y-1
        transition-all duration-500 ease-out
        flex justify-between items-center
      "
    >
      {/* ================= Title Section ================= */}
      <div className="flex-1">

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) =>
              setNewTitle(e.target.value)
            }
            className="
              w-full px-5 py-3
              border border-orange-300
              dark:border-orange-500/30
              rounded-2xl
              focus:ring-2 focus:ring-orange-400
              focus:border-orange-400
              outline-none
              transition-all duration-300
              bg-white dark:bg-[#111827]
              text-[#BF360C] dark:text-orange-300
            "
          />
        ) : (
          <h3 className="text-2xl font-bold tracking-tight text-[#BF360C] dark:text-orange-400">
            {list.title}
          </h3>
        )}

        <p className="text-sm mt-2 opacity-70 text-[#8D2B0B] dark:text-gray-400">
          Click Open to manage items
        </p>

      </div>

      {/* ================= Action Buttons ================= */}
      <div className="flex items-center gap-5">

        {/* Open */}
        <button
          onClick={handleOpen}
          className="
            bg-gradient-to-r from-[#F4511E] to-[#D84315]
            text-white
            px-6 py-3
            rounded-2xl
            shadow-md
            hover:shadow-lg
            hover:-translate-y-1
            active:scale-95
            transition-all duration-300
            font-semibold
            tracking-wide
          "
        >
          Open
        </button>

        {/* Edit / Save */}
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="
              bg-[#BF360C]
              text-white
              px-6 py-3
              rounded-2xl
              hover:bg-[#A9320A]
              hover:shadow-lg
              active:scale-95
              transition-all duration-300
              font-semibold
            "
          >
            Save
          </button>
        ) : (
          <Pencil
            onClick={() => setIsEditing(true)}
            className="
              text-[#F4511E]
              dark:text-orange-400
              cursor-pointer
              hover:scale-110
              hover:text-[#D84315]
              transition-all duration-300
            "
          />
        )}

        {/* Delete */}
        <Trash2
          onClick={handleDelete}
          className="
            text-[#C62828]
            dark:text-red-400
            cursor-pointer
            hover:scale-110
            hover:text-[#B71C1C]
            transition-all duration-300
          "
        />

      </div>
    </div>
  );
};

export default GroceryCard;