type CryptoIconProps = {
  symbol: string;
};

const ICON_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  BTC: { bg: "bg-amber-100 dark:bg-[#3a2f0b]", fg: "text-amber-700 dark:text-[#f0b90b]", label: "₿" },
  ETH: { bg: "bg-slate-200 dark:bg-[#2b3139]", fg: "text-slate-700 dark:text-[#eaecef]", label: "Ξ" },
  BNB: { bg: "bg-amber-100 dark:bg-[#3a2f0b]", fg: "text-amber-700 dark:text-[#f0b90b]", label: "◆" },
  SOL: { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/30", fg: "text-fuchsia-700 dark:text-fuchsia-300", label: "S" },
  XRP: { bg: "bg-slate-200 dark:bg-[#2b3139]", fg: "text-slate-700 dark:text-[#eaecef]", label: "X" },
  ADA: { bg: "bg-blue-100 dark:bg-blue-900/30", fg: "text-blue-700 dark:text-blue-300", label: "A" },
  DOGE: { bg: "bg-yellow-100 dark:bg-yellow-900/30", fg: "text-yellow-700 dark:text-yellow-300", label: "Ð" },
  TRX: { bg: "bg-rose-100 dark:bg-rose-900/30", fg: "text-rose-700 dark:text-rose-300", label: "T" },
  LINK: { bg: "bg-indigo-100 dark:bg-indigo-900/30", fg: "text-indigo-700 dark:text-indigo-300", label: "L" },
  AVAX: { bg: "bg-red-100 dark:bg-red-900/30", fg: "text-red-700 dark:text-red-300", label: "A" },
};

export function CryptoIcon({ symbol }: CryptoIconProps) {
  const key = symbol.toUpperCase();
  const style = ICON_STYLES[key] ?? {
    bg: "bg-slate-200 dark:bg-[#2b3139]",
    fg: "text-slate-700 dark:text-[#eaecef]",
    label: key.charAt(0),
  };

  return (
    <span
      className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${style.bg} ${style.fg}`}
      aria-hidden
    >
      {style.label}
    </span>
  );
}
