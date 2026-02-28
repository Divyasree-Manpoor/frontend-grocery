import PantryCard from "./PantryCard";

const PantryList = ({ items, onDelete, onUpdate }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center p-12 text-gray-500 dark:text-gray-400">
        No pantry items available.
      </div>
    );
  }

  /* ===============================
     SMART SORTING
     Expired → Expiring Soon → Low Stock → Fresh
  =============================== */

  const today = new Date();

  const sortedItems = [...items].sort((a, b) => {
    const getPriority = (item) => {
      let priority = 4; // default fresh

      if (item.expiry_date) {
        const expiry = new Date(item.expiry_date);
        const diffDays =
          (expiry - today) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) priority = 1; // expired
        else if (diffDays <= 3) priority = 2; // expiring soon
      }

      if (Number(item.quantity) <= 2) {
        priority = Math.min(priority, 3); // low stock
      }

      return priority;
    };

    return getPriority(a) - getPriority(b);
  });

  return (
    <div
      className="
        grid gap-6
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        max-w-7xl mx-auto
      "
    >
      {sortedItems.map((item) => (
        <PantryCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default PantryList;