"use client";

import Link from "next/link";
import type { RecentlyViewedMarket } from "@/types/market";

type RecentlyViewedProps = {
  markets: RecentlyViewedMarket[];
};

export function RecentlyViewed({ markets }: RecentlyViewedProps) {
  return (
    <section
      aria-label="Recently viewed markets"
      className="mb-4 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm backdrop-blur sm:mb-5 sm:p-4 dark:border-[#2b3139] dark:bg-[#1e2329]"
    >
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 sm:text-sm dark:text-[#9ca3af]">
        Recently viewed
      </h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {markets.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-[#9ca3af]">
            No recently viewed markets yet. Open a market details page to populate this section.
          </p>
        ) : (
          markets.map((market) => (
            <Link
              key={market.symbol}
              href={`/markets/${market.symbol}`}
              className="rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#f0b90b] hover:bg-amber-50 hover:text-amber-700 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#eaecef] dark:hover:border-[#f0b90b] dark:hover:bg-[#2b3139] dark:hover:text-[#f0b90b]"
            >
              {market.symbol}
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
