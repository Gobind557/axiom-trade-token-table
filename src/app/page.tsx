"use client";

import { useMemo } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { TokenColumn } from "@/components/organisms/TokenColumn";
import { TokenPopup } from "@/components/molecules/TokenPopup";
import { ImagePopup } from "@/components/molecules/ImagePopup";
import { useAppSelector } from "@/store/hooks";
import { sampleTokens } from "@/data/sampleTokens";

export default function Home() {
  const selectedTokenId = useAppSelector((state) => state.ui.selectedTokenId);
  
  // Memoize token lookup to avoid recreating array on every render
  const selectedToken = useMemo(() => {
    if (!selectedTokenId) return null;
    const allTokens = [
      ...sampleTokens.new,
      ...sampleTokens["final-stretch"],
      ...sampleTokens.migrated,
    ];
    return allTokens.find((token) => token.id === selectedTokenId) || null;
  }, [selectedTokenId]);

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full min-h-0">
          {/* New Pairs Column */}
          <TokenColumn status="new" tokens={sampleTokens.new} />

          {/* Final Stretch Column */}
          <TokenColumn
            status="final-stretch"
            tokens={sampleTokens["final-stretch"]}
          />

          {/* Migrated Column */}
          <TokenColumn status="migrated" tokens={sampleTokens.migrated} />
        </div>
      </div>
      <TokenPopup token={selectedToken} />
      <ImagePopup />
    </DashboardLayout>
  );
}

