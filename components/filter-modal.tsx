"use client";

import { Modal } from "./ui/modal";
import { cn } from "@/lib/utils";
import { X, RotateCcw } from "lucide-react";
import { useState } from "react";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  column: "newPairs" | "finalStretch" | "migrated";
}

const TABS = [
  { key: "newPairs", label: "New Pairs" },
  { key: "finalStretch", label: "Final Stretch" },
  { key: "migrated", label: "Migrated" },
] as const;

export function FilterModal({ open, onClose, column }: FilterModalProps) {
  const [activeTab, setActiveTab] = useState(column);

  return (
    <Modal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      content={
        <div className="w-[720px] max-w-full bg-dark-card text-white rounded-xl overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X />
            </button>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-6 px-6 pt-4 border-b border-dark-border">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  "pb-3 text-sm font-medium",
                  activeTab === t.key
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto text-gray-400 hover:text-white cursor-pointer">
              <RotateCcw size={16} />
            </div>
          </div>

          {/* SEARCH */}
          <div className="grid grid-cols-2 gap-4 px-6 py-4 border-b border-dark-border">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Search Keywords
              </label>
              <input
                placeholder="keyword1, keyword2..."
                className="w-full bg-dark border border-dark-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Exclude Keywords
              </label>
              <input
                placeholder="keyword1, keyword2..."
                className="w-full bg-dark border border-dark-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* PROTOCOLS */}
          <div className="px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Protocols</h3>
              <button className="text-xs bg-dark border border-dark-border px-3 py-1 rounded-full">
                Select All
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Pump",
                "Bags",
                "Daos.fun",
                "Believe",
                "Boop",
                "Mayhem",
                "Moonshot",
                "Candle",
                "Jupiter Studio",
                "LaunchLab",
                "Bonk",
                "Heaven",
                "Sugar",
                "Moonit",
              ].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full text-sm border border-dark-border bg-dark hover:bg-dark-card cursor-pointer"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* QUOTE TOKENS */}
          <div className="px-6 py-4 border-t border-dark-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Quote Tokens</h3>
              <button className="text-xs bg-dark border border-dark-border px-3 py-1 rounded-full">
                Unselect All
              </button>
            </div>

            <div className="flex gap-2">
              {["SOL", "USDC", "USD1"].map((q) => (
                <span
                  key={q}
                  className="px-3 py-1 rounded-full text-sm border border-dark-border bg-dark hover:bg-dark-card cursor-pointer"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-dark-border">
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-full bg-dark border border-dark-border">
                Import
              </button>
              <button className="px-4 py-2 rounded-full bg-dark border border-dark-border">
                Export
              </button>
              <button className="px-4 py-2 rounded-full bg-dark border border-dark-border">
                Share
              </button>
            </div>

            <button className="px-6 py-2 rounded-full bg-primary text-black font-semibold">
              Apply All
            </button>
          </div>
        </div>
      }
    >
      <div />
    </Modal>
  );
}
