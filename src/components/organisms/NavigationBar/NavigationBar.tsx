"use client";

import {
  HelpCircle,
  List,
  Grid,
  Bookmark,
  Volume2,
  Settings,
  Wallet,
  Bell,
  ChevronDown,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationBarProps {
  className?: string;
}

function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between w-full px-4 py-3 bg-background border-b border-border flex-shrink-0",
        className
      )}
    >
      {/* Left side - Branding */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-foreground">Pulse</span>
        {/* Solana Logo - Circular purple with S */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">S</span>
        </div>
        {/* Binance Logo - Golden square */}
        <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center gap-1.5">
        {/* Lightning bolt */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Lightning"
        >
          <Zap size={18} className="text-muted-foreground" />
        </button>

        {/* Help/Question mark */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={18} className="text-muted-foreground" />
        </button>

        {/* Display dropdown */}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/50 hover:bg-secondary rounded-md text-xs text-muted-foreground transition-colors border border-border/50">
          <List size={14} />
          <span>Display</span>
          <ChevronDown size={12} />
        </button>

        {/* Bookmark */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Bookmarks"
        >
          <Bookmark size={18} className="text-muted-foreground" />
        </button>

        {/* Grid */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Grid"
        >
          <Grid size={18} className="text-muted-foreground" />
        </button>

        {/* Volume/Speaker */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Sound"
        >
          <Volume2 size={18} className="text-muted-foreground" />
        </button>

        {/* Settings/Gear */}
        <button
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Settings"
        >
          <Settings size={18} className="text-muted-foreground" />
        </button>

        {/* Wallet with badge */}
        <button
          className="relative p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Wallet"
        >
          <Wallet size={18} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
            1
          </span>
        </button>

        {/* Notifications/Bell with badge */}
        <button
          className="relative p-2 hover:bg-accent rounded-md transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
            0
          </span>
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;

