import SharedAccessBadge from "./SharedAccessBadge";

const SharedListHeader = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-200 p-8 flex flex-col md:flex-row justify-between items-center gap-6">

      <div>
        <h2 className="text-3xl font-bold text-orange-600">
          Shared Grocery List
        </h2>
        <p className="text-gray-500 mt-2">
          View-only access
        </p>
      </div>

      <SharedAccessBadge />

    </div>
  );
};

export default SharedListHeader;