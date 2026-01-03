"use client";

import { memo, useState } from "react";
import { Token } from "@/lib/types";
import { formatCurrency, getPriceChangeColor, cn } from "@/lib/utils";
import { PriceIndicator } from "./price-indicator";
import { Tooltip } from "./ui/tooltip";
import { Popover } from "./ui/popover";
import { Modal } from "./ui/modal";

interface TokenRowProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

export const TokenRow = memo(function TokenRow({
  token,
  onTokenClick,
}: TokenRowProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr
        className={cn(
          "border-b border-dark-border hover:bg-dark-card/50",
          "transition-colors duration-150 cursor-pointer"
        )}
        onClick={() => {
          onTokenClick?.(token);
          setModalOpen(true);
        }}
      >
        <td className="px-2 sm:px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-lg bg-dark-border flex items-center justify-center text-xs">
              {token.symbol.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Tooltip content={`${token.symbol} - ${token.subtitle || ""}`}>
                  <span className="font-semibold text-xs sm:text-sm truncate">
                    {token.name}
                  </span>
                </Tooltip>
              </div>
              {token.subtitle && (
                <p className="text-xs text-gray-500 truncate hidden sm:block">
                  {token.subtitle}
                </p>
              )}
            </div>
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <div className="text-xs sm:text-sm font-medium">
            ${token.price.toFixed(6)}
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <PriceIndicator
            value={token.priceChange}
            className="text-xs sm:text-sm font-medium"
          />
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <div className="text-xs sm:text-sm">{formatCurrency(token.volume)}</div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <div className="text-xs sm:text-sm">{formatCurrency(token.marketCap)}</div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <div className="text-xs text-gray-400">{token.timeAgo}</div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>{token.participants}</span>
            <span>👤</span>
            <span className="mx-1">•</span>
            <span>{token.votes}</span>
            <span>📊</span>
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {token.percentages.slice(0, 3).map((p, idx) => (
              <PriceIndicator
                key={idx}
                value={p.value}
                timeframe={p.timeframe}
                className="text-xs"
              />
            ))}
          </div>
        </td>
        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
          <Popover
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            content={
              <div className="space-y-2 p-2">
                <p className="text-sm font-semibold">Token Details</p>
                <p className="text-xs text-gray-400">Address: {token.address}</p>
                <p className="text-xs text-gray-400">
                  Price: ${token.price.toFixed(6)}
                </p>
                <p className="text-xs text-gray-400">
                  Fees: {token.fees.toFixed(3)}
                </p>
                <p className="text-xs text-gray-400">
                  TX: {token.transactions}
                </p>
              </div>
            }
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPopoverOpen(!popoverOpen);
              }}
              className="text-xs text-primary hover:underline"
            >
              View
            </button>
          </Popover>
        </td>
      </tr>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
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
                  {token.priceChange}%
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

