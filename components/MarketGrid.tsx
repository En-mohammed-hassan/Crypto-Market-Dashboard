"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Market } from "@/types/market";
import { MarketFilters } from "@/components/MarketFilters";
import { MarketSearch } from "@/components/MarketSearch";
import { MarketTableRow } from "@/components/MarketTableRow";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { useFavorites } from "@/hooks/useFavorites";
import { useMarkets } from "@/hooks/useMarkets";
import { useMarketsTickerStream } from "@/hooks/useMarketsTickerStream";
import { useRecentMarkets } from "@/hooks/useRecentMarkets";
import { formatPercentChange } from "@/lib/formatters";

type MarketGridProps = {
  markets: Market[];
};

function getMarketSummary(markets: Market[]) {
  const gainers = markets.filter((market) => market.priceChangePercent24h >= 0).length;
  const losers = markets.length - gainers;
  const avgChange =
    markets.length === 0
      ? 0
      : markets.reduce((acc, market) => acc + market.priceChangePercent24h, 0) /
        markets.length;

  return { gainers, losers, avgChange };
}

export function MarketGrid({ markets }: MarketGridProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const liveMarkets = useMarketsTickerStream(markets);
  const { favoriteSymbols, isFavorite, toggleFavorite } = useFavorites();
  const { recentMarkets } = useRecentMarkets();
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredMarkets } =
    useMarkets({
      initialMarkets: liveMarkets,
      favoriteSymbols,
    });
  const summary = getMarketSummary(filteredMarkets);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingContext =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTypingContext) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section aria-label="Markets">
      <RecentlyViewed markets={recentMarkets} />

      <div className="mb-4 rounded-2xl border border-slate-200/80 bg-linear-to-r from-white to-slate-50 p-3 shadow-sm backdrop-blur sm:mb-5 sm:p-4 dark:border-[#2b3139] dark:from-[#1e2329] dark:to-[#11151b]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-[#9ca3af]">
            Market Filters
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-[#9ca3af]">
            {filteredMarkets.length} pairs
          </p>
        </div>
        <p className="mb-3 text-[11px] text-slate-500 dark:text-[#9ca3af]">
          Tip: press <kbd className="rounded border border-slate-300 px-1 dark:border-[#2b3139]">/</kbd> to focus search.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MarketSearch
            value={searchQuery}
            onChange={setSearchQuery}
            inputRef={searchInputRef}
          />
          <MarketFilters sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            Gainers: {summary.gainers}
          </span>
          <span className="rounded-full border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
            Losers: {summary.losers}
          </span>
          <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#9ca3af]">
            Avg 24h: {formatPercentChange(summary.avgChange)}
          </span>
          <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
            Stream: Live
          </span>
        </div>
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-6 text-center text-sm text-slate-600 shadow-sm sm:p-8 dark:border-[#2b3139] dark:bg-[#1e2329] dark:text-[#9ca3af]">
          <p className="font-semibold text-slate-800 dark:text-[#eaecef]">
            No markets match your current filters.
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-[#9ca3af]">
            Try clearing your search or changing the sort option.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-4 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#eaecef] dark:hover:bg-[#2b3139]"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329]">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_1fr_auto] gap-3 border-b border-slate-200 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:border-[#2b3139] dark:text-[#9ca3af] sm:px-5">
                <span>Trading Pairs</span>
                <span className="text-right">Last Price</span>
                <span className="text-right">24h Change</span>
                <span className="text-right">24h High</span>
                <span className="text-right">24h Low</span>
                <span className="text-right">24h Volume</span>
                <span className="text-center">Favorite</span>
              </div>

              <div>
                {filteredMarkets.map((market) => {
                  return (
                    <MarketTableRow
                      key={market.symbol}
                      market={market}
                      isFavorite={isFavorite(market.symbol)}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetails={(symbol) => router.push(`/markets/${symbol}`)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
