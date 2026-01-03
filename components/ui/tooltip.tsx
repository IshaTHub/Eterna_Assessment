"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({ children, content, side = "top" }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={cn(
              "z-50 rounded-md bg-dark-card px-3 py-1.5 text-sm text-foreground",
              "shadow-md border border-dark-border",
              "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
            sideOffset={5}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

