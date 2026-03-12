import { fetchMarkets24h } from "@/lib/binance";
import { MarketGrid } from "@/components/MarketGrid";
import { MarketHeader } from "@/components/MarketHeader";

export default async function MarketsPage() {
  let markets = [] as Awaited<ReturnType<typeof fetchMarkets24h>>;
  let loadError: string | null = null;

  try {
    markets = await fetchMarkets24h();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load markets";
  }

  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <MarketHeader
          title="Spot Markets"
          subtitle="Track top crypto trading pairs with real-time market data, favorites, and fast symbol search."
        />

        {loadError ? (
          <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
            Live market data is temporarily unavailable on this deploy region. Please refresh in a
            moment.
          </div>
        ) : null}

        <MarketGrid markets={markets} />
      </div>
    </main>
  );
}
