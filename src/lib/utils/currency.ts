/**
 * Standard Currency Formatter for NISA Boutique (India / INR)
 *
 * Formats numbers into Indian Rupee strings using Indian numbering system.
 * Example: 4500 -> "₹4,500"
 * Example: 125000 -> "₹1,25,000"
 */

export function formatINR(amount: number, options?: { allowZero?: boolean }): string {
  if (typeof amount !== "number" || isNaN(amount) || (!options?.allowZero && amount <= 0)) {
    if (options?.allowZero && amount === 0) {
      return "₹0";
    }
    return "Price on Request";
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
