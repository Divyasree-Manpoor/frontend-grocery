const calculateBudget = (items = []) => {
  return items.reduce((total, item) => {
    return total + Number(item.price || 0);
  }, 0);
};

export default calculateBudget;