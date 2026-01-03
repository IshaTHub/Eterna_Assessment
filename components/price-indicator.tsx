"use client";

import { memo, useEffect, useState } from "react";
import { getPriceChangeColor, cn } from "@/lib/utils";

interface PriceIndicatorProps {
  value: number;
  timeframe?: string;
  className?: string;
}

export const PriceIndicator = memo(function PriceIndicator({
  value,
  timeframe,
  className,
}: PriceIndicatorProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setIsUpdating(false);
        setPrevValue(value);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const colorClass = getPriceChangeColor(value);
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <span
      className={cn(
        "transition-all duration-300",
        isUpdating && isPositive && "text-green-400 scale-110",
        isUpdating && isNegative && "text-red-400 scale-110",
        !isUpdating && colorClass,
        className
      )}
    >
      {value > 0 ? "+" : ""}
      {Math.abs(value).toFixed(2).replace(/\.?0+$/, '')}%{timeframe && ` ${timeframe}`}
    </span>
  );
});

