"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  content,
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "z-50 w-72 rounded-md border border-dark-border bg-dark-card p-4",
            "shadow-lg outline-none",
            "animate-in fade-in-0 zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
          sideOffset={5}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

