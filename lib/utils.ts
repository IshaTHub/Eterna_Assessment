import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getPriceChangeColor(change: number): string {
  if (change > 0) return "text-green-500";
  if (change < 0) return "text-red-500";
  return "text-gray-400";
}

export function sortTokens(
  tokens: any[],
  field: string,
  direction: "asc" | "desc"
): any[] {
  const sorted = [...tokens].sort((a, b) => {
    const fieldMap: Record<string, keyof typeof a> = {
      volume: "volume",
      marketCap: "marketCap",
      fees: "fees",
      transactions: "transactions",
    };
    const key = fieldMap[field];
    if (!key) return 0;
    const aVal = a[key] as number;
    const bVal = b[key] as number;
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  });
  return sorted;
}
