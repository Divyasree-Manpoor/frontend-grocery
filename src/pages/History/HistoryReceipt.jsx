import { Download, Printer } from "lucide-react";

const HistoryReceipt = ({ record }) => {
  if (!record) return null;

  const items = record.items || [];

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  const discount = Number(record.discount_amount) || 0;
  const finalTotal = Number(record.total_amount) || 0;

  const tax = 0; // keep 0 or integrate later
  const savingsPercent =
    subtotal > 0
      ? ((discount / subtotal) * 100).toFixed(1)
      : 0;

  const formattedDate = record.completed_at
    ? new Date(record.completed_at).toLocaleString("en-IN")
    : "—";

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-orange-200 dark:border-gray-700 p-6 md:p-12 space-y-10 print:shadow-none print:border-none print:p-0">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6 border-gray-200 dark:border-gray-700">

        <div>
          <h1 className="text-3xl font-extrabold text-orange-600">
            GroceryGo
          </h1>
          <p className="text-sm text-gray-500">
            Smart Grocery. Smarter Savings.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Invoice ID: #{record.id}
          </p>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>Date: {formattedDate}</p>
          <p>Payment: UPI / Card</p>
          <p>Total Items: {items.length}</p>
        </div>

        <div className="flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl transition"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-xl transition"
          >
            <Download size={18} />
            Save PDF
          </button>
        </div>
      </div>

      {/* ================= ITEMS TABLE ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-300">
          Items Purchased
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="py-3">Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                const itemTotal =
                  (Number(item.price) || 0) *
                  (Number(item.quantity) || 1);

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-3 capitalize font-medium">
                      {item.item_name}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>
                      {formatCurrency(item.price)}
                    </td>
                    <td className="text-right font-semibold text-orange-600">
                      {formatCurrency(itemTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="border-t pt-8 border-gray-200 dark:border-gray-700 space-y-4 text-sm md:text-base">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>
            Discount ({savingsPercent}%)
          </span>
          <span>
            - {formatCurrency(discount)}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-xl text-orange-600 border-t pt-4">
          <span>Total Paid</span>
          <span>
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      {/* ================= SAVINGS HIGHLIGHT ================= */}
      {discount > 0 && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-xl text-center font-semibold">
          🎉 You saved {formatCurrency(discount)} on this purchase!
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="border-t pt-6 text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
        <p>Thank you for shopping with GroceryGo 🛒</p>
        <p>This is a system generated invoice.</p>
        <p>For support contact: support@grocerygo.com</p>
      </div>

    </div>
  );
};

export default HistoryReceipt;