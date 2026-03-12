export type MarketSymbol = string;

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export type MarketSortOption =
  | "favorites"
  | "alphabetical"
  | "highestPrice"
  | "highest24hChange";

export interface Market {
  symbol: MarketSymbol;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  weightedAvgPrice24h: number;
  openPrice24h: number;
  highPrice24h: number;
  lowPrice24h: number;
  volume24h: number;
  quoteVolume24h: number;
  bidPrice: number;
  askPrice: number;
  tradesCount24h: number;
  lastUpdated: number; // unix ms timestamp
}

export interface MarketListItem extends Market {
  isFavorite: boolean;
}

export interface MarketFilters {
  search: string;
  sortBy: MarketSortOption;
}

export interface MarketTicker {
  symbol: MarketSymbol;
  price: number;
  priceChangePercent24h: number;
  eventTime: number;
}

export interface Binance24hrTickerDTO {
  symbol: string;
  priceChange: string;
  lastPrice: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  bidPrice: string;
  askPrice: string;
  count: number;
  closeTime: number;
}

export interface BinanceWsTickerDTO {
  e: string;
  E: number;
  s: string;
  p: string;
  w: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  b: string;
  a: string;
  n: number;
  P: string;
}

export interface BinanceApiError {
  code: number;
  msg: string;
}

export interface TickerStreamState {
  price: number | null;
  priceChangePercent24h: number | null;
  timestamp: number | null;
  connectionStatus: ConnectionStatus;
  error: string | null;
}

export interface RecentlyViewedMarket {
  symbol: MarketSymbol;
  viewedAt: number; // unix ms timestamp
}
