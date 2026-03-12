import type { MarketSymbol } from "@/types/market";

export const BINANCE_WS_BASE_URL = "wss://stream.binance.com:9443/ws";
export const BINANCE_WS_COMBINED_BASE_URL =
  "wss://stream.binance.com:9443/stream?streams=";

export function normalizeWsSymbol(symbol: MarketSymbol): MarketSymbol {
  return symbol.trim().toLowerCase();
}

export function buildTickerStreamUrl(symbol: MarketSymbol): string {
  return `${BINANCE_WS_BASE_URL}/${normalizeWsSymbol(symbol)}@ticker`;
}

export function buildMultiTickerStreamUrl(symbols: MarketSymbol[]): string {
  const normalized = [...new Set(symbols.map(normalizeWsSymbol))];
  const streams = normalized.map((symbol) => `${symbol}@ticker`).join("/");
  return `${BINANCE_WS_COMBINED_BASE_URL}${streams}`;
}

export function safeCloseWebSocket(socket: WebSocket | null) {
  if (!socket) {
    return;
  }

  if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
    socket.close();
  }
}
