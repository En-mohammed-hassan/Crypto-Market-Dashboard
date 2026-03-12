import { fetchMarkets24h } from "@/lib/binance";
import { MarketGrid } from "@/components/MarketGrid";
import { MarketHeader } from "@/components/MarketHeader";

export default async function MarketsPage() {
  const markets = await fetchMarkets24h();

  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <MarketHeader
          title="Spot Markets"
          subtitle="Track top crypto trading pairs with real-time market data, favorites, and fast symbol search."
        />

        <MarketGrid markets={markets} />
      </div>
    </main>
  );
}
