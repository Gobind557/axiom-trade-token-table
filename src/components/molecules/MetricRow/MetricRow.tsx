import { Icon, type IconName } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface MetricItem {
  icon?: IconName;
  label?: string;
  value: string | number;
  href?: string;
}

export interface MetricRowProps {
  metrics: MetricItem[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

function MetricRow({ metrics, className, size = "md" }: MetricRowProps) {
  const sizeClasses = {
    sm: "text-xs gap-2",
    md: "text-sm gap-3",
    lg: "text-base gap-4",
  };

  return (
    <div
      className={cn(
        "flex items-center flex-wrap",
        sizeClasses[size],
        className
      )}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={cn(
            "inline-flex items-center gap-1 text-muted-foreground",
            metric.href && "hover:text-foreground cursor-pointer transition-colors"
          )}
        >
          {metric.icon && (
            <Icon name={metric.icon} size={size === "sm" ? 12 : 14} />
          )}
          {metric.label && <span>{metric.label}</span>}
          <span className="font-medium">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}

export default MetricRow;

