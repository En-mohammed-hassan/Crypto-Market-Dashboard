"use client";

import { useCallback, useEffect, useState } from "react";
import type { MarketSymbol } from "@/types/market";

const FAVORITES_STORAGE_KEY = "rw.favoriteMarkets";

function normalizeSymbol(symbol: string): MarketSymbol {
  return symbol.trim().toUpperCase();
}

function parseStoredFavorites(value: string | null): MarketSymbol[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return [...new Set(parsed.filter((item): item is string => typeof item === "string"))]
      .map(normalizeSymbol);
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteSymbols, setFavoriteSymbols] = useState<MarketSymbol[]>([]);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    setFavoriteSymbols(parseStoredFavorites(stored));
    setIsStorageHydrated(true);
  }, []);

  useEffect(() => {
    if (!isStorageHydrated) {
      return;
    }

    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteSymbols),
    );
  }, [favoriteSymbols, isStorageHydrated]);

  const isFavorite = useCallback(
    (symbol: MarketSymbol) =>
      favoriteSymbols.includes(normalizeSymbol(symbol)),
    [favoriteSymbols],
  );

  const toggleFavorite = useCallback((symbol: MarketSymbol) => {
    const normalized = normalizeSymbol(symbol);

    setFavoriteSymbols((prev) =>
      prev.includes(normalized)
        ? prev.filter((item) => item !== normalized)
        : [...prev, normalized],
    );
  }, []);

  return {
    favoriteSymbols,
    isFavorite,
    toggleFavorite,
  };
}
