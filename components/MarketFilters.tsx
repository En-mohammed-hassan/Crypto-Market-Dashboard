"use client";

import { useEffect, useRef, useState } from "react";
import type { MarketSortOption } from "@/types/market";

type MarketFiltersProps = {
  sortBy: MarketSortOption;
  onSortChange: (value: MarketSortOption) => void;
};

const SORT_OPTIONS: Array<{ label: string; value: MarketSortOption }> = [
  { label: "Favorites first", value: "favorites" },
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Highest price", value: "highestPrice" },
  { label: "Highest 24h change", value: "highest24hChange" },
];

export function MarketFilters({ sortBy, onSortChange }: MarketFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeOption =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    "Favorites first";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <label
        htmlFor="market-sort"
        className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-[#9ca3af]"
      >
        Sort Markets
      </label>

      <div ref={containerRef} className="group relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-slate-400 transition-colors group-focus-within:text-amber-500 dark:text-[#6b7280] dark:group-focus-within:text-[#f0b90b]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
            <path d="M7 6h10M5 12h14M9 18h6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <button
          id="market-sort"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Sort markets"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full rounded-xl border border-slate-300 bg-linear-to-b from-white to-slate-50 py-3.5 pl-10 pr-10 text-left text-sm font-semibold text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-200 dark:border-[#2b3139] dark:from-[#11151b] dark:to-[#0b0e11] dark:text-[#eaecef] dark:hover:border-[#3b4452] dark:focus-visible:border-[#f0b90b] dark:focus-visible:ring-[#f0b90b]/30"
        >
          <span className="truncate">{activeOption}</span>
        </button>
        <span
          className={`pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-slate-500 transition-all duration-150 dark:text-[#9ca3af] ${
            isOpen ? "translate-y-0.5 text-amber-500 dark:text-[#f0b90b]" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span>

        {isOpen ? (
          <div
            role="listbox"
            aria-label="Sort markets options"
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-[#2b3139] dark:bg-[#11151b]"
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === sortBy;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition ${
                    isActive
                      ? "bg-amber-50 font-semibold text-amber-800 dark:bg-[#3a2f0b] dark:text-[#f0b90b]"
                      : "text-slate-700 hover:bg-slate-100 dark:text-[#eaecef] dark:hover:bg-[#1e2329]"
                  }`}
                >
                  <span>{option.label}</span>
                  {isActive ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
