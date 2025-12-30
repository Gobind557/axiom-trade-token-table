import { Button } from "@/components/atoms";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount: string | number;
  icon?: "zap" | "dollar" | "link";
  variant?: "default" | "primary" | "secondary";
}

function ActionButton({
  amount,
  icon = "zap",
  variant = "default",
  className,
  ...props
}: ActionButtonProps) {
  const variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
  };

  const displayAmount =
    typeof amount === "number" ? `${amount} SOL` : amount;

  return (
    <Button
      variant="action"
      className={cn(
        "flex items-center gap px-2 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={10} />}
      <span>{displayAmount}</span>
    </Button>
  );
}

export default ActionButton;

