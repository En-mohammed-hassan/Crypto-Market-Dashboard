export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/90 dark:border-[#2b3139] dark:bg-[#0b0e11]/95">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-3 py-8 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#f0b90b] text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2 22 12 12 22 2 12 12 2Zm0 4.2L6.2 12 12 17.8 17.8 12 12 6.2Z" />
              </svg>
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-[#f5f5f5]">
              Crypto Pulse
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-[#9ca3af]">
            Real-time crypto market terminal with live Binance data streams.
          </p>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-[#eaecef]">
            Product
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-[#9ca3af]">
            <li>Markets</li>
            <li>Live Ticker</li>
            <li>Favorites</li>
            <li>Recently Viewed</li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-[#eaecef]">
            Platform
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-[#9ca3af]">
            <li>Next.js + TypeScript</li>
            <li>TailwindCSS</li>
            <li>Binance REST API</li>
            <li>Binance WebSocket</li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-[#eaecef]">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-[#9ca3af]">
            <li className="flex items-center gap-2">
              <span aria-hidden>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M4 6h16a1 1 0 0 1 .8 1.6l-7.2 5.4a2.6 2.6 0 0 1-3.2 0L3.2 7.6A1 1 0 0 1 4 6Zm-1 3.2V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.2l-6.6 5a4.6 4.6 0 0 1-5.6 0Z" />
                </svg>
              </span>
              <span>en.mhd.has@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M6.6 3.5a1.8 1.8 0 0 1 1.8-1.3h2a1.8 1.8 0 0 1 1.8 1.5l.4 2.7a1.8 1.8 0 0 1-.5 1.5l-1.4 1.4a14.8 14.8 0 0 0 4 4l1.4-1.4a1.8 1.8 0 0 1 1.5-.5l2.7.4a1.8 1.8 0 0 1 1.5 1.8v2a1.8 1.8 0 0 1-1.3 1.8l-1.6.4a6.5 6.5 0 0 1-5.9-1.7l-6-6a6.5 6.5 0 0 1-1.7-5.9Z" />
                </svg>
              </span>
              <span>+963967772427</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2a7 7 0 0 1 7 7c0 4.2-4.2 9.4-6.2 11.7a1 1 0 0 1-1.6 0C9.2 18.4 5 13.2 5 9a7 7 0 0 1 7-7Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </span>
              <span>Damascus</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-200 px-3 py-4 text-center text-xs text-slate-500 dark:border-[#2b3139] dark:text-[#9ca3af] sm:px-6 lg:px-8">
        © 2026 Crypto Pulse. All rights reserved.
      </div>
    </footer>
  );
}
