"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms";
import type { Token } from "@/types";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setModalOpen, setSelectedToken, setPopupPosition } from "@/store/slices/uiSlice";

export interface TokenPopupProps {
  token: Token | null;
}

function TokenPopup({ token }: TokenPopupProps) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isModalOpen);
  const position = useAppSelector((state) => state.ui.popupPosition);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  // All hooks must be called before any conditional returns
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear any pending close timeout when mouse enters popup
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flicker
    closeTimeoutRef.current = setTimeout(() => {
      dispatch(setModalOpen(false));
      dispatch(setSelectedToken(null));
      dispatch(setPopupPosition(null));
      closeTimeoutRef.current = null;
    }, 150);
  };

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    dispatch(setModalOpen(false));
    dispatch(setSelectedToken(null));
    dispatch(setPopupPosition(null));
  };

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
    metrics,
  } = token;

  // Generate social media handle from token name (example)
  const socialHandle = `@${name.toLowerCase().replace(/\s+/g, "")}bnb`;
  const socialUrl = `https://x.com/${socialHandle.replace("@", "")}`;

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 50,
  };

  const popupContent = (
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={popupStyle}
      className={cn(
        "w-full max-w-sm rounded-lg border border-border bg-secondary/95 p-0 shadow-lg transition-all duration-200",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
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
                    <img
                      src={imageUrl}
                      alt={name}
                      className="h-full w-full object-cover"
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
              <div className="flex-1 min-w-0">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-foreground truncate">{name}</h3>
                  <Icon name="link" size={10} className="text-muted-foreground flex-shrink-0" />
                </div>
                <p className="mb-1.5 text-xs text-muted-foreground truncate">
                  {socialHandle}
                </p>
                <p className="text-xs text-foreground line-clamp-2">
                  Transform Your Look with ${symbol} Upload your photo and try
                  on stunning hairstyles instantly with our AI-powered tool
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
                  <p className="text-[10px] font-mono text-muted-foreground">
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
}

export default TokenPopup;

