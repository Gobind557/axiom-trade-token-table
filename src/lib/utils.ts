import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Token, SortOption, SortDirection } from "@/types";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency value with K/M/B suffixes
 */
export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Format number with K/M/B suffixes
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toString();
}

/**
 * Truncate address to show first 4 and last 4 characters
 */
export function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) {
    return address;
  }
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Sort tokens by a given option and direction
 */
export function sortTokens(
  tokens: Token[],
  sortBy: SortOption | null,
  direction: SortDirection
): Token[] {
  if (!sortBy) return tokens;

  const sorted = [...tokens].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sortBy) {
      case "marketCap":
        aValue = a.marketCap;
        bValue = b.marketCap;
        break;
      case "volume":
        aValue = a.volume;
        bValue = b.volume;
        break;
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "holders":
        aValue = a.holders;
        bValue = b.holders;
        break;
      case "transactions":
        aValue = a.transactions;
        bValue = b.transactions;
        break;
      case "age":
        // Parse age string (e.g., "2s", "4m", "1h", "1y")
        aValue = parseAge(a.age);
        bValue = parseAge(b.age);
        break;
      default:
        return 0;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sorted;
}

/**
 * Parse age string to seconds for sorting
 * Examples: "2s" -> 2, "4m" -> 240, "1h" -> 3600, "1y" -> 31536000
 */
function parseAge(age: string): number {
  const match = age.match(/^(\d+)([smhdwy])$/);
  if (!match || !match[1] || !match[2]) return 0;
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    y: 31536000,
  };
  
  return value * (multipliers[unit] || 1);
}

