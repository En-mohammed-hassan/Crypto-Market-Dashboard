import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-10 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/95 p-6 text-center shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-[#f0b90b]">
          404 - Page not found
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#f5f5f5] sm:text-3xl">
          The page you are looking for does not exist.
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-[#9ca3af]">
          It may have been moved, deleted, or the URL may be incorrect.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/markets"
            className="rounded-lg bg-[#f0b90b] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffd24d]"
          >
            Go to markets
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#eaecef] dark:hover:bg-[#2b3139]"
          >
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
