"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "rw.theme";
type ThemeMode = "light" | "dark";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
      <path
        d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
      <path
        d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 1 0 11.2 11.2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme: ThemeMode = stored === "light" ? "light" : "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsMounted(true);
  }, []);

  const setThemeMode = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  const isLightActive = isMounted ? theme === "light" : false;
  const isDarkActive = isMounted ? theme === "dark" : true;

  return (
    <div
      role="group"
      aria-label="Theme toggle"
      className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-300 bg-white p-1 shadow-sm dark:border-[#2b3139] dark:bg-[#1e2329]"
    >
      <button
        type="button"
        onClick={() => setThemeMode("light")}
        aria-pressed={isLightActive}
        className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
          isLightActive
            ? "bg-[#f0b90b] text-black shadow-sm"
            : "text-slate-700 hover:bg-slate-100 dark:text-[#c7d0db] dark:hover:bg-[#2b3139]"
        }`}
      >
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
            isLightActive
              ? "bg-black/10 text-black"
              : "bg-slate-200 text-slate-700 dark:bg-[#11151b] dark:text-[#d6dde6]"
          }`}
          aria-hidden
        >
          <SunIcon />
        </span>
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={() => setThemeMode("dark")}
        aria-pressed={isDarkActive}
        className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
          isDarkActive
            ? "bg-[#f0b90b] text-black shadow-sm"
            : "text-slate-700 hover:bg-slate-100 dark:text-[#c7d0db] dark:hover:bg-[#2b3139]"
        }`}
      >
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
            isDarkActive
              ? "bg-black/10 text-black"
              : "bg-slate-200 text-slate-700 dark:bg-[#11151b] dark:text-[#d6dde6]"
          }`}
          aria-hidden
        >
          <MoonIcon />
        </span>
        <span>Dark</span>
      </button>
    </div>
  );
}
