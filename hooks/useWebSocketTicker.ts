"use client";

import { useEffect, useRef, useState } from "react";
import { buildTickerStreamUrl, safeCloseWebSocket } from "@/lib/websocket";
import type { BinanceWsTickerDTO, MarketSymbol, TickerStreamState } from "@/types/market";

const MAX_RECONNECT_DELAY_MS = 10_000;

type UseWebSocketTickerOptions = {
  initialPrice?: number;
  initialPriceChangePercent24h?: number;
  initialTimestamp?: number;
};

function isBinanceWsTickerDTO(value: unknown): value is BinanceWsTickerDTO {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.E === "number" &&
    typeof candidate.s === "string" &&
    typeof candidate.c === "string" &&
    typeof candidate.P === "string"
  );
}

function toNumber(value: string, field: string): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric field "${field}" in ticker message`);
  }

  return parsed;
}

export function useWebSocketTicker(
  symbol: MarketSymbol,
  options: UseWebSocketTickerOptions = {},
) {
  const [state, setState] = useState<TickerStreamState>({
    price: options.initialPrice ?? null,
    priceChangePercent24h: options.initialPriceChangePercent24h ?? null,
    timestamp: options.initialTimestamp ?? null,
    connectionStatus: "connecting",
    error: null,
  });

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
  const shouldReconnectRef = useRef(true);

  useEffect(() => {
    const normalizedSymbol = symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      setState((prev) => ({
        ...prev,
        connectionStatus: "disconnected",
        error: "Missing symbol",
      }));
      return;
    }

    shouldReconnectRef.current = true;

    const connect = (isReconnect: boolean) => {
      setState((prev) => ({
        ...prev,
        connectionStatus: isReconnect ? "reconnecting" : "connecting",
      }));

      const socket = new WebSocket(buildTickerStreamUrl(normalizedSymbol));
      socketRef.current = socket;

      socket.onopen = () => {
        reconnectAttemptRef.current = 0;
        setState((prev) => ({
          ...prev,
          connectionStatus: "connected",
          error: null,
        }));
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data) as unknown;

          if (!isBinanceWsTickerDTO(payload)) {
            return;
          }

          setState({
            price: toNumber(payload.c, "c"),
            priceChangePercent24h: toNumber(payload.P, "P"),
            timestamp: payload.E,
            connectionStatus: "connected",
            error: null,
          });
        } catch (error) {
          setState((prev) => ({
            ...prev,
            error: error instanceof Error ? error.message : "Failed to parse ticker event",
          }));
        }
      };

      socket.onerror = () => {
        setState((prev) => ({
          ...prev,
          error: "WebSocket connection error",
        }));
      };

      socket.onclose = () => {
        if (!shouldReconnectRef.current) {
          setState((prev) => ({
            ...prev,
            connectionStatus: "disconnected",
          }));
          return;
        }

        const attempt = reconnectAttemptRef.current + 1;
        reconnectAttemptRef.current = attempt;
        const delay = Math.min(1000 * 2 ** (attempt - 1), MAX_RECONNECT_DELAY_MS);

        reconnectTimerRef.current = setTimeout(() => connect(true), delay);
      };
    };

    connect(false);

    return () => {
      shouldReconnectRef.current = false;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }

      safeCloseWebSocket(socketRef.current);
      socketRef.current = null;

      setState((prev) => ({
        ...prev,
        connectionStatus: "disconnected",
      }));
    };
  }, [symbol]);

  return state;
}
