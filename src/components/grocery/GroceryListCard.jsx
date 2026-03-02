import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateList, deleteList } from "../../services/groceryService";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

const GroceryListCard = ({ list, refresh }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const items = list.items || [];

  const purchased = items.filter(i => i.purchased).length;
  const percent =
    items.length > 0
      ? Math.round((purchased / items.length) * 100)
      : 0;

  const estimatedTotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
      Number(item.price || 0),
    0
  );

  const handleUpdate = async () => {
    if (!newTitle.trim()) return;

    await updateList(list.id, { title: newTitle.trim() });
    toast.success("Updated");
    setIsEditing(false);
    refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this list?")) return;

    await deleteList(list.id);
    toast.success("Deleted");
    refresh();
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-3xl shadow-lg border border-orange-200 dark:border-gray-700 space-y-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border rounded-xl"
          />
        ) : (
          <h3 className="text-lg sm:text-xl font-bold text-orange-600 break-words">
            {list.title}
          </h3>
        )}

        {list.is_shared && (
          <span className="self-start sm:self-auto text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            Shared
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500 flex-wrap gap-2">
        <span>{items.length} Items</span>
        <span>₹{estimatedTotal.toFixed(2)}</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 break-words">
        Created: {new Date(list.created_at).toLocaleDateString()}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-3">

        <button
          onClick={() => navigate(`/grocery/${list.id}`)}
          className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-xl"
        >
          Open
        </button>

        <div className="flex justify-start sm:justify-end gap-4 items-center">
          {isEditing ? (
            <button onClick={handleUpdate}>Save</button>
          ) : (
            <Pencil
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
          <Trash2
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default GroceryListCard;