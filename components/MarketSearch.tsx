"use client";

import type { RefObject } from "react";

type MarketSearchProps = {
  value: string;
  onChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export function MarketSearch({ value, onChange, inputRef }: MarketSearchProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="market-search"
        className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-[#9ca3af]"
      >
        Search Pair
      </label>

      <div className="group relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-[#6b7280] dark:group-focus-within:text-[#f0b90b]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="m20 20-3-3" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>

        <input
          ref={inputRef}
          id="market-search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search symbol (BTCUSDT)"
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#eaecef] dark:placeholder:text-[#6b7280] dark:focus:border-[#f0b90b] dark:focus:ring-[#f0b90b]/30"
        />
      </div>
    </div>
  );
}
