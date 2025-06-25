export const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "N/A VNĐ"; // Handle cases where amount is not a valid number
  }
  return amount.toLocaleString("vi-VN") + " VNĐ";
};
