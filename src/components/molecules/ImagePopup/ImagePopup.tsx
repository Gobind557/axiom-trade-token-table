"use client";

import { memo, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setImagePopupOpen,
  setImagePopupPosition,
  setImagePopupUrl,
} from "@/store/slices/uiSlice";

const ImagePopup = memo(function ImagePopup() {
  const dispatch = useAppDispatch();
  // Combine selectors with shallowEqual to prevent unnecessary re-renders
  const { isOpen, imageUrl, position } = useAppSelector(
    (state) => ({
      isOpen: state.ui.isImagePopupOpen,
      imageUrl: state.ui.imagePopupUrl,
      position: state.ui.imagePopupPosition,
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
      dispatch(setImagePopupOpen(false));
      dispatch(setImagePopupUrl(null));
      dispatch(setImagePopupPosition(null));
      closeTimeoutRef.current = null;
    }, 150);
  }, [dispatch]);

  const handleClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    dispatch(setImagePopupOpen(false));
    dispatch(setImagePopupUrl(null));
    dispatch(setImagePopupPosition(null));
  }, [dispatch]);

  // Memoize popup style before conditional returns
  const popupStyle: React.CSSProperties = useMemo(
    () => ({
      position: "fixed",
      top: position ? `${position.top}px` : "0",
      left: position ? `${position.left}px` : "0",
      zIndex: 50,
    }),
    [position]
  );

  if (!isOpen || !imageUrl || !position || !mounted) return null;
  if (typeof document === "undefined") return null;

  const popupContent = (
    <div
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={popupStyle}
      className={cn(
        "w-80 overflow-hidden rounded-lg border border-border bg-secondary/95 p-0 shadow-lg transition-all duration-200",
        isOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      )}
    >
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 z-10 rounded-sm bg-black/50 opacity-70 ring-offset-background backdrop-blur-sm transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>
        {imageUrl.startsWith("data:") ? (
          // For data URLs (SVG placeholders), use regular img tag
          <img
            src={imageUrl}
            alt="Enlarged token image"
            className="h-auto max-h-96 w-full object-contain"
            onError={() => {
              dispatch(setImagePopupOpen(false));
              dispatch(setImagePopupUrl(null));
              dispatch(setImagePopupPosition(null));
            }}
          />
        ) : (
          // For regular URLs, use Next.js Image component
          <Image
            src={imageUrl}
            alt="Enlarged token image"
            width={320}
            height={320}
            className="h-auto max-h-96 w-full object-contain"
            unoptimized
            onError={() => {
              dispatch(setImagePopupOpen(false));
              dispatch(setImagePopupUrl(null));
              dispatch(setImagePopupPosition(null));
            }}
          />
        )}
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
});

ImagePopup.displayName = "ImagePopup";

export default ImagePopup;
