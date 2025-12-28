import * as React from "react";
import {
  Users,
  Globe,
  Search,
  Trophy,
  Eye,
  Zap,
  Clock,
  Target,
  Settings,
  Link as LinkIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName =
  | "users"
  | "globe"
  | "search"
  | "trophy"
  | "eye"
  | "zap"
  | "clock"
  | "target"
  | "settings"
  | "link"
  | "trending-up"
  | "trending-down"
  | "dollar"
  | "users-settings";

const iconMap = {
  users: Users,
  globe: Globe,
  search: Search,
  trophy: Trophy,
  eye: Eye,
  zap: Zap,
  clock: Clock,
  target: Target,
  settings: Settings,
  link: LinkIcon,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  dollar: DollarSign,
  "users-settings": Users, // Will be combined icon
} as const;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

function Icon({ name, size = 16, className, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  // Special handling for combined icons
  if (name === "users-settings") {
    return (
      <div className={cn("relative", className)} style={{ width: size, height: size }}>
        <Users size={size} className="absolute" {...props} />
        <Settings
          size={(size as number) * 0.6}
          className="absolute bottom-0 right-0"
          {...props}
        />
      </div>
    );
  }

  return (
    <IconComponent
      size={size}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  );
}

export default Icon;

