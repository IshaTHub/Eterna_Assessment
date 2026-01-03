"use client";

import { useEffect, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { setTokens } from "@/lib/slices/tokenSlice";
import { TokenColumn } from "./token-column";
import { ErrorBoundary } from "./ui/error-boundary";
import { useMockWebSocket } from "@/lib/hooks/useMockWebSocket";
import { mockTokens } from "@/lib/mockData";
import { Token, TokenColumn as TokenColumnType } from "@/lib/types";
import { BottomStatusBar } from "./bottom-status-bar";
import { ChevronDown, Volume2, Layers, Settings, Calculator, Bookmark, List, Boxes, HelpCircle, Flame, TrendingUp, Activity, DollarSign, User } from "lucide-react";

const fetchTokens = async (): Promise<Record<TokenColumnType, Token[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTokens;
};

export function TokenDiscoveryTable() {
  const dispatch = useAppDispatch();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [activeTab, setActiveTab] = useState<TokenColumnType>("newPairs");
  const columns = useAppSelector((state) => state.tokens.columns);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    refetchInterval: 30000,
  });

  useMockWebSocket();

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([column, tokens]) => {
        dispatch(
          setTokens({
            column: column as TokenColumnType,
            tokens,
          })
        );
      });
    }
  }, [data, dispatch]);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
  }, []);

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading tokens</h2>
            <p className="text-gray-400">Please try again later</p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen bg-dark flex flex-col overflow-hidden">
        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex lg:flex-col h-full p-8">
          <div className="max-w-[1800px] mx-auto w-full flex flex-col h-full">
            {/* TOP HEADER BAR */}
            <div className="mb-6 flex items-center justify-between border-b border-dark-border pb-4 flex-shrink-0">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-white">Pulse</h1>

                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-dark-card border border-dark-border">
                  <Layers size={16} className="text-blue-400" />
                </div>

                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-dark-card border border-dark-border">
                  <Boxes size={16} className="text-yellow-400" />
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <HelpCircle size={18} />
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-dark-border text-sm text-white hover:bg-dark-card/70 transition">
                  <List size={16} />
                  <span>Display</span>
                  <ChevronDown size={14} />
                </button>

                <button className="text-gray-400 hover:text-white transition-colors">
                  <Bookmark size={18} />
                </button>

                <button className="text-gray-400 hover:text-white transition-colors">
                  <Calculator size={18} />
                </button>

                <button className="text-gray-400 hover:text-white transition-colors">
                  <Volume2 size={18} />
                </button>

                <button className="text-gray-400 hover:text-white transition-colors">
                  <Settings size={18} />
                </button>

                {/* COUNTERS */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card border border-dark-border text-sm">
                  <span className="text-white">1</span>
                  <Layers size={14} className="text-gray-500" />
                  <span className="text-gray-400">0</span>
                  <Layers size={14} className="text-blue-400" />
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* 3-COLUMN GRID */}
            <div className="grid grid-cols-3 gap-0 flex-1 min-h-0 border border-dark-border rounded-lg overflow-hidden">
              <TokenColumn
                columnId="newPairs"
                title="New Pairs"
                tokens={columns.newPairs}
                isLoading={isLoading}
                onTokenClick={handleTokenClick}
              />
              <TokenColumn
                columnId="finalStretch"
                title="Final Stretch"
                tokens={columns.finalStretch}
                isLoading={isLoading}
                onTokenClick={handleTokenClick}
              />
              <TokenColumn
                columnId="migrated"
                title="Migrated"
                tokens={columns.migrated}
                isLoading={isLoading}
                onTokenClick={handleTokenClick}
              />
            </div>
            <BottomStatusBar />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="lg:hidden flex flex-col h-screen">
          {/* TOP HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
                <Layers size={14} className="text-blue-400" />
                <span className="text-white text-sm">0</span>
                <Boxes size={14} className="text-yellow-400" />
                <span className="text-white text-sm">0</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              
              <button className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-sm">🔍</span>
              </button>
              
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
                Paste CA
              </button>
              
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold relative">
                9A
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
              </div>
              
              <button className="text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* TAB BAR */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-gray-800 overflow-x-auto">
            <button className="p-2 rounded-lg bg-gray-900">
              <Layers size={18} className="text-blue-400" />
            </button>
            
            <button className="p-2 rounded-lg bg-gray-900">
              <Boxes size={18} className="text-yellow-400" />
            </button>
            
            <button
              onClick={() => setActiveTab("newPairs")}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "newPairs"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              New Pairs
            </button>
            
            <button
              onClick={() => setActiveTab("finalStretch")}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "finalStretch"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              Final Stretch
            </button>
            
            <button
              onClick={() => setActiveTab("migrated")}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "migrated"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              Mig
            </button>
            
            <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium flex items-center gap-2">
              P1
              <Settings size={16} />
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
            <TokenColumn
              columnId={activeTab}
              title=""
              tokens={columns[activeTab]}
              isLoading={isLoading}
              onTokenClick={handleTokenClick}
            />
          </div>

          {/* BOTTOM NAVIGATION */}
          <div className="flex items-center justify-around px-4 py-3 bg-[#0a0a0a] border-t border-gray-800">
            <button className="flex flex-col items-center gap-1">
              <Flame size={24} className="text-gray-400" />
              <span className="text-xs text-gray-400">Trending</span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <TrendingUp size={24} className="text-gray-400" />
              <span className="text-xs text-gray-400">Track</span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <Activity size={24} className="text-white" />
              <span className="text-xs text-white font-medium">Pulse</span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <DollarSign size={24} className="text-gray-400" />
              <span className="text-xs text-gray-400">Perpetuals</span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <User size={24} className="text-gray-400" />
              <span className="text-xs text-gray-400">Account</span>
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
    
  );
}