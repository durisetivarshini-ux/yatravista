/**
 * Formats a number into Indian Rupee (INR) representation with the ₹ symbol.
 * Example: 4500 -> "₹4,500"
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "₹0";
  }
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Parses numeric input string into positive number
 */
export function parseAmount(val) {
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}
