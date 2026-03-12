import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-[#2b3139] dark:bg-[#0b0e11]/95">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
        <Link href="/markets" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#f0b90b] text-black">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 2 22 12 12 22 2 12 12 2Zm0 4.2L6.2 12 12 17.8 17.8 12 12 6.2Z" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-wide text-slate-900 dark:text-[#f5f5f5]">
              Crypto Pulse
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-[#9ca3af]">
              Live Market Terminal
            </p>
          </div>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
