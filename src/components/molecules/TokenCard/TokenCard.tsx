"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms";
import { ActionButton } from "@/components/molecules/ActionButton";
import type { Token } from "@/types";
import { formatCurrency, formatNumber, truncateAddress } from "@/lib/utils";
import { useState, useEffect } from "react";

export interface TokenCardProps {
  token: Token;
  className?: string;
  style?: React.CSSProperties;
}

function TokenCard({ token, className, style }: TokenCardProps) {
  const {
    name,
    symbol,
    imageUrl,
    address,
    age,
    marketCap: initialMarketCap,
    volume: initialVolume,
    fee,
    transactions,
    metrics,
    holders,
  } = token;

  const [marketCap, setMarketCap] = useState(initialMarketCap);
  const [volume, setVolume] = useState(initialVolume);
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);

  // Simulate price changes with shorter interval
  useEffect(() => {
    const interval = setInterval(() => {
      const changePercent = (Math.random() - 0.5) * 0.1; // ±5% change
      const newMarketCap = initialMarketCap * (1 + changePercent);
      const newVolume = initialVolume * (1 + changePercent * 0.5);
      
      setPriceChange(newMarketCap > marketCap ? "up" : "down");
      setMarketCap(newMarketCap);
      setVolume(newVolume);
      
      // Reset animation state after animation completes
      setTimeout(() => setPriceChange(null), 600);
    }, 2000); // Update every 2 seconds instead of longer intervals

    return () => clearInterval(interval);
  }, [initialMarketCap, initialVolume, marketCap]);

  const displayAddress = truncateAddress(address);

  return (
    <div
      className={cn(
        "bg-secondary/30 border border-border rounded-lg p-2 transition-all duration-300 hover:bg-secondary/50 animate-slide-up w-full mx-0",
        className
      )}
      style={style}
    >
      <div className="flex gap-2">
        {/* Left Section - Image/Icon */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-foreground">
                {symbol?.[0]?.toUpperCase() || name[0]?.toUpperCase() || "?"}
              </span>
            )}
            {/* Red badge indicator */}
            <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-red-500 rounded-full border border-background flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5 font-mono leading-tight">
            {displayAddress}
          </p>
        </div>

        {/* Middle Section - Name & Metrics */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Name Row */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="text-s font-semibold text-foreground truncate">
              {name}
            </h3>
            <span className="text-[11px] text-muted-foreground truncate">
              {symbol}
            </span>
            <button className="flex-shrink-0 p-0.5 hover:bg-accent rounded transition-colors">
              <Icon name="copy" size={10} className="text-muted-foreground" />
            </button>
          </div>

          {/* Time and Icons Row */}
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] font-medium text-green-500">{age}</span>
            <Icon name="search" size={10} className="text-muted-foreground" />
            <Icon name="users" size={10} className="text-muted-foreground" />
            <Icon name="link" size={10} className="text-muted-foreground" />
            <Icon name="copy" size={10} className="text-muted-foreground" />
            <Icon name="trophy" size={10} className="text-muted-foreground" />
            <Icon name="eye" size={10} className="text-muted-foreground" />
            {holders > 0 && (
              <span className="text-[10px] text-muted-foreground">{holders}</span>
            )}
          </div>

          {/* Percentage Indicators Row - aligned with button */}
          <div className="flex items-center gap-1 flex-wrap">
            {/* Holders Percent */}
            <div
              className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all duration-200",
                metrics.holdersPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="star"
                size={8}
                className={metrics.holdersPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.holdersPercent}%</span>
            </div>

            {/* Liquidity Percent */}
            <div
              className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all duration-200",
                metrics.liquidityPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="chef-hat"
                size={8}
                className={metrics.liquidityPercent > 0 ? "text-white" : ""}
              />
              <span>
                {metrics.liquidityPercent}%
                {metrics.liquidityTime && ` ${metrics.liquidityTime}`}
              </span>
            </div>

            {/* Target Percent */}
            <div
              className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all duration-200",
                metrics.targetPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="target"
                size={8}
                className={metrics.targetPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.targetPercent}%</span>
            </div>

            {/* Gear Percent */}
            <div
              className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all duration-200",
                metrics.gearPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="ghost"
                size={8}
                className={metrics.gearPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.gearPercent}%</span>
            </div>

            {/* Holders Gear Percent */}
            <div
              className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-0.5 transition-all duration-200",
                metrics.holdersGearPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="gift"
                size={8}
                className={metrics.holdersGearPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.holdersGearPercent}%</span>
            </div>
          </div>
        </div>

        {/* Right Section - Market Data & Action */}
        <div className="flex-shrink-0 flex flex-col items-end">
          {/* Market Data - Compact */}
          <div className="flex flex-col items-end gap-0">
            {/* Market Cap */}
            <div className="text-right">
              <span className="text-[7px] text-muted-foreground leading-none block">MC</span>
              <p
                className={cn(
                  "text-[11px] font-semibold text-green-500 transition-all duration-300 leading-tight",
                  priceChange === "up" && "text-green-400 scale-110",
                  priceChange === "down" && "text-red-400 scale-110"
                )}
              >
                {formatCurrency(marketCap)}
              </p>
            </div>

            {/* Volume */}
            <div className="text-right">
              <span className="text-[9px] text-muted-foreground leading-none block">V</span>
              <p
                className={cn(
                  "text-[11px] font-semibold text-green-500 transition-all duration-300 leading-tight",
                  priceChange === "up" && "text-green-400 scale-110",
                  priceChange === "down" && "text-red-400 scale-110"
                )}
              >
                {formatCurrency(volume)}
              </p>
            </div>

            {/* Fees and Transactions */}
            <div className="flex items-center gap-1.5 text-right">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-muted-foreground leading-none block">F</span>
                <div className="flex items-center gap-0.5">
                  <Icon name="dollar" size={9} className="text-purple-500" />
                  <span className="text-[10px] font-medium text-foreground leading-tight">
                    {fee.toFixed(3)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-muted-foreground leading-none block">TX</span>
                <p className="text-[10px] font-medium text-foreground leading-tight">
                  {formatNumber(transactions)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button - minimal spacing from F/TX */}
          <ActionButton amount="0 SOL" icon="zap" className="mt-0" />
        </div>
      </div>
    </div>
  );
}

export default TokenCard;

