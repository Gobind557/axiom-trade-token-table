"use client";

import { memo, useEffect, useRef, useMemo, useState, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms";
import type { Token } from "@/types";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setModalOpen,
  setSelectedToken,
  setPopupPosition,
} from "@/store/slices/uiSlice";

export interface TokenPopupProps {
  token: Token | null;
}

const TokenPopup = memo(function TokenPopup({ token }: TokenPopupProps) {
  const dispatch = useAppDispatch();
  // Combine selectors with shallowEqual to prevent unnecessary re-renders
  const { isOpen, position } = useAppSelector(
    (state) => ({
      isOpen: state.ui.isModalOpen,
      position: state.ui.popupPosition,
    }),
    shallowEqual
  );
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Clear any pending close timeout when mouse enters popup
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Add a small delay before closing to prevent flicker
    closeTimeoutRef.current = setTimeout(() => {
      dispatch(setModalOpen(false));
      dispatch(setSelectedToken(null));
      dispatch(setPopupPosition(null));
      closeTimeoutRef.current = null;
    }, 150);
  }, [dispatch]);

  const handleClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    dispatch(setModalOpen(false));
    dispatch(setSelectedToken(null));
    dispatch(setPopupPosition(null));
  }, [dispatch]);

  // Memoize values before conditional return (all hooks must be called unconditionally)
  const socialHandle = useMemo(
    () => (token ? `@${token.name.toLowerCase().replace(/\s+/g, "")}bnb` : ""),
    [token]
  );
  const socialUrl = useMemo(
    () => `https://x.com/${socialHandle.replace("@", "")}`,
    [socialHandle]
  );

  const popupStyle: React.CSSProperties = useMemo(
    () => ({
      position: "fixed",
      top: position ? `${position.top}px` : "0",
      left: position ? `${position.left}px` : "0",
      zIndex: 50,
    }),
    [position]
  );

  // Now we can do conditional returns after all hooks
  if (!isOpen || !token || !position || !mounted) return null;

  const {
    name,
    symbol,
    imageUrl,
    address,
    age,
    marketCap,
    volume,
    holders,
    transactions,
    fee,
  } = token;

  const popupContent = (
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={popupStyle}
      className={cn(
        "w-full max-w-sm rounded-lg border border-border bg-secondary/95 p-0 shadow-lg transition-all duration-200",
        isOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      )}
    >
      {/* Main content */}
      <div className="relative p-4">
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Profile Card */}
        <div className="mb-3 flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-background">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  unoptimized={imageUrl.startsWith("data:")}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-sm font-bold text-white">
                    {symbol?.[0]?.toUpperCase() || name[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-1.5">
              <h3 className="truncate text-sm font-bold text-foreground">
                {name}
              </h3>
              <Icon
                name="link"
                size={10}
                className="flex-shrink-0 text-muted-foreground"
              />
            </div>
            <p className="mb-1.5 truncate text-xs text-muted-foreground">
              {socialHandle}
            </p>
            <p className="line-clamp-2 text-xs text-foreground">
              Transform Your Look with ${symbol} Upload your photo and try on
              stunning hairstyles instantly with our AI-powered tool
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-3 space-y-1.5 border-t border-border pt-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Joined {age}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-foreground">
              <span className="font-semibold">{holders}</span> Following
            </span>
            <span className="text-foreground">
              <span className="font-semibold">{transactions}</span> Followers
            </span>
          </div>
        </div>

        {/* Token Metrics */}
        <div className="mb-3 space-y-1.5 border-t border-border pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-muted-foreground">Market Cap</p>
              <p className="text-xs font-semibold text-green-500">
                {formatCurrency(marketCap)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Volume</p>
              <p className="text-xs font-semibold text-green-500">
                {formatCurrency(volume)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Fee</p>
              <p className="text-xs font-semibold text-foreground">
                {fee.toFixed(3)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Address</p>
              <p className="font-mono text-[10px] text-muted-foreground">
                {truncateAddress(address)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <span>See profile on X</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
});

TokenPopup.displayName = "TokenPopup";

export default TokenPopup;
