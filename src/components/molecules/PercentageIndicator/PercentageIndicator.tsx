import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/atoms";

export interface PercentageIndicatorProps {
  value: number;
  icon?: IconName;
  label?: string;
  variant?: "positive" | "negative" | "neutral";
  showIcon?: boolean;
  className?: string;
}

function PercentageIndicator({
  value,
  icon,
  label,
  variant,
  showIcon = true,
  className,
}: PercentageIndicatorProps) {
  // Determine variant from value if not explicitly provided
  const determinedVariant =
    variant ||
    (value > 0 ? "positive" : value < 0 ? "negative" : "neutral");

  const colorClasses = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground",
  };

  const displayValue = `${Math.abs(value)}%`;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        colorClasses[determinedVariant],
        className
      )}
    >
      {showIcon && icon && (
        <Icon name={icon} size={12} className="flex-shrink-0" />
      )}
      <span>{displayValue}</span>
      {label && <span className="text-muted-foreground">{label}</span>}
    </div>
  );
}

export default PercentageIndicator;

