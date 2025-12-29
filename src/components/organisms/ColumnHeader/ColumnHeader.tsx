"use client";

import { Icon } from "@/components/atoms";
import { ArrowDownUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TokenStatus } from "@/types";
import { COLUMN_TITLES } from "@/lib/constants";

export interface ColumnHeaderProps {
  status: TokenStatus;
  count?: number;
  activeFilter?: "P1" | "P2" | "P3" | null;
  onSortClick?: () => void;
  onFilterClick?: (filter: "P1" | "P2" | "P3") => void;
  className?: string;
}

function ColumnHeader({
  status,
  count = 0,
  activeFilter = null,
  onSortClick,
  onFilterClick,
  className,
}: ColumnHeaderProps) {
  const title = COLUMN_TITLES[status];

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

          {/* P1, P2, P3 indicators */}
          <div className="flex items-center gap-1">
            {(["P1", "P2", "P3"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterClick?.(filter)}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors",
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "text-foreground hover:text-muted-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Sort/Filter icon */}
        <button
          onClick={onSortClick}
          className="p-1.5 hover:bg-accent rounded transition-colors"
          aria-label="Sort and filter"
        >
          <ArrowDownUp size={14} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

export default ColumnHeader;

