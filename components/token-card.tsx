"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Token } from "@/lib/types";
import { formatCurrency, getPriceChangeColor, cn } from "@/lib/utils";
import { Modal } from "./ui/modal";
import { TokenImage } from "./token-image";
import { Copy, Globe, Link, Search, User, ThumbsUp, MessageCircle, Heart, Zap, Crown, Eye } from "lucide-react";

interface TokenCardProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

// Component to animate value changes
const AnimatedValue = memo(function AnimatedValue({
  value,
  format = (v) => v.toString(),
  className = "",
}: {
  value: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsUpdating(false);
        prevValueRef.current = value;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <span
      className={cn(
        "transition-all duration-300",
        isUpdating && "scale-105",
        className
      )}
    >
      {format(displayValue)}
    </span>
  );
});

export const TokenCard = memo(function TokenCard({
  token,
  onTokenClick,
}: TokenCardProps) {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative w-full",
          "border-b border-gray-800",
          "bg-[#0a0a0a] hover:bg-[#151515]",
          "cursor-pointer transition-all duration-200",
          "group overflow-hidden"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          onTokenClick?.(token);
          setCardModalOpen(true);
        }}
      >
        {/* MAIN CONTENT */}
        <div className="px-3 py-3">
          {/* TOP ROW - Image, Name, and Right Stats */}
          <div className="flex items-start gap-3 mb-2">
            {/* TOKEN IMAGE with hover icons */}
            <div className="relative w-[70px] h-[70px] flex-shrink-0">
              <div className="w-full h-full rounded-xl overflow-hidden border-2 border-red-500">
                <TokenImage token={token} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              
              {/* Hover Icons Overlay */}
              {isHovered && (
                <div className="absolute inset-0 bg-black/80 rounded-xl flex flex-col items-center justify-center gap-1.5">
                  <button className="text-white/60 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <User size={16} />
                  </button>
                  <button className="text-white/60 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Globe size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* TOKEN INFO */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              {/* Name, Symbol and Copy */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-white truncate">
                  {token.name}
                </h3>
                <span className="text-sm text-gray-400 truncate">
                  {token.symbol}
                </span>
                <button className="text-gray-500 hover:text-white flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Copy size={14} />
                </button>
              </div>

              {/* Time and Icons Row */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-sm text-emerald-400 font-medium transition-all duration-300">
                  {token.timeAgo}
                </span>
                <button className="text-gray-500 hover:text-white" onClick={(e) => e.stopPropagation()}>
                  <Search size={15} />
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <User size={13} />
                  <AnimatedValue value={token.participants} />
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={13} />
                  <AnimatedValue value={token.votes} />
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={13} />
                  0
                </span>
                <span className="flex items-center gap-1">
                  <Crown size={13} className="text-yellow-500" />
                  {token.progress}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={13} />
                  1
                </span>
              </div>
            </div>

            {/* Right Side Stats */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="text-xs text-gray-400">
                V <span className="text-white font-medium">
                  <AnimatedValue
                    value={token.volume}
                    format={(v) => `$${formatCurrency(v)}`}
                  />
                </span>
              </div>
              <div className="text-xs text-gray-400">
                MC <span className="text-blue-400 font-medium">
                  <AnimatedValue
                    value={token.marketCap}
                    format={(v) => `$${formatCurrency(v)}`}
                  />
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-gray-400">F</span>
                <span className="text-xs text-blue-400">≋</span>
                <span className="text-xs text-white font-medium">
                  <AnimatedValue
                    value={token.fees}
                    format={(v) => v.toFixed(3)}
                  />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">TX</span>
                <span className="text-xs text-white font-medium">
                  <AnimatedValue value={token.transactions} />
                </span>
                <div className="w-10 h-0.5 bg-emerald-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="text-xs text-gray-500 truncate mb-2">
            {token.address}
          </div>

          {/* PERCENTAGE BADGES */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {token.percentages.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300"
              >
                <span className={p.value > 0 ? "text-emerald-400" : "text-gray-500"}>
                  {p.value > 0 ? "🧑" : "👕"}
                </span>
                <span className={p.value > 0 ? "text-emerald-400" : "text-gray-400"}>
                  <AnimatedValue
                    value={p.value}
                    format={(v) => {
                      // Format to max 2 decimal places, remove trailing zeros
                      const formatted = Math.abs(v).toFixed(2).replace(/\.?0+$/, '');
                      return `${v > 0 ? "+" : ""}${formatted}%`;
                    }}
                  />
                </span>
                {p.timeframe && (
                  <span className="text-gray-500">{p.timeframe}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* HOVER OVERLAY - Action Button */}
        {isHovered && (
          <div className="absolute bottom-3 right-3 z-10">
            <button 
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                // Handle buy action
              }}
            >
              <Zap size={16} fill="currentColor" />
              <span>0 SOL</span>
            </button>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      <Modal
        open={cardModalOpen}
        onOpenChange={setCardModalOpen}
        content={
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{token.name}</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-500">Symbol:</span> {token.symbol}
              </p>
              <p>
                <span className="text-gray-500">Volume:</span>{" "}
                {formatCurrency(token.volume)}
              </p>
              <p>
                <span className="text-gray-500">Market Cap:</span>{" "}
                {formatCurrency(token.marketCap)}
              </p>
              <p>
                <span className="text-gray-500">Price Change:</span>{" "}
                <span className={getPriceChangeColor(token.priceChange)}>
                  {token.priceChange > 0 ? "+" : ""}
                  {Math.abs(token.priceChange).toFixed(2).replace(/\.?0+$/, '')}%
                </span>
              </p>
              <p>
                <span className="text-gray-500">Address:</span> {token.address}
              </p>
            </div>
          </div>
        }
      >
        <div />
      </Modal>
    </>
  );
});