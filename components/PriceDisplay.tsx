"use client";

import { useEffect, useRef, useState } from "react";
import { formatPriceUSD } from "@/lib/formatters";

type PriceDisplayProps = {
  value: number;
  className?: string;
  enableBlink?: boolean;
};

export function PriceDisplay({
  value,
  className = "",
  enableBlink = true,
}: PriceDisplayProps) {
  const previousValueRef = useRef<number | null>(null);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    if (!enableBlink) {
      previousValueRef.current = value;
      return;
    }

    const previous = previousValueRef.current;
    previousValueRef.current = value;

    if (previous === null || previous === value) {
      return;
    }

    setFlashClass(
      value > previous
        ? "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
        : "bg-rose-100/80 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    );

    const timer = window.setTimeout(() => setFlashClass(""), 420);
    return () => window.clearTimeout(timer);
  }, [value, enableBlink]);

  return (
    <span
      className={`rounded px-1 py-0.5 transition-colors duration-300 ${flashClass} ${className}`}
    >
      {formatPriceUSD(value)}
    </span>
  );
}
