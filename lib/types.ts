export type TokenColumn = "newPairs" | "finalStretch" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  subtitle?: string;
  icon: string;
  volume: number;
  marketCap: number;
  fees: number;
  transactions: number;
  timeAgo: string;
  participants: number;
  votes: number;
  progress: string;
  percentages: PercentageData[];
  address: string;
  price: number;
  priceChange: number;
}

export interface PercentageData {
  value: number;
  timeframe?: string;
}

export interface TokenColumnData {
  id: TokenColumn;
  title: string;
  tokens: Token[];
}

export type SortField = "volume" | "marketCap" | "fees" | "transactions" | "time";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

