import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBillById } from "../../services/groceryService";
import Loader from "../../components/common/Loader";

const HistoryDetails = () => {

  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBill();
  }, [id]);

  const fetchBill = async () => {
    try {

      const res = await getBillById(id);

      setBill(res.data);

    } catch (err) {
      console.log("Failed to fetch bill");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!bill) return <p>No bill found</p>;

  return (
    <div className="p-10">

      <h2 className="text-2xl font-bold">
        Shopping Bill
      </h2>

      <p>Bill ID: {bill.id}</p>

      <p>Subtotal: ₹{bill.subtotal}</p>

      <p>Discount: ₹{bill.discount_amount}</p>

      <p>Total: ₹{bill.total_amount}</p>

      <p>Date: {new Date(bill.completed_at).toLocaleDateString()}</p>

    </div>
  );
};

export default HistoryDetails;