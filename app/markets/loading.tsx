import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function MarketsLoading() {
  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329] sm:p-6">
            <LoadingSkeleton className="h-4 w-40" />
            <LoadingSkeleton className="mt-3 h-10 w-56" />
            <LoadingSkeleton className="mt-3 h-4 w-80" />
          </div>
        </header>

        <section aria-label="Loading markets">
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <LoadingSkeleton className="h-20 w-full" />
            <LoadingSkeleton className="h-20 w-full" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329]">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_1fr_auto] gap-3 border-b border-slate-200 px-3 py-3 dark:border-[#2b3139] sm:px-5">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <LoadingSkeleton key={`head-${idx}`} className="h-3 w-full" />
                  ))}
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`market-skeleton-${index}`}
                    className="grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-3 border-b border-slate-200 px-3 py-3 dark:border-[#2b3139] sm:px-5"
                  >
                    <LoadingSkeleton className="h-6 w-full max-w-40" />
                    <LoadingSkeleton className="h-5 w-24 justify-self-end" />
                    <LoadingSkeleton className="h-5 w-20 justify-self-end" />
                    <LoadingSkeleton className="h-5 w-24 justify-self-end" />
                    <LoadingSkeleton className="h-5 w-24 justify-self-end" />
                    <LoadingSkeleton className="h-5 w-20 justify-self-end" />
                    <LoadingSkeleton className="h-8 w-8 rounded-full justify-self-center" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
