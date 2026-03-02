const SharedListItems = ({ items, total }) => {
  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md border border-orange-200 p-6"
          >
            <h3 className="text-lg font-semibold text-orange-600 capitalize">
              {item.item_name}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {item.quantity} {item.unit} × ₹{item.price}
            </p>

            <p className="mt-3 font-bold text-gray-800">
              ₹
              {(
                (Number(item.price) || 0) *
                (Number(item.quantity) || 1)
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-orange-200 p-8 text-right">
        <p className="text-sm text-gray-500">
          Total Amount
        </p>
        <p className="text-3xl font-bold text-orange-600">
          ₹{total.toFixed(2)}
        </p>
      </div>

    </div>
  );
};

export default SharedListItems;