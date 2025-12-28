import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular";
  shimmer?: boolean;
}

function Skeleton({
  className,
  variant = "default",
  shimmer = true,
  ...props
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variantClasses = {
    default: "rounded-md",
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  const shimmerClasses = shimmer
    ? "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"
    : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        shimmerClasses,
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;

