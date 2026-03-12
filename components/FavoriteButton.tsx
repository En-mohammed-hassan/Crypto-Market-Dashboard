"use client";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition active:scale-95 sm:h-9 sm:w-9 ${
        isFavorite
          ? "border-amber-400 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:border-[#f0b90b] dark:bg-[#3a2f0b] dark:text-[#f0b90b] dark:hover:bg-[#4a3a0d]"
          : "border-slate-300 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:border-[#2b3139] dark:bg-[#0b0e11] dark:text-[#6b7280] dark:hover:bg-[#2b3139] dark:hover:text-[#eaecef]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 17.25 5.817 21l1.638-7.029L2 9.24l7.191-.611L12 2l2.809 6.629L22 9.24l-5.455 4.731L18.183 21z" />
      </svg>
    </button>
  );
}
