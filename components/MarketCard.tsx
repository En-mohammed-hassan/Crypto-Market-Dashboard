import Link from "next/link";
import type { Market } from "@/types/market";
import { FavoriteButton } from "@/components/FavoriteButton";
import { PriceDisplay } from "@/components/PriceDisplay";

type MarketCardProps = {
  market: Market;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
};

export function MarketCard({
  market,
  isFavorite,
  onToggleFavorite,
}: MarketCardProps) {
  const isPositive = market.priceChangePercent24h >= 0;

  return (
    <article className="group rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg hover:ring-amber-100 sm:p-5 dark:border-[#2b3139] dark:bg-[#1e2329] dark:hover:border-[#f0b90b]/50 dark:hover:ring-[#f0b90b]/20">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold tracking-wide text-slate-500 sm:text-sm dark:text-[#9ca3af]">
          Symbol
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-1 text-[11px] font-semibold sm:text-xs ${
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {market.priceChangePercent24h.toFixed(2)}%
          </span>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(market.symbol)}
          />
        </div>
      </div>

      <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-[#f5f5f5]">
        {market.symbol}
      </h3>

      <p className="mt-3 text-xs text-slate-500 sm:text-sm dark:text-[#9ca3af]">Latest price</p>
      <PriceDisplay
        value={market.price}
        className="mt-1 block text-lg font-semibold text-slate-900 sm:text-xl dark:text-[#f5f5f5]"
      />

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-[#9ca3af]">24h performance</span>
        <Link
          href={`/markets/${market.symbol}`}
          className="rounded-md px-3 py-2 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-50 hover:text-amber-800 dark:text-[#f0b90b] dark:hover:bg-[#2b3139] dark:hover:text-[#f0b90b]"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
