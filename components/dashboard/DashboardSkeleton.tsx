import { Skeleton } from "../ui/skeleton";
import { TaskListSkeleton } from "./TaskListSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-dvh flex-col" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading your dashboard…</span>
      <div className="flex h-14 items-center gap-3 border-b px-4 sm:px-6">
        <Skeleton className="size-7 rounded-lg" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="ml-auto size-8 rounded-full" />
      </div>
      <div className="flex flex-1">
        <div className="hidden w-64 shrink-0 space-y-2 border-r bg-sidebar px-3 py-4 md:block lg:w-72">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8">
          <Skeleton className="mb-8 h-8 w-40" />
          <TaskListSkeleton />
        </div>
      </div>
    </div>
  );
}
