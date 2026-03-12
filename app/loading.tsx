import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function AppLoading() {
  return (
    <main className="min-h-[50vh] bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 px-3 py-6 dark:from-[#0b0e11] dark:via-[#131722] dark:to-[#0b0e11] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329] sm:p-6">
          <LoadingSkeleton className="h-6 w-44" />
          <LoadingSkeleton className="mt-3 h-4 w-72" />
        </div>
      </div>
    </main>
  );
}
