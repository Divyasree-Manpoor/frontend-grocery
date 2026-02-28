const BudgetSummary = ({ total }) => {
  return (
    <div className="bg-card p-4 rounded-xl mb-6 shadow">
      <h3 className="font-semibold">
        Total Spending: ₹{total}
      </h3>
    </div>
  );
};

export default BudgetSummary;