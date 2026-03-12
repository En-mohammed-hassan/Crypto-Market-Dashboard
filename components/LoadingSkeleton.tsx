type LoadingSkeletonProps = {
  className?: string;
};

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`rounded-xl bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-pulse dark:from-[#2b3139] dark:via-[#36404b] dark:to-[#2b3139] ${className}`}
    />
  );
}
