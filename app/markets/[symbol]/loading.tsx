import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function MarketDetailsLoading() {
  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <LoadingSkeleton className="mb-6 h-7 w-36" />

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329] sm:p-8">
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton className="mt-3 h-10 w-52" />
          <LoadingSkeleton className="mt-6 h-20 w-full" />

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#0b0e11]">
              <LoadingSkeleton className="h-3 w-16" />
              <LoadingSkeleton className="mt-3 h-8 w-24" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#0b0e11]">
              <LoadingSkeleton className="h-3 w-20" />
              <LoadingSkeleton className="mt-3 h-8 w-24" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#0b0e11]">
              <LoadingSkeleton className="h-3 w-24" />
              <LoadingSkeleton className="mt-3 h-5 w-32" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#0b0e11]">
              <LoadingSkeleton className="h-3 w-28" />
              <LoadingSkeleton className="mt-3 h-4 w-full" />
              <LoadingSkeleton className="mt-2 h-4 w-full" />
              <LoadingSkeleton className="mt-2 h-4 w-3/4" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2b3139] dark:bg-[#0b0e11]">
              <LoadingSkeleton className="h-3 w-28" />
              <LoadingSkeleton className="mt-3 h-4 w-full" />
              <LoadingSkeleton className="mt-2 h-4 w-full" />
              <LoadingSkeleton className="mt-2 h-4 w-3/4" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
