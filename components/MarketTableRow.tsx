"use client";

import type { KeyboardEvent } from "react";
import type { Market } from "@/types/market";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CryptoIcon } from "@/components/CryptoIcon";
import { PriceDisplay } from "@/components/PriceDisplay";
import { formatCompactNumber, formatPercentChange } from "@/lib/formatters";

type MarketTableRowProps = {
  market: Market;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
  onOpenDetails: (symbol: string) => void;
};

function getBaseAsset(symbol: string) {
  if (symbol.endsWith("USDT")) {
    return symbol.replace("USDT", "");
  }

  return symbol;
}

export function MarketTableRow({
  market,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: MarketTableRowProps) {
  const baseAsset = getBaseAsset(market.symbol);
  const isPositive = market.priceChangePercent24h >= 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenDetails(market.symbol);
    }
  };

  return (
    <div
      className="grid cursor-pointer grid-cols-[1.8fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-3 border-b border-slate-200 px-3 py-3 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:border-[#2b3139] dark:hover:bg-[#2b3139] sm:px-5"
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${market.symbol}`}
      onClick={() => onOpenDetails(market.symbol)}
      onKeyDown={handleKeyDown}
    >
      <div className="flex min-w-0 items-center gap-2">
        <CryptoIcon symbol={baseAsset} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-[#f5f5f5]">
            {baseAsset}
            <span className="ml-1 text-xs font-medium text-slate-500 dark:text-[#9ca3af]">
              /USDT
            </span>
          </p>
          <p className="truncate text-[11px] text-slate-500 dark:text-[#9ca3af]">
            {market.symbol}
          </p>
        </div>
      </div>

      <div className="text-right">
        <PriceDisplay
          value={market.price}
          className="text-sm font-semibold text-slate-900 dark:text-[#f5f5f5]"
        />
      </div>

      <div
        className={`text-right text-sm font-semibold ${
          isPositive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {formatPercentChange(market.priceChangePercent24h)}
      </div>

      <div className="text-right">
        <PriceDisplay
          value={market.highPrice24h}
          enableBlink={false}
          className="text-sm font-medium text-slate-700 dark:text-[#eaecef]"
        />
      </div>

      <div className="text-right">
        <PriceDisplay
          value={market.lowPrice24h}
          enableBlink={false}
          className="text-sm font-medium text-slate-700 dark:text-[#eaecef]"
        />
      </div>

      <div className="text-right text-sm font-medium text-slate-700 dark:text-[#eaecef]">
        {formatCompactNumber(market.quoteVolume24h)}
      </div>

      <div
        className="flex justify-center"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(market.symbol)}
        />
      </div>
    </div>
  );
}
