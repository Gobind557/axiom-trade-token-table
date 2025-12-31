/**
 * Hook to manage WebSocket connection for real-time price updates
 */

import { useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateToken } from "@/store/slices/tokensSlice";
import { websocketService } from "../services/websocketService";
import type { TokenStatus } from "@/types";

export function useWebSocket() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(
    (state) => ({
      new: state.tokens.newPairs,
      "final-stretch": state.tokens.finalStretch,
      migrated: state.tokens.migrated,
    }),
    shallowEqual
  );

  const tokensRef = useRef(tokens);

  // Keep tokens ref up to date
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    // Collect all tokens
    const allTokens = [
      ...tokensRef.current.new,
      ...tokensRef.current["final-stretch"],
      ...tokensRef.current.migrated,
    ];

    if (allTokens.length === 0) {
      // If no tokens yet, wait a bit and try again
      const timeout = setTimeout(() => {
        const retryTokens = [
          ...tokensRef.current.new,
          ...tokensRef.current["final-stretch"],
          ...tokensRef.current.migrated,
        ];
        if (retryTokens.length > 0) {
          websocketService.start(retryTokens);
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Start WebSocket service
    websocketService.start(allTokens);

    // Subscribe to price updates
    const unsubscribe = websocketService.subscribe((updates) => {
      // Get fresh tokens from ref (which is kept up to date)
      const currentTokens = {
        new: tokensRef.current.new,
        "final-stretch": tokensRef.current["final-stretch"],
        migrated: tokensRef.current.migrated,
      };

      updates.forEach((update, tokenId) => {
        // Find which status this token belongs to
        let status: TokenStatus | null = null;
        let token: (typeof allTokens)[0] | undefined;

        // Use current tokens from ref (which is kept up to date)
        for (const [tokenStatus, tokenList] of Object.entries(currentTokens)) {
          const found = tokenList.find((t) => t.id === tokenId);
          if (found) {
            status = tokenStatus as TokenStatus;
            token = found;
            break;
          }
        }

        if (status && token) {
          // Update token with new price - use the update price directly
          dispatch(
            updateToken({
              status,
              token: {
                ...token,
                price: update.price,
                priceChange24h: update.priceChange24h,
              },
            })
          );
        }
      });
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      websocketService.stop();
    };
  }, [dispatch, tokens]); // Add tokens to deps so it restarts when tokens are initialized

  // Update tokens in service when they change (but don't restart if already running)
  useEffect(() => {
    const allTokens = [
      ...tokensRef.current.new,
      ...tokensRef.current["final-stretch"],
      ...tokensRef.current.migrated,
    ];

    if (allTokens.length > 0) {
      // Update the service's token map with latest tokens from Redux
      websocketService.updateTokens(allTokens);
    }
  }, [tokens]);
}
