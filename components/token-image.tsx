"use client";

import { memo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Token } from "@/lib/types";
import { Modal } from "./ui/modal";
import { cn } from "@/lib/utils";

interface TokenImageProps {
  token: Token;
}

export const TokenImage = memo(function TokenImage({ token }: TokenImageProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [showHoverModal, setShowHoverModal] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // 🔹 Status border logic
  const statusColor =
    token.priceChange > 50
      ? "border-yellow-400"
      : token.priceChange < 0
      ? "border-red-500"
      : "border-green-500";

  /* ======================================================
     Shared image renderer (CDN image OR gradient fallback)
     ====================================================== */
  const RenderImage = ({ size }: { size: number }) => {
    if (token.icon) {
      return (
        <Image
          src={token.icon}
          alt={token.name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      );
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
        {token.symbol.slice(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <>
      {/* MAIN IMAGE */}
      <div
        className={cn(
          "relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden",
          "border-2",
          statusColor,
          "cursor-pointer"
        )}
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = setTimeout(
            () => setShowHoverModal(true),
            250
          );
        }}
        onMouseLeave={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          setShowHoverModal(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setImageModalOpen(true);
        }}
      >
        {/* Image / Fallback */}
        <RenderImage size={64} />

        {/* STATUS DOT */}
        <div
          className={cn(
            "absolute bottom-[-2px] right-[-2px] w-3 h-3 rounded-full border-2 border-dark-card",
            token.priceChange < 0
              ? "bg-red-500"
              : token.priceChange > 50
              ? "bg-yellow-400"
              : "bg-green-500"
          )}
        />
      </div>

      {/* HOVER PREVIEW */}
      {showHoverModal && (
        <div className="absolute top-full left-0 mt-2 z-50 w-56 p-3 bg-dark-card border border-dark-border rounded-lg shadow-xl">
          <div className="relative w-40 h-40 mx-auto rounded-md overflow-hidden border border-dark-border mb-3">
            <RenderImage size={160} />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold text-white truncate">
              {token.name}
            </h3>
            <p className="text-xs text-gray-400">{token.symbol}</p>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      <Modal
        open={imageModalOpen}
        onOpenChange={setImageModalOpen}
        content={
          <div className="space-y-4">
            <div
              className={cn(
                "relative w-64 h-64 mx-auto rounded-lg overflow-hidden border-2",
                statusColor
              )}
            >
              <RenderImage size={256} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{token.name}</h3>
              <p className="text-sm text-gray-400">{token.symbol}</p>
            </div>
          </div>
        }
      >
        <div />
      </Modal>
    </>
  );
});
