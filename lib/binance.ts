import type {
  BinanceApiError,
  Binance24hrTickerDTO,
  Market,
  MarketSymbol,
} from "@/types/market";
import { env } from "process";

export const BINANCE_REST_BASE_URL = env.BINANCE_REST_BASE_URL || "https://api.binance.com";
const TICKER_24H_PATH = "/api/v3/ticker/24hr";
const DEBUG_BINANCE_API_LOGS = env.DEBUG_BINANCE_API_LOGS !== "false";

export const DEFAULT_MARKET_SYMBOLS: MarketSymbol[] = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "TRXUSDT",
  "LINKUSDT",
  "AVAXUSDT",
];

function toNumber(value: string, fieldName: string): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value for "${fieldName}": ${value}`);
  }

  return parsed;
}

function normalizeSymbol(symbol: string): MarketSymbol {
  return symbol.trim().toUpperCase();
}

function isBinanceApiError(value: unknown): value is BinanceApiError {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.code === "number" && typeof candidate.msg === "string";
}

function mapTickerDtoToMarket(dto: Binance24hrTickerDTO): Market {
  return {
    symbol: normalizeSymbol(dto.symbol),
    price: toNumber(dto.lastPrice, "lastPrice"),
    priceChange24h: toNumber(dto.priceChange, "priceChange"),
    priceChangePercent24h: toNumber(dto.priceChangePercent, "priceChangePercent"),
    weightedAvgPrice24h: toNumber(dto.weightedAvgPrice, "weightedAvgPrice"),
    openPrice24h: toNumber(dto.openPrice, "openPrice"),
    highPrice24h: toNumber(dto.highPrice, "highPrice"),
    lowPrice24h: toNumber(dto.lowPrice, "lowPrice"),
    volume24h: toNumber(dto.volume, "volume"),
    quoteVolume24h: toNumber(dto.quoteVolume, "quoteVolume"),
    bidPrice: toNumber(dto.bidPrice, "bidPrice"),
    askPrice: toNumber(dto.askPrice, "askPrice"),
    tradesCount24h: dto.count,
    lastUpdated: dto.closeTime,
  };
}

function buildSymbolsQuery(symbols: MarketSymbol[]): string {
  return encodeURIComponent(JSON.stringify(symbols));
}

function buildTicker24hBySymbolsUrl(symbols: MarketSymbol[]): string {
  return `${BINANCE_REST_BASE_URL}${TICKER_24H_PATH}?symbols=${buildSymbolsQuery(symbols)}`;
}

function buildTicker24hBySymbolUrl(symbol: MarketSymbol): string {
  return `${BINANCE_REST_BASE_URL}${TICKER_24H_PATH}?symbol=${symbol}`;
}

function logBinanceApi(message: string, payload?: unknown) {
  if (!DEBUG_BINANCE_API_LOGS) {
    return;
  }

  if (payload === undefined) {
    // eslint-disable-next-line no-console
    console.log(`[binance-api] ${message}`);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`[binance-api] ${message}`, payload);
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const canParseJson = contentType.includes("application/json");
  const payload = canParseJson ? ((await response.json()) as unknown) : await response.text();

  if (!response.ok) {
    const errorDetails = isBinanceApiError(payload)
      ? `${payload.code} ${payload.msg}`
      : typeof payload === "string"
        ? payload
        : JSON.stringify(payload);

    throw new Error(
      `Binance request failed (${response.status} ${response.statusText}): ${errorDetails}`,
    );
  }

  return payload as T;
}

function normalizeSymbols(symbols: MarketSymbol[]): MarketSymbol[] {
  return [...new Set(symbols.map(normalizeSymbol))];
}

export async function fetchMarkets24h(
  symbols: MarketSymbol[] = DEFAULT_MARKET_SYMBOLS,
  signal?: AbortSignal,
): Promise<Market[]> {
  const normalizedSymbols = normalizeSymbols(symbols);

  if (normalizedSymbols.length === 0) {
    return [];
  }

  const url = buildTicker24hBySymbolsUrl(normalizedSymbols);
  logBinanceApi("fetchMarkets24h request", { url, symbols: normalizedSymbols });
  const dtos = await fetchJson<Binance24hrTickerDTO[]>(url, signal);
  logBinanceApi("fetchMarkets24h response summary", {
    total: dtos.length,
    sample: dtos.slice(0, 3),
  });
  const marketBySymbol = new Map(
    dtos.map((dto) => {
      const market = mapTickerDtoToMarket(dto);
      return [market.symbol, market] as const;
    }),
  );

  return normalizedSymbols
    .map((symbol) => marketBySymbol.get(symbol))
    .filter((market): market is Market => Boolean(market));
}

export async function fetchMarket24h(
  symbol: MarketSymbol,
  signal?: AbortSignal,
): Promise<Market> {
  const normalizedSymbol = normalizeSymbol(symbol);
  const url = buildTicker24hBySymbolUrl(normalizedSymbol);
  logBinanceApi("fetchMarket24h request", { url, symbol: normalizedSymbol });
  const dto = await fetchJson<Binance24hrTickerDTO>(url, signal);
  logBinanceApi("fetchMarket24h response", dto);

  return mapTickerDtoToMarket(dto);
}
