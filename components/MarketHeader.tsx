type MarketHeaderProps = {
  title: string;
  subtitle: string;
};

export function MarketHeader({ title, subtitle }: MarketHeaderProps) {
  return (
    <header className="mb-7 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6 dark:border-[#2b3139] dark:bg-[#1e2329]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-[#f0b90b]">
        Markets Overview
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-[#f5f5f5]">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-[#9ca3af]">
        {subtitle}
      </p>
    </header>
  );
}
