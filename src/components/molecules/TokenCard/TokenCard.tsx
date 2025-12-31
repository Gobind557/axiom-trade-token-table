"use client";

import { memo, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon, Tooltip } from "@/components/atoms";
import { ActionButton } from "@/components/molecules/ActionButton";
import type { Token } from "@/types";
import { formatCurrency, formatNumber, truncateAddress } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import {
  setModalOpen,
  setSelectedToken,
  setPopupPosition,
  setImagePopupOpen,
  setImagePopupUrl,
  setImagePopupPosition,
} from "@/store/slices/uiSlice";

export interface TokenCardProps {
  token: Token;
  className?: string;
  style?: React.CSSProperties;
}

const TokenCard = memo(function TokenCard({
  token,
  className,
  style,
}: TokenCardProps) {
  const dispatch = useAppDispatch();
  const {
    name,
    symbol,
    imageUrl,
    address,
    age,
    marketCap,
    volume,
    fee,
    transactions,
    metrics,
    holders,
  } = token;

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleUsersIconHover = useCallback(() => {
    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Calculate position below the token card
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 384; // max-w-sm = 384px
      const viewportWidth = window.innerWidth;

      // Position popup below the card, slightly offset
      let top = rect.bottom + 8;
      let left = rect.left;

      // Adjust if popup would overflow right edge
      if (left + popupWidth > viewportWidth) {
        left = viewportWidth - popupWidth - 16; // 16px padding from edge
      }

      // Adjust if popup would overflow left edge
      if (left < 16) {
        left = 16;
      }

      // Adjust if popup would overflow bottom (position above instead)
      const viewportHeight = window.innerHeight;
      if (top + 300 > viewportHeight && rect.top > 300) {
        top = rect.top - 300 - 8; // Position above
      }

      dispatch(setPopupPosition({ top, left }));
      dispatch(setSelectedToken(token.id));
      dispatch(setModalOpen(true));
    } else {
      dispatch(setSelectedToken(token.id));
      dispatch(setModalOpen(true));
    }
  }, [token.id, dispatch]);

  const handleUsersIconLeave = useCallback(() => {
    // Add a delay before closing to allow moving to the popup
    hoverTimeoutRef.current = setTimeout(() => {
      dispatch(setModalOpen(false));
      dispatch(setSelectedToken(null));
      dispatch(setPopupPosition(null));
      hoverTimeoutRef.current = null;
    }, 150); // Reduced delay to prevent blinking
  }, [dispatch]);

  // Memoize placeholder image creation
  const placeholderImage = useMemo(() => {
    if (imageUrl) return null;
    const initial = (symbol || name)[0]?.toUpperCase() || "?";
    const svg = `
      <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" fill="#1e293b"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initial}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [imageUrl, symbol, name]);

  const handleImageHover = useCallback(() => {
    // Clear any pending close timeout
    if (imageHoverTimeoutRef.current) {
      clearTimeout(imageHoverTimeoutRef.current);
      imageHoverTimeoutRef.current = null;
    }

    // Calculate position to the right of the image
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const popupWidth = 320; // w-80 = 320px
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position popup to the right of the image
      let top = rect.top;
      let left = rect.right + 8;

      // Adjust if popup would overflow right edge
      if (left + popupWidth > viewportWidth) {
        // Position to the left instead
        left = rect.left - popupWidth - 8;
        // If still doesn't fit, center it
        if (left < 16) {
          left = Math.max(16, (viewportWidth - popupWidth) / 2);
        }
      }

      // Adjust if popup would overflow bottom
      if (top + 400 > viewportHeight) {
        top = viewportHeight - 400 - 16;
      }

      // Adjust if popup would overflow top
      if (top < 16) {
        top = 16;
      }

      // Use imageUrl if available, otherwise use placeholder
      const urlToShow = imageUrl || placeholderImage;

      if (urlToShow) {
        dispatch(setImagePopupPosition({ top, left }));
        dispatch(setImagePopupUrl(urlToShow));
        dispatch(setImagePopupOpen(true));
      }
    }
  }, [imageUrl, placeholderImage, dispatch]);

  const handleImageLeave = useCallback(() => {
    // Add a delay before closing to allow moving to the popup
    imageHoverTimeoutRef.current = setTimeout(() => {
      dispatch(setImagePopupOpen(false));
      dispatch(setImagePopupUrl(null));
      dispatch(setImagePopupPosition(null));
      imageHoverTimeoutRef.current = null;
    }, 150);
  }, [dispatch]);

  // Memoize display address
  const displayAddress = useMemo(() => truncateAddress(address), [address]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "mx-0 w-full animate-slide-up rounded-lg border border-border bg-secondary/30 p-2 transition-all duration-300 hover:bg-secondary/50",
        className
      )}
      style={style}
    >
      <div className="flex gap-2">
        {/* Left Section - Image/Icon */}
        <div className="flex-shrink-0">
          <div
            ref={imageRef}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-background/50 transition-opacity hover:opacity-90"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                width={80}
                height={80}
                className="pointer-events-none h-full w-full object-cover"
                unoptimized={imageUrl.startsWith("data:")}
              />
            ) : (
              <span className="pointer-events-none text-lg font-bold text-foreground">
                {symbol?.[0]?.toUpperCase() || name[0]?.toUpperCase() || "?"}
              </span>
            )}
            {/* Red badge indicator */}
            <div className="pointer-events-none absolute -bottom-0.5 -left-0.5 flex h-3 w-3 items-center justify-center rounded-full border border-background bg-red-500">
              <div className="h-1 w-1 rounded-full bg-white" />
            </div>
          </div>
          <p className="mt-0.5 font-mono text-[9px] leading-tight text-muted-foreground">
            {displayAddress}
          </p>
        </div>

        {/* Middle Section - Name & Metrics */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Name Row */}
          <div className="mb-0.5 flex items-center gap-1.5">
            <h3 className="text-s truncate font-semibold text-foreground">
              {name}
            </h3>
            <span className="truncate text-[11px] text-muted-foreground">
              {symbol}
            </span>
            <Tooltip content="Copy token name" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon name="copy" size={10} className="text-muted-foreground" />
              </button>
            </Tooltip>
          </div>

          {/* Time and Icons Row */}
          <div className="mb-1 mt-4 flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] font-medium text-green-500">
              {age}
            </span>
            <Tooltip content="Search token" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon
                  name="search"
                  size={13}
                  className="text-muted-foreground"
                />
              </button>
            </Tooltip>
            <Tooltip content="View token profile" side="bottom">
              <button
                onMouseEnter={handleUsersIconHover}
                onMouseLeave={handleUsersIconLeave}
                className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent"
                aria-label="View token profile"
              >
                <Icon
                  name="users"
                  size={13}
                  className="text-muted-foreground"
                />
              </button>
            </Tooltip>
            <Tooltip content="View on explorer" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon name="link" size={13} className="text-muted-foreground" />
              </button>
            </Tooltip>
            <Tooltip content="Copy address" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon name="copy" size={13} className="text-muted-foreground" />
              </button>
            </Tooltip>
            <Tooltip content="View achievements" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon
                  name="trophy"
                  size={13}
                  className="text-muted-foreground"
                />
              </button>
            </Tooltip>
            <Tooltip content="View details" side="bottom">
              <button className="flex-shrink-0 rounded p-0.5 transition-colors hover:bg-accent">
                <Icon name="eye" size={13} className="text-muted-foreground" />
              </button>
            </Tooltip>
            {holders > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {holders}
              </span>
            )}
          </div>

          {/* Percentage Indicators Row - aligned with button */}
          <div className="mt-5 flex flex-wrap items-center gap-1">
            {/* Holders Percent */}
            <div
              className={cn(
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium transition-all duration-200",
                metrics.holdersPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="star"
                size={13}
                className={metrics.holdersPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.holdersPercent}%</span>
            </div>

            {/* Liquidity Percent */}
            <div
              className={cn(
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium transition-all duration-200",
                metrics.liquidityPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="chef-hat"
                size={13}
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
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium transition-all duration-200",
                metrics.targetPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="target"
                size={13}
                className={metrics.targetPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.targetPercent}%</span>
            </div>

            {/* Gear Percent */}
            <div
              className={cn(
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium transition-all duration-200",
                metrics.gearPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="ghost"
                size={13}
                className={metrics.gearPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.gearPercent}%</span>
            </div>

            {/* Holders Gear Percent */}
            <div
              className={cn(
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium transition-all duration-200",
                metrics.holdersGearPercent > 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              <Icon
                name="gift"
                size={13}
                className={metrics.holdersGearPercent > 0 ? "text-white" : ""}
              />
              <span>{metrics.holdersGearPercent}%</span>
            </div>
          </div>
        </div>

        {/* Right Section - Market Data & Action */}
        <div className="flex flex-shrink-0 flex-col items-end">
          {/* Market Data - Compact */}
          <div className="flex flex-col items-end gap-0">
            {/* Market Cap */}
            <div className="text-right">
              <span className="block text-[7px] leading-none text-muted-foreground">
                MC
              </span>
              <p className="text-[11px] font-semibold leading-tight text-green-500">
                {formatCurrency(marketCap)}
              </p>
            </div>

            {/* Volume */}
            <div className="text-right">
              <span className="block text-[9px] leading-none text-muted-foreground">
                V
              </span>
              <p className="text-[11px] font-semibold leading-tight text-green-500">
                {formatCurrency(volume)}
              </p>
            </div>

            {/* Fees and Transactions */}
            <div className="flex items-center gap-1.5 text-right">
              <div className="flex flex-col items-end">
                <span className="block text-[9px] leading-none text-muted-foreground">
                  F
                </span>
                <div className="flex items-center gap-0.5">
                  <Icon name="dollar" size={9} className="text-purple-500" />
                  <span className="text-[8px] font-medium leading-tight text-foreground">
                    {fee.toFixed(3)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="block text-[8px] leading-none text-muted-foreground">
                  TX
                </span>
                <p className="text-[10px] leading-tight text-muted-foreground">
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
});

TokenCard.displayName = "TokenCard";

export default TokenCard;
