"use client";

import { useEffect } from "react";
import { useWebSocketTicker } from "@/hooks/useWebSocketTicker";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { PriceDisplay } from "@/components/PriceDisplay";
import { useRecentMarkets } from "@/hooks/useRecentMarkets";
import type { Market } from "@/types/market";
import { formatInteger, formatPercentChange, formatTimestamp } from "@/lib/formatters";

type MarketDetailsLiveProps = {
  market: Market;
};

export function MarketDetailsLive({ market }: MarketDetailsLiveProps) {
  const { addRecentMarket } = useRecentMarkets();
  const { price, priceChangePercent24h, timestamp, connectionStatus, error } =
    useWebSocketTicker(market.symbol, {
      initialPrice: market.price,
      initialPriceChangePercent24h: market.priceChangePercent24h,
      initialTimestamp: market.lastUpdated,
    });

  useEffect(() => {
    addRecentMarket(market.symbol);
  }, [addRecentMarket, market.symbol]);

  const resolvedPrice = price ?? market.price;
  const resolvedPriceChangePercent24h = priceChangePercent24h ?? market.priceChangePercent24h;
  const resolvedTimestamp = timestamp ?? market.lastUpdated;
  const isPositive = resolvedPriceChangePercent24h >= 0;

  return (
    <div className="mt-6 sm:mt-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2b3139] dark:bg-[#0b0e11] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-[#9ca3af]">
              Live Market Price
            </p>
            <PriceDisplay
              value={resolvedPrice}
              className="mt-1 block text-4xl font-black tracking-tight text-slate-900 dark:text-[#f5f5f5] sm:text-5xl"
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-[#9ca3af]">
              Last update: {formatTimestamp(resolvedTimestamp)}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-end">
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                isPositive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
              }`}
            >
              {formatPercentChange(resolvedPriceChangePercent24h)}
            </span>
            <ConnectionStatus status={connectionStatus} error={error} className="mt-0" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#11151b]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#9ca3af] sm:text-xs">
            Open Price (24h)
          </p>
          <PriceDisplay
            value={market.openPrice24h}
            enableBlink={false}
            className="mt-2 block text-lg font-bold text-slate-900 dark:text-[#f5f5f5]"
          />
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#11151b]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#9ca3af] sm:text-xs">
            24h Range
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-[#eaecef]">
            High:{" "}
            <PriceDisplay value={market.highPrice24h} enableBlink={false} className="font-semibold" />
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-[#eaecef]">
            Low:{" "}
            <PriceDisplay value={market.lowPrice24h} enableBlink={false} className="font-semibold" />
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#11151b]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#9ca3af] sm:text-xs">
            Weighted Average
          </p>
          <PriceDisplay
            value={market.weightedAvgPrice24h}
            enableBlink={false}
            className="mt-2 block text-lg font-bold text-slate-900 dark:text-[#f5f5f5]"
          />
        </article>
      </section>

      <section className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#11151b]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#9ca3af] sm:text-xs">
            Volume & Activity
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">Base Volume (24h)</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                {formatInteger(market.volume24h)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">Quote Volume (24h)</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                {formatInteger(market.quoteVolume24h)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">Trades Count (24h)</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                {formatInteger(market.tradesCount24h)}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#11151b]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#9ca3af] sm:text-xs">
            Order Book Snapshot
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">Bid Price</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                <PriceDisplay value={market.bidPrice} enableBlink={false} className="font-semibold" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">Ask Price</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                <PriceDisplay value={market.askPrice} enableBlink={false} className="font-semibold" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500 dark:text-[#9ca3af]">24h Price Change</dt>
              <dd className="font-semibold text-slate-900 dark:text-[#f5f5f5]">
                <PriceDisplay value={market.priceChange24h} enableBlink={false} className="font-semibold" />
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  );
}
