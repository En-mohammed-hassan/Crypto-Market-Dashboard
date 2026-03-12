import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMarket24h } from "@/lib/binance";
import { MarketDetailsLive } from "@/components/MarketDetailsLive";

type MarketDetailsPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function MarketDetailsPage({ params }: MarketDetailsPageProps) {
  const { symbol } = await params;
  const normalizedSymbol = symbol.trim().toUpperCase();

  if (!normalizedSymbol) {
    notFound();
  }

  try {
    const market = await fetchMarket24h(normalizedSymbol);

    return (
      <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 sm:mb-5">
            <Link
              href="/markets"
              className="inline-flex items-center rounded-lg border border-slate-400 bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:border-[#f0b90b] dark:bg-[#f0b90b] dark:text-black dark:hover:bg-[#ffd24d] dark:focus-visible:ring-[#f0b90b]"
            >
              {"<- Back to markets"}
            </Link>
          </div>

          <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm backdrop-blur sm:p-8 dark:border-[#2b3139] dark:bg-[#1e2329]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-[#f0b90b]">
              Market
            </p>
            <h1 className="mt-2 break-all text-2xl font-bold tracking-tight text-slate-900 dark:text-[#f5f5f5] sm:text-4xl">
              {market.symbol}
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#9ca3af]">
              Live ticker updates from Binance WebSocket stream.
            </p>

            <MarketDetailsLive market={market} />
          </section>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
