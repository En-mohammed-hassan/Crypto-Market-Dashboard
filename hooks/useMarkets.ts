"use client";

import { useMemo, useState } from "react";
import type { Market, MarketSortOption, MarketSymbol } from "@/types/market";

type UseMarketsParams = {
  initialMarkets: Market[];
  favoriteSymbols?: MarketSymbol[];
};

function sortMarkets(
  markets: Market[],
  sortBy: MarketSortOption,
  favoriteSet: Set<MarketSymbol>,
) {
  const sorted = [...markets];

  if (sortBy === "alphabetical") {
    return sorted.sort((a, b) => a.symbol.localeCompare(b.symbol));
  }

  if (sortBy === "highestPrice") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "highest24hChange") {
    return sorted.sort((a, b) => b.priceChangePercent24h - a.priceChangePercent24h);
  }

  return sorted.sort((a, b) => {
    const aFavoriteScore = favoriteSet.has(a.symbol) ? 1 : 0;
    const bFavoriteScore = favoriteSet.has(b.symbol) ? 1 : 0;

    if (aFavoriteScore !== bFavoriteScore) {
      return bFavoriteScore - aFavoriteScore;
    }

    return a.symbol.localeCompare(b.symbol);
  });
}

export function useMarkets({
  initialMarkets,
  favoriteSymbols = [],
}: UseMarketsParams) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<MarketSortOption>("favorites");

  const filteredMarkets = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toUpperCase();
    const matchedMarkets =
      !normalizedQuery
        ? initialMarkets
        : initialMarkets.filter((market) => market.symbol.includes(normalizedQuery));
    const favoriteSet = new Set(favoriteSymbols.map((symbol) => symbol.toUpperCase()));

    return sortMarkets(matchedMarkets, sortBy, favoriteSet);
  }, [initialMarkets, favoriteSymbols, searchQuery, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredMarkets,
  };
}
