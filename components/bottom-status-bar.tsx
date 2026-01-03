"use client";

import { memo } from "react";

export const BottomStatusBar = memo(function BottomStatusBar() {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-row justify-between w-full h-12 px-6 gap-4 items-center min-w-0 bg-[#0a0a0a] border-t border-gray-800 flex-shrink-0 mt-4">
      {/* LEFT SIDE */}
      <div className="flex flex-row flex-shrink-0 gap-2 justify-start items-center">
        {/* PRESET 1 Button */}
        <button className="text-blue-500 bg-blue-500/20 flex flex-row h-6 px-2 gap-1 justify-start items-center rounded hover:bg-blue-500/25 transition-colors duration-150 ease-in-out cursor-pointer">
          <i className="ri-list-settings-line text-base"></i>
          <span className="text-xs font-semibold">PRESET 1</span>
        </button>

        {/* Wallet Counter Dropdown */}
        <button className="group/wallets border border-gray-700 flex flex-row h-6 pl-2 pr-[5px] gap-1.5 justify-start items-center rounded-full hover:bg-gray-700/60 transition-colors duration-125 ease-in-out cursor-pointer">
          <div className="flex flex-row gap-1 justify-start items-center">
            <i className="ri-wallet-line text-sm text-gray-500 group-hover/wallets:text-gray-400 transition-colors duration-125 ease-in-out"></i>
            <span className="text-xs group-hover/wallets:text-gray-400 font-medium text-gray-400 transition-colors duration-125 ease-in-out">1</span>
          </div>
          <div className="flex flex-row gap-1 justify-start items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span className="text-xs font-medium text-gray-400">0</span>
          </div>
          <i className="ri-arrow-down-s-line text-sm text-gray-400 group-hover:text-white transition-colors duration-150 ease-in-out cursor-pointer"></i>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-700 flex-shrink-0"></div>

        {/* Button Group */}
        <div className="flex flex-row gap-2 justify-start items-center">
          {/* Settings */}
          <button className="-mr-1 min-w-6 min-h-6 flex items-center justify-center text-gray-500 hover:text-gray-400 hover:bg-gray-700/40 transition-colors duration-125 ease-in-out rounded">
            <i className="ri-settings-3-line text-sm"></i>
          </button>

          {/* Wallet */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-[#0a0a0a] absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
            <i className="text-base ri-wallet-3-line text-gray-500 hover:text-gray-400 transition-colors group-hover:text-gray-400"></i>
            <span className="text-gray-400 text-xs leading-4 font-medium text-nowrap">Wallet</span>
          </button>

          {/* Twitter */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-[#0a0a0a] absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
            <i className="text-base ri-twitter-x-line text-gray-500 hover:text-gray-400 transition-colors group-hover:text-gray-400"></i>
            <span className="text-gray-400 text-xs leading-4 font-medium text-nowrap">Twitter</span>
          </button>

          {/* Discover */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-[#0a0a0a] absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
            <i className="text-base ri-compass-3-line text-gray-500 hover:text-gray-400 transition-colors group-hover:text-gray-400"></i>
            <span className="text-gray-400 text-xs leading-4 font-medium text-nowrap">Discover</span>
          </button>

          {/* Pulse */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-[#0a0a0a] absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
            <i className="text-base ri-pulse-line text-gray-500 hover:text-gray-400 transition-colors group-hover:text-gray-400"></i>
            <span className="text-gray-400 text-xs leading-4 font-medium text-nowrap">Pulse</span>
          </button>

          {/* PnL */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <i className="text-base ri-bar-chart-line text-gray-500 hover:text-gray-400 transition-colors group-hover:text-gray-400"></i>
            <span className="text-gray-400 text-xs leading-4 font-medium text-nowrap">PnL</span>
          </button>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex w-px h-5 bg-gray-700 flex-shrink-0"></div>

        {/* Platform Icons */}
        <button type="button" className="hidden lg:flex flex-row h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out">
          <div className="relative">
            <div className="relative flex flex-row h-5 px-1 gap-1 justify-start items-center rounded-full opacity-30 bg-gradient-to-r from-emerald-400 via-orange-400 to-cyan-400" style={{ width: '40px' }}></div>
            <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-full flex gap-0 justify-center items-center">
              <div className="w-[11px] h-[11px] rounded-full bg-emerald-400"></div>
              <div className="w-[11px] h-[11px] rounded-full bg-orange-400"></div>
              <div className="w-[11px] h-[11px] rounded-full bg-cyan-400"></div>
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="hidden lg:flex w-px h-5 bg-gray-700 flex-shrink-0"></div>

        {/* Crypto Prices */}
        <div className="flex flex-1 flex-row w-full gap-2 justify-start items-center">
          <button className="text-[#F7931A] hidden 2xl:flex flex-row flex-shrink-0 h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-xs font-normal">$89.8K</span>
          </button>

          <button className="text-[#497493] hidden 2xl:flex flex-row flex-shrink-0 h-6 px-0 gap-0.5 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out">
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <span className="text-xs font-normal">$3103</span>
          </button>

          <button className="text-[#14F195] hidden lg:flex flex-row flex-shrink-0 h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out">
            <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
            <span className="text-xs font-normal">$131.23</span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-row flex-shrink-0 gap-2 justify-end items-center">
        {/* Additional Stats */}
        <div className="hidden 2xl:flex">
          <button className="-mr-2 group flex items-center gap-1 h-6 px-2 text-xs font-medium rounded hover:bg-gray-700/40 text-gray-500 transition-colors duration-150 ease-in-out">
            <i className="text-gray-500 group-hover:text-gray-400 transition-colors duration-150 ease-in-out" style={{ fontSize: '14px' }}>💊</i>
            <span className="text-gray-500 text-xs font-normal group-hover:text-gray-400 transition-colors duration-150 ease-in-out">$53.9K</span>
          </button>
        </div>

        {/* Gas Stats */}
        <div className="hidden 2xl:flex flex-row gap-1 justify-start items-center">
          <div className="flex flex-row gap-1 h-6 min-h-6 justify-start items-center">
            <i className="ri-gas-station-line text-gray-500 text-base"></i>
            <span className="text-gray-500 text-xs font-normal">0.0<sub>2</sub>53</span>
          </div>
        </div>

        <div className="hidden 2xl:flex flex-row gap-1 justify-start items-center">
          <div className="flex flex-row gap-1 h-6 min-h-6 justify-start items-center">
            <i className="ri-coin-line text-gray-500 text-base"></i>
            <span className="text-gray-500 text-xs font-normal">0.0<sub>2</sub>37</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden 2xl:flex w-px h-5 bg-gray-700 flex-shrink-0"></div>

        {/* Connection Status */}
        <div className="flex flex-row h-6 xl:px-2 gap-1 justify-start items-center rounded text-emerald-400 xl:bg-emerald-400/20">
          <div className="flex flex-row gap-1 justify-start items-center">
            <div className="bg-emerald-400/20 w-3 h-3 rounded-full flex flex-row gap-1 justify-center items-center">
              <div className="bg-emerald-400 w-2 h-2 rounded-full"></div>
            </div>
          </div>
          <span className="hidden xl:flex text-xs font-medium">Connection is stable</span>
        </div>

        {/* GLOBAL Dropdown */}
        <button className="flex items-center gap-1 px-2 h-6 text-xs font-medium rounded hover:bg-gray-700/40 text-gray-400 transition-colors duration-150">
          <span>GLOBAL</span>
          <i className="ri-arrow-down-s-line text-sm"></i>
        </button>

        {/* Divider */}
       

        {/* Icon Buttons */}
        {/* Social Links */}
        <div className="text-gray-400 flex flex-row gap-2 justify-start items-center">
          <div className="flex md:flex w-px h-5 bg-gray-700 flex-shrink-0"></div>
          
          <div className="flex md:flex flex-row gap-4 justify-start items-center">
            <a href="https://discord.gg/axiomtrade" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <i className="ri-discord-fill text-base"></i>
            </a>
            <a href="https://x.com/axiomexchange" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <i className="ri-twitter-x-line text-base"></i>
            </a>
          </div>

          <a href="https://docs.axiom.trade/" target="_blank" rel="noopener noreferrer" className="hidden md:flex flex-row gap-0.5 h-6 px-2 justify-start items-center rounded hover:bg-gray-700/40">
            <i className="ri-article-line text-base"></i>
            <span className="hidden lg:flex text-xs font-normal">Docs</span>
          </a>
        </div>
      </div>
    </div>
  );
});