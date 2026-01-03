"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

export const TokenCardSkeleton = memo(function TokenCardSkeleton() {
  return (
    <div
      className={cn(
        "relative w-full",
        "border-b border-gray-800",
        "bg-[#0a0a0a]",
        "overflow-hidden"
      )}
    >
      {/* MAIN CONTENT */}
      <div className="px-3 py-3">
        {/* TOP ROW - Image, Name, and Right Stats */}
        <div className="flex items-start gap-3 mb-2">
          {/* TOKEN IMAGE SKELETON */}
          <div className="relative w-[70px] h-[70px] flex-shrink-0">
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-gray-800 bg-gray-800/50 animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-700 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
          </div>

          {/* TOKEN INFO SKELETON */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Name, Symbol and Copy */}
            <div className="flex items-center gap-2 mb-1">
              <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-12 bg-gray-800 rounded animate-pulse" />
              <div className="h-3.5 w-3.5 bg-gray-800 rounded animate-pulse" />
            </div>

            {/* Time and Icons Row */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="h-3.5 w-16 bg-gray-800 rounded animate-pulse" />
              <div className="h-3.5 w-3.5 bg-gray-800 rounded animate-pulse" />
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-3">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-6 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Stats Skeleton */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1">
              <div className="h-3 w-8 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-12 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-3 w-3 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-3 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-8 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-6 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-6 bg-gray-800 rounded animate-pulse" />
              <div className="w-10 h-0.5 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* ADDRESS SKELETON */}
        <div className="h-3 w-full max-w-xs bg-gray-800 rounded mb-2 animate-pulse" />

        {/* PERCENTAGE BADGES SKELETON */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5"
            >
              <div className="h-3 w-3 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-8 bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Component for rendering multiple skeleton cards
export const TokenCardSkeletonList = memo(function TokenCardSkeletonList({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <TokenCardSkeleton key={idx} />
      ))}
    </>
  );
});