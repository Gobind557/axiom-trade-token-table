"use client";

import { ColumnHeader } from "@/components/organisms/ColumnHeader";
import { TokenCard } from "@/components/molecules/TokenCard";
import { cn } from "@/lib/utils";
import type { Token, TokenStatus } from "@/types";
import { useState } from "react";

export interface TokenColumnProps {
  status: TokenStatus;
  tokens: Token[];
  className?: string;
}

function TokenColumn({ status, tokens, className }: TokenColumnProps) {
  const [activeFilter, setActiveFilter] = useState<"P1" | "P2" | "P3" | null>(
    null
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-secondary/30 border-r border-border last:border-r-0 overflow-hidden min-h-0",
        className
      )}
    >
      {/* Column Header */}
      <ColumnHeader
        status={status}
        count={tokens.length}
        activeFilter={activeFilter}
        onFilterClick={(filter) => {
          setActiveFilter(activeFilter === filter ? null : filter);
        }}
        onSortClick={() => {
          // Sort functionality can be added here
        }}
      />

      {/* Scrollable Token Cards Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden token-column-scrollbar scroll-smooth pr-1">
        <div className="py-1 space-y-1">
          {tokens.length === 0 ? (
            <div className="text-center py-8 px-3">
              <p className="text-sm text-muted-foreground">No tokens found</p>
            </div>
          ) : (
            tokens.map((token, index) => (
              <TokenCard
                key={token.id}
                token={token}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 10}ms`,
                  animationFillMode: "both",
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenColumn;

