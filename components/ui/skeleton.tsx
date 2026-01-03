import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "shimmer";
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-dark-border",
        variant === "shimmer" && "animate-shimmer bg-gradient-to-r",
        "from-dark-border via-dark-card to-dark-border bg-[length:200%_100%]",
        className
      )}
    />
  );
}

