/**
 * Global TypeScript type definitions
 */

export type TokenStatus = "new" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  marketCap: number;
  volume: number;
  price: number;
  priceChange24h: number;
  holders: number;
  transactions: number;
  fee: number;
  status: TokenStatus;
  age: string; // e.g., "4m", "17s", "1y"
  address: string;
  bonding?: number; // Percentage for final stretch tokens
  metrics: TokenMetrics;
}

export interface TokenMetrics {
  holdersPercent: number;
  liquidityPercent: number;
  timePercent: number;
  targetPercent: number;
  gearPercent: number;
  holdersGearPercent: number;
}

export interface TokenColumn {
  id: TokenStatus;
  title: string;
  tokens: Token[];
  filter?: string;
  sortBy?: SortOption;
}

export type SortOption =
  | "marketCap"
  | "volume"
  | "price"
  | "holders"
  | "transactions"
  | "age";

export type SortDirection = "asc" | "desc";

export interface WebSocketMessage {
  type: "price_update" | "token_add" | "token_remove" | "connection_status";
  data: unknown;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  marketCap: number;
  volume: number;
  timestamp: number;
}

