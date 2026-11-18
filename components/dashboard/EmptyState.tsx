import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  compact?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  compact,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center rounded-xl border border-dashed text-center",
        compact ? "px-4 py-6" : "px-6 py-14",
        className
      )}
    >
      <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h2 className="mt-4 text-sm font-medium">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-pretty text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
