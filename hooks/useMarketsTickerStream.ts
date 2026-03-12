"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildMultiTickerStreamUrl, safeCloseWebSocket } from "@/lib/websocket";
import type { BinanceWsTickerDTO, Market } from "@/types/market";

const MAX_RECONNECT_DELAY_MS = 10_000;

function isBinanceWsTickerDTO(value: unknown): value is BinanceWsTickerDTO {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.E === "number" &&
    typeof candidate.s === "string" &&
    typeof candidate.p === "string" &&
    typeof candidate.w === "string" &&
    typeof candidate.c === "string" &&
    typeof candidate.o === "string" &&
    typeof candidate.h === "string" &&
    typeof candidate.l === "string" &&
    typeof candidate.v === "string" &&
    typeof candidate.q === "string" &&
    typeof candidate.b === "string" &&
    typeof candidate.a === "string" &&
    typeof candidate.n === "number" &&
    typeof candidate.P === "string"
  );
}

function toNumber(value: string): number | null {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function extractTickerPayload(message: unknown): BinanceWsTickerDTO | null {
  if (!message || typeof message !== "object") {
    return null;
  }

  const candidate = message as Record<string, unknown>;
  const rawPayload = candidate.data ?? candidate;

  if (isBinanceWsTickerDTO(rawPayload)) {
    return rawPayload;
  }

  return null;
}

export function useMarketsTickerStream(initialMarkets: Market[]) {
  const [liveMarkets, setLiveMarkets] = useState<Market[]>(initialMarkets);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
  const shouldReconnectRef = useRef(true);

  const symbols = useMemo(
    () => initialMarkets.map((market) => market.symbol),
    [initialMarkets],
  );

  useEffect(() => {
    setLiveMarkets(initialMarkets);
  }, [initialMarkets]);

  useEffect(() => {
    if (symbols.length === 0) {
      return;
    }

    shouldReconnectRef.current = true;

    const connect = () => {
      const socket = new WebSocket(buildMultiTickerStreamUrl(symbols));
      socketRef.current = socket;

      socket.onopen = () => {
        reconnectAttemptRef.current = 0;
      };

      socket.onmessage = (event) => {
        let parsedMessage: unknown;

        try {
          parsedMessage = JSON.parse(event.data) as unknown;
        } catch {
          return;
        }

        const payload = extractTickerPayload(parsedMessage);

        if (!payload) {
          return;
        }

        const price = toNumber(payload.c);
        const priceChange = toNumber(payload.p);
        const change = toNumber(payload.P);
        const weightedAvgPrice24h = toNumber(payload.w);
        const openPrice24h = toNumber(payload.o);
        const highPrice24h = toNumber(payload.h);
        const lowPrice24h = toNumber(payload.l);
        const volume24h = toNumber(payload.v);
        const quoteVolume24h = toNumber(payload.q);
        const bidPrice = toNumber(payload.b);
        const askPrice = toNumber(payload.a);

        if (price === null || change === null) {
          return;
        }

        setLiveMarkets((prev) =>
          prev.map((market) =>
            market.symbol === payload.s
              ? {
                  ...market,
                  price,
                  priceChange24h: priceChange ?? market.priceChange24h,
                  priceChangePercent24h: change,
                  weightedAvgPrice24h: weightedAvgPrice24h ?? market.weightedAvgPrice24h,
                  openPrice24h: openPrice24h ?? market.openPrice24h,
                  highPrice24h: highPrice24h ?? market.highPrice24h,
                  lowPrice24h: lowPrice24h ?? market.lowPrice24h,
                  volume24h: volume24h ?? market.volume24h,
                  quoteVolume24h: quoteVolume24h ?? market.quoteVolume24h,
                  bidPrice: bidPrice ?? market.bidPrice,
                  askPrice: askPrice ?? market.askPrice,
                  tradesCount24h: payload.n,
                  lastUpdated: payload.E,
                }
              : market,
          ),
        );
      };

      socket.onclose = () => {
        if (!shouldReconnectRef.current) {
          return;
        }

        const attempt = reconnectAttemptRef.current + 1;
        reconnectAttemptRef.current = attempt;
        const delay = Math.min(1000 * 2 ** (attempt - 1), MAX_RECONNECT_DELAY_MS);

        reconnectTimerRef.current = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      shouldReconnectRef.current = false;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }

      safeCloseWebSocket(socketRef.current);
      socketRef.current = null;
    };
  }, [symbols]);

  return liveMarkets;
}
