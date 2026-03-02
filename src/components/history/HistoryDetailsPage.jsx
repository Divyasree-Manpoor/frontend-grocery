import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistoryById } from "../../services/historyService";
import Loader from "../../components/common/Loader";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const HistoryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getHistoryById(id);
      setRecord(res.data);
    } catch {
      toast.error("Failed to load history details");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!record?.items) return null;

    const itemCount = record.items.length;
    const totalQty = record.items.reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0
    );

    const savingsPercent =
      record.total_amount > 0
        ? Math.round(
            (Number(record.discount_amount || 0) /
              Number(record.total_amount)) *
              100
          )
        : 0;

    return { itemCount, totalQty, savingsPercent };
  }, [record]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );

  if (!record)
    return (
      <div className="text-center py-20">
        Record not found.
      </div>
    );

  const formattedTotal = formatCurrency(record.total_amount);
  const formattedDiscount = formatCurrency(
    record.discount_amount || 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br 
      from-orange-100 via-amber-100 to-orange-200
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      px-4 sm:px-8 py-10">

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900
        rounded-3xl shadow-2xl
        border border-orange-200 dark:border-gray-700
        p-6 sm:p-10 space-y-10 relative overflow-hidden">

        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 text-orange-600 hover:underline"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl transition"
            >
              <Download size={16} /> Print
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-400">
            Shopping Receipt
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>
              {new Date(record.completed_at).toLocaleString("en-IN")}
            </span>

            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CheckCircle2 size={14} />
              Completed
            </span>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 bg-orange-50 dark:bg-gray-800 p-6 rounded-2xl text-center text-sm">
            <div>
              <p className="text-gray-500">Items</p>
              <p className="font-bold text-lg">{stats.itemCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Quantity</p>
              <p className="font-bold text-lg">{stats.totalQty}</p>
            </div>
            <div>
              <p className="text-gray-500">Savings</p>
              <p className="font-bold text-lg text-green-600">
                {stats.savingsPercent}%
              </p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="space-y-4">
          {record.items?.map((item) => {
            const total =
              Number(item.price || 0) *
              Number(item.quantity || 1);

            return (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white capitalize">
                    {item.item_name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>

                <p className="font-semibold text-orange-600">
                  {formatCurrency(total)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="border-t pt-6 space-y-4 text-sm">

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600 font-medium">
              - {formattedDiscount}
            </span>
          </div>

          <div className="flex justify-between text-xl font-bold text-orange-700 dark:text-orange-400">
            <span>Total Paid</span>
            <span>{formattedTotal}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HistoryDetailsPage;