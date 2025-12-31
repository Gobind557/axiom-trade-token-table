"use client";

import { memo, useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ColumnHeader } from "@/components/organisms/ColumnHeader";
import { TokenCard } from "@/components/molecules/TokenCard";
import { cn, sortTokens } from "@/lib/utils";
import type { Token, TokenStatus, SortOption } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortBy, setSortDirection } from "@/store/slices/tokensSlice";

export interface TokenColumnProps {
  status: TokenStatus;
  tokens: Token[];
  className?: string;
}

const TokenColumn = memo(function TokenColumn({
  status,
  tokens,
  className,
}: TokenColumnProps) {
  const dispatch = useAppDispatch();
  // Combine selectors with shallowEqual to prevent unnecessary re-renders
  const { sortBy, sortDirection } = useAppSelector(
    (state) => ({
      sortBy: state.tokens.sortBy[status],
      sortDirection: state.tokens.sortDirection[status],
    }),
    shallowEqual
  );

  // Sort tokens based on Redux state
  const sortedTokens = useMemo(() => {
    return sortTokens(tokens, sortBy, sortDirection);
  }, [tokens, sortBy, sortDirection]);

  const handleSortClick = useCallback(() => {
    // Cycle through sort options: null -> marketCap -> volume -> price -> holders -> transactions -> age -> null
    const sortOptions: Array<SortOption | null> = [
      null,
      "marketCap",
      "volume",
      "price",
      "holders",
      "transactions",
      "age",
    ];

    const currentIndex = sortOptions.indexOf(sortBy);

    // If clicking on the same sort option, toggle direction
    if (sortBy && currentIndex !== -1) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      dispatch(setSortDirection({ status, direction: newDirection }));
      return;
    }

    // Otherwise, move to next sort option
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    const nextSort = sortOptions[nextIndex];

    if (nextSort) {
      // If switching to a new sort option, set direction to desc
      dispatch(setSortBy({ status, sortBy: nextSort }));
      dispatch(setSortDirection({ status, direction: "desc" }));
    } else {
      // If going back to null, clear sort
      dispatch(setSortBy({ status, sortBy: null }));
    }
  }, [status, sortBy, sortDirection, dispatch]);

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden border-r border-border bg-secondary/30 last:border-r-0",
        className
      )}
    >
      {/* Column Header */}
      <ColumnHeader
        status={status}
        count={sortedTokens.length}
        onSortClick={handleSortClick}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />

      {/* Scrollable Token Cards Container */}
      <div className="token-column-scrollbar flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pr-1">
        <div className="space-y-1 py-1">
          {sortedTokens.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-muted-foreground">No tokens found</p>
            </div>
          ) : (
            sortedTokens.map((token, index) => (
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
});

TokenColumn.displayName = "TokenColumn";

export default TokenColumn;
