"use client";

import { useMemo, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { TokenColumn } from "@/components/organisms/TokenColumn";
import { TokenPopup } from "@/components/molecules/TokenPopup";
import { ImagePopup } from "@/components/molecules/ImagePopup";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTokens } from "@/store/slices/tokensSlice";
import { sampleTokens } from "@/data/sampleTokens";
import { useWebSocket } from "@/features/tokens/hooks/useWebSocket";

export default function Home() {
  const dispatch = useAppDispatch();
  const selectedTokenId = useAppSelector((state) => state.ui.selectedTokenId);
  
  // Get tokens from Redux store with shallowEqual to prevent unnecessary re-renders
  const tokens = useAppSelector(
    (state) => ({
      new: state.tokens.newPairs,
      "final-stretch": state.tokens.finalStretch,
      migrated: state.tokens.migrated,
    }),
    shallowEqual
  );

  // Initialize Redux store with sample tokens on mount (only once)
  const isInitialized = useRef(false);
  useEffect(() => {
    // Only initialize if store is empty and we haven't initialized yet
    if (!isInitialized.current && tokens.new.length === 0 && tokens["final-stretch"].length === 0 && tokens.migrated.length === 0) {
      dispatch(setTokens({ status: "new", tokens: sampleTokens.new }));
      dispatch(setTokens({ status: "final-stretch", tokens: sampleTokens["final-stretch"] }));
      dispatch(setTokens({ status: "migrated", tokens: sampleTokens.migrated }));
      isInitialized.current = true;
    }
  }, [dispatch, tokens]);

  // Initialize WebSocket for real-time price updates
  useWebSocket();
  
  // Memoize token lookup to avoid recreating array on every render
  const selectedToken = useMemo(() => {
    if (!selectedTokenId) return null;
    const allTokens = [
      ...tokens.new,
      ...tokens["final-stretch"],
      ...tokens.migrated,
    ];
    return allTokens.find((token) => token.id === selectedTokenId) || null;
  }, [selectedTokenId, tokens]);

  // Always use Redux tokens - they should be initialized by now
  const displayTokens = {
    new: tokens.new.length > 0 ? tokens.new : sampleTokens.new,
    "final-stretch": tokens["final-stretch"].length > 0 ? tokens["final-stretch"] : sampleTokens["final-stretch"],
    migrated: tokens.migrated.length > 0 ? tokens.migrated : sampleTokens.migrated,
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full min-h-0">
          {/* New Pairs Column */}
          <TokenColumn status="new" tokens={displayTokens.new} />

          {/* Final Stretch Column */}
          <TokenColumn
            status="final-stretch"
            tokens={displayTokens["final-stretch"]}
          />

          {/* Migrated Column */}
          <TokenColumn status="migrated" tokens={displayTokens.migrated} />
        </div>
      </div>
      <TokenPopup token={selectedToken} />
      <ImagePopup />
    </DashboardLayout>
  );
}

