/**
 * Standard Currency Formatter for NISA Boutique (India / INR)
 *
 * Formats numbers into Indian Rupee strings using Indian numbering system.
 * Example: 4500 -> "₹4,500"
 * Example: 125000 -> "₹1,25,000"
 */

export function formatINR(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "₹0";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

export const formatPrice = formatINR;
