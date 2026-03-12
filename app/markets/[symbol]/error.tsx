"use client";

import Link from "next/link";

type MarketDetailsErrorProps = {
  error: Error;
  reset: () => void;
};

export default function MarketDetailsError({
  error,
  reset,
}: MarketDetailsErrorProps) {
  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-10 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/95 p-6 text-center shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-[#f0b90b]">
          Failed to load market details
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#f5f5f5] sm:text-3xl">
          We could not fetch this market right now.
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-[#9ca3af]">
          {error.message || "Unknown error"}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[#f0b90b] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd24d]"
          >
            Try again
          </button>
          <Link
            href="/markets"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#eaecef] dark:hover:bg-[#2b3139]"
          >
            Back to markets
          </Link>
        </div>
      </div>
    </main>
  );
}
