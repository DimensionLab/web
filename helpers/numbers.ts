
export function toUsd(price: number): string {
    if (!price) return "$0.00";
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  
  export function centsToUsd(cents: number): string {
    if (!cents) return "$0.00";
    return (cents === 0 ? 0 : cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  