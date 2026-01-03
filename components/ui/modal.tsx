"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  children: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ children, content, open, onOpenChange }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80",
            "animate-in fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%]",
            "translate-y-[-50%] rounded-lg border border-dark-border bg-dark-card p-6",
            "shadow-xl outline-none",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2",
            "slide-in-from-top-[48%]"
          )}
        >
          {content}
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70",
              "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
            )}
          >
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

