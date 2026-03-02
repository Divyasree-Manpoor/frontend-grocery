import GroceryListCard from "./GroceryListCard";
import EmptyState from "../common/EmptyState";

const GroceryList = ({ lists = [], refresh }) => {
  if (!lists.length) {
    return (
      <EmptyState
        title="No Grocery Lists"
        description="Create your first list to get started."
      />
    );
  }

  return (
    <div className="w-full">
      
      <div>
        Total Lists: {lists.length}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <GroceryListCard
            key={list.id}
            list={list}
            refresh={refresh}
          />
        ))}
      </div>

    </div>
  );
};

export default GroceryList;