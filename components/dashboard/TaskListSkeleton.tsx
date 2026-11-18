import { Skeleton } from "../ui/skeleton";

export function TaskListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul className="space-y-1.5" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="flex items-center gap-3 rounded-lg border bg-card px-3 py-3"
        >
          <Skeleton className="size-5 rounded-full" />
          <Skeleton
            className="h-4"
            style={{ width: `${55 - ((i * 13) % 30)}%` }}
          />
          <Skeleton className="ml-auto size-4" />
        </li>
      ))}
    </ul>
  );
}
