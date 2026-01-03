"use client";

import { memo, useMemo, useState } from "react";
import { Token, SortField, TokenColumn as TokenColumnType } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { setSortConfig } from "@/lib/slices/tokenSlice";
import { TokenCard } from "./token-card";
import { TokenCardSkeletonList } from "./token-card-skeleton";
import { Tooltip } from "./ui/tooltip";
import { cn, sortTokens } from "@/lib/utils";
import { Filter } from "lucide-react";
import { FilterModal } from "./filter-modal";

interface TokenColumnProps {
  columnId: TokenColumnType;
  title: string;
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
}

export const TokenColumn = memo(function TokenColumn({
  columnId,
  title,
  tokens,
  isLoading,
  onTokenClick,
}: TokenColumnProps) {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector(
    (state) => state.tokens.sortConfig[columnId]
  );

  const [filterOpen, setFilterOpen] = useState(false);

  // UI-only state (matches screenshot)
  const [activePhase, setActivePhase] = useState<"P1" | "P2" | "P3">("P2");

  const sortedTokens = useMemo(() => {
    if (sortConfig.field === "time") return tokens;
    return sortTokens(
      tokens,
      sortConfig.field,
      sortConfig.direction
    ) as Token[];
  }, [tokens, sortConfig]);

  const handleSort = (field: SortField) => {
    const newDirection =
      sortConfig.field === field && sortConfig.direction === "desc"
        ? "asc"
        : "desc";
    dispatch(
      setSortConfig({
        column: columnId,
        config: { field, direction: newDirection },
      })
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0 border-r border-dark-border last:border-r-0 bg-dark-card/30">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2">
          {/* CONTROL PILL */}
          <div className="flex items-center bg-dark-card border border-dark-border rounded-full overflow-hidden">
            {/* ⚡ COUNT */}
            <div className="flex items-center gap-1 px-3 py-1 text-xs text-gray-300 border-r border-dark-border">
              <span className="text-yellow-400">⚡</span>
              <span>0</span>
            </div>

            {/* STACK ICON */}
            <div className="px-3 py-1 border-r border-dark-border text-purple-400">
              ≡
            </div>

            {/* PHASE TOGGLES */}
            {(["P1", "P2", "P3"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActivePhase(p)}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors",
                  activePhase === p
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* FILTER ICON */}
          <button
            onClick={() => setFilterOpen(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Filter size={16} />
          </button>

          <FilterModal
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            column={columnId}
          />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto scrollbar-white">
        {isLoading ? (
          <TokenCardSkeletonList count={8} />
        ) : sortedTokens.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No tokens</div>
        ) : (
          sortedTokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onTokenClick={onTokenClick}
            />
          ))
        )}
      </div>
    </div>
  );
});