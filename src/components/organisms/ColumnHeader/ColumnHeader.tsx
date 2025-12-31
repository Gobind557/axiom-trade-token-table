"use client";

import { ArrowDownUp, Zap, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TokenStatus, SortOption, SortDirection } from "@/types";
import { COLUMN_TITLES } from "@/lib/constants";

export interface ColumnHeaderProps {
  status: TokenStatus;
  count?: number;
  onSortClick?: () => void;
  sortBy?: SortOption | null;
  sortDirection?: SortDirection;
  className?: string;
}

function ColumnHeader({
  status,
  count = 0,
  onSortClick,
  sortBy = null,
  sortDirection = "desc",
  className,
}: ColumnHeaderProps) {
  const title = COLUMN_TITLES[status];
  
  const getSortLabel = () => {
    if (!sortBy) return "Sort";
    const labels: Record<SortOption, string> = {
      marketCap: "MC",
      volume: "Vol",
      price: "Price",
      holders: "Holders",
      transactions: "TX",
      age: "Age",
    };
    return labels[sortBy];
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 bg-secondary/50 border-b border-border flex-shrink-0",
        className
      )}
    >
      {/* Left side - Title */}
      <h2 className="text-sm font-semibold text-foreground whitespace-nowrap">
        {title}
      </h2>

      {/* Right side - Container with icons, count, P1/P2/P3, and filter */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary/80 border border-border/50 rounded-md">
          {/* Lightning bolt icon */}
          <Zap size={14} className="text-muted-foreground" />

          {/* Count */}
          <span className="text-xs font-medium text-foreground">{count}</span>

          {/* Solana logo */}
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">S</span>
          </div>
        </div>

        {/* Sort/Filter icon */}
        <button
          onClick={onSortClick}
          className={cn(
            "p-1.5 hover:bg-accent rounded transition-colors flex items-center gap-1",
            sortBy && "bg-accent/50"
          )}
          aria-label="Sort and filter"
        >
          {sortBy ? (
            <>
              <span className="text-[10px] font-medium text-foreground">
                {getSortLabel()}
              </span>
              {sortDirection === "asc" ? (
                <ArrowUp size={12} className="text-foreground" />
              ) : (
                <ArrowDown size={12} className="text-foreground" />
              )}
            </>
          ) : (
            <ArrowDownUp size={14} className="text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ColumnHeader;

