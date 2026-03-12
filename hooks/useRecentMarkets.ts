"use client";

import { useCallback, useEffect, useState } from "react";
import type { MarketSymbol, RecentlyViewedMarket } from "@/types/market";

const RECENT_MARKETS_STORAGE_KEY = "rw.recentMarkets";
const MAX_RECENT_MARKETS = 5;

function normalizeSymbol(symbol: string): MarketSymbol {
  return symbol.trim().toUpperCase();
}

function parseStoredRecentMarkets(value: string | null): RecentlyViewedMarket[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is { symbol: string; viewedAt: number } => {
        if (!item || typeof item !== "object") {
          return false;
        }

        const candidate = item as Record<string, unknown>;
        return (
          typeof candidate.symbol === "string" &&
          typeof candidate.viewedAt === "number"
        );
      })
      .map((item) => ({
        symbol: normalizeSymbol(item.symbol),
        viewedAt: item.viewedAt,
      }))
      .sort((a, b) => b.viewedAt - a.viewedAt)
      .slice(0, MAX_RECENT_MARKETS);
  } catch {
    return [];
  }
}

export function useRecentMarkets() {
  const [recentMarkets, setRecentMarkets] = useState<RecentlyViewedMarket[]>([]);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(RECENT_MARKETS_STORAGE_KEY);
    setRecentMarkets(parseStoredRecentMarkets(stored));
    setIsStorageHydrated(true);
  }, []);

  useEffect(() => {
    if (!isStorageHydrated) {
      return;
    }

    window.localStorage.setItem(
      RECENT_MARKETS_STORAGE_KEY,
      JSON.stringify(recentMarkets),
    );
  }, [recentMarkets, isStorageHydrated]);

  const addRecentMarket = useCallback((symbol: MarketSymbol) => {
    const normalizedSymbol = normalizeSymbol(symbol);
    const viewedAt = Date.now();

    setRecentMarkets((prev) => {
      const withoutCurrent = prev.filter((item) => item.symbol !== normalizedSymbol);
      return [{ symbol: normalizedSymbol, viewedAt }, ...withoutCurrent].slice(
        0,
        MAX_RECENT_MARKETS,
      );
    });
  }, []);

  return {
    recentMarkets,
    addRecentMarket,
  };
}
