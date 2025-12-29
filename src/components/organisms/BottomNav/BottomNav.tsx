"use client";

import { cn } from "@/lib/utils";
import {
  Settings,
  Wallet,
  Twitter,
  Compass,
  Activity,
  BarChart3,
  ChevronDown,
  Bell,
  Palette,
  MessageCircle,
} from "lucide-react";

export interface BottomNavProps {
  activeTab?: "wallet" | "twitter" | "discover" | "pulse" | "pnl";
  onTabChange?: (tab: "wallet" | "twitter" | "discover" | "pulse" | "pnl") => void;
  className?: string;
}

function BottomNav({
  activeTab = "pulse",
  onTabChange,
  className,
}: BottomNavProps) {
  const navItems = [
    { id: "wallet" as const, label: "Wallet", icon: Wallet, hasDot: true },
    { id: "twitter" as const, label: "Twitter", icon: Twitter, hasDot: true },
    { id: "discover" as const, label: "Discover", icon: Compass, hasDot: true },
    { id: "pulse" as const, label: "Pulse", icon: Activity, hasDot: true },
    { id: "pnl" as const, label: "PnL", icon: BarChart3, hasDot: false },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 flex items-center gap-2 overflow-x-auto flex-shrink-0",
        className
      )}
    >
      {/* PRESET 1 Button */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-blue-200 rounded text-xs font-medium transition-colors whitespace-nowrap">
        <Settings size={14} />
        <span>PRESET 1</span>
      </button>

      {/* Wallet/Balance Dropdown */}
      <button className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded text-xs text-muted-foreground transition-colors whitespace-nowrap">
        <Wallet size={16} />
        <span>1</span>
        {/* Solana Icon */}
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">S</span>
        </div>
        <span>0</span>
        <ChevronDown size={12} />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Settings */}
      <button
        className="p-2 hover:bg-accent rounded transition-colors"
        aria-label="Settings"
      >
        <Settings size={18} className="text-muted-foreground" />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Navigation Links */}
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors whitespace-nowrap",
                isActive
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.hasDot && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
              )}
              <IconComponent size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Cryptocurrency Values */}
      <div className="flex items-center gap-3 whitespace-nowrap">
        {/* Doge/Shiba icon container */}
        <div className="flex items-center gap-1 px-2 py-1 border border-amber-600/50 rounded text-xs">
          <span className="text-amber-600">🐕</span>
          <span className="text-green-500">💰</span>
        </div>

        {/* BTC */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">B</span>
          </div>
          <span className="text-xs font-medium text-orange-500">$87.2K</span>
        </div>

        {/* ETH */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">E</span>
          </div>
          <span className="text-xs text-muted-foreground">$2921</span>
        </div>

        {/* SOL */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="text-xs font-medium text-green-500">$122.88</span>
        </div>

        {/* Other values */}
        <span className="text-xs text-muted-foreground">$50.5K</span>
        <span className="text-xs text-muted-foreground">0.0252</span>
        <span className="text-xs text-muted-foreground">0.0258</span>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Connection Status */}
      <button className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50 rounded text-xs text-green-400 transition-colors whitespace-nowrap">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span>Connection is stable</span>
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* GLOBAL Dropdown */}
      <button className="flex items-center gap-1 px-2 py-1.5 hover:bg-accent rounded text-xs text-muted-foreground transition-colors whitespace-nowrap">
        <span>GLOBAL</span>
        <ChevronDown size={12} />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-border" />

      {/* Utility Icons */}
      <div className="flex items-center gap-1 ml-auto">
        <button
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-muted-foreground" />
        </button>
        <button
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Theme"
        >
          <Palette size={18} className="text-muted-foreground" />
        </button>
        <button
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Discord"
        >
          <MessageCircle size={18} className="text-muted-foreground" />
        </button>
        <button
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Twitter"
        >
          <Twitter size={18} className="text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;

