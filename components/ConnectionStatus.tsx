"use client";

import type { ConnectionStatus as ConnectionStatusValue } from "@/types/market";

type ConnectionStatusProps = {
  status: ConnectionStatusValue;
  error?: string | null;
  className?: string;
};

const STATUS_LABEL: Record<ConnectionStatusValue, string> = {
  connecting: "Connecting",
  connected: "Connected",
  reconnecting: "Reconnecting",
  disconnected: "Disconnected",
};

const STATUS_STYLES: Record<ConnectionStatusValue, string> = {
  connecting:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300",
  connected:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300",
  reconnecting:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-300",
  disconnected:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#9ca3af]",
};

const STATUS_DOT: Record<ConnectionStatusValue, string> = {
  connecting: "bg-amber-500",
  connected: "bg-emerald-500",
  reconnecting: "bg-orange-500",
  disconnected: "bg-slate-500",
};

export function ConnectionStatus({ status, error, className = "" }: ConnectionStatusProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
      >
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />
        {STATUS_LABEL[status]}
      </span>

      {error ? <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p> : null}
    </div>
  );
}
