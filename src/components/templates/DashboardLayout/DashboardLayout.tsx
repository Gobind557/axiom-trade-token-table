"use client";

import { NavigationBar } from "@/components/organisms/NavigationBar";
import { BottomNav } from "@/components/organisms/BottomNav";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<"wallet" | "twitter" | "discover" | "pulse" | "pnl">(
    "pulse"
  );

  return (
    <div className={cn("h-screen bg-background flex flex-col overflow-hidden", className)}>
      {/* Top Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden pb-20 min-h-0">{children}</main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default DashboardLayout;

