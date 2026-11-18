import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarClock, StarIcon, Sun } from "lucide-react";
import { useUpadeTask } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";
import { DateTime } from "luxon";
import { Tasks } from "@/types/categoryTypes";

/** Short, human friendly label for a due date ("Today 11:00", "Tue, Nov 24"). */
const formatDueDate = (value: Date | string) => {
  const due = DateTime.fromJSDate(new Date(value)).toLocal();
  const now = DateTime.local();
  if (due.hasSame(now, "day")) return `Today ${due.toFormat("HH:mm")}`;
  if (due.hasSame(now.plus({ days: 1 }), "day"))
    return `Tomorrow ${due.toFormat("HH:mm")}`;
  return due.toFormat(due.hasSame(now, "year") ? "ccc, LLL d" : "LLL d, yyyy");
};

const TaskItem = ({ task }: { task: Tasks }) => {
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
  const setTaskContent = useTaskDetailsStore((state) => state.setTaskContent);

  const { mutate: updateTask } = useUpadeTask();

  const isOverdue = () => {
    if (!task.isToday || !task.setTodayDate || task.completed) return false;

    const taskDateUTC = DateTime.fromJSDate(task.setTodayDate);
    const taskDateLocal = taskDateUTC.toLocal();
    const startOfToday = DateTime.local().startOf("day");

    return taskDateLocal < startOfToday;
  };

  const handleCompleteState = () => {
    const newCompletedState = !task.completed;
    const newCompletedAt = newCompletedState ? new Date().toISOString() : null;

    updateTask({
      data: {
        completed: newCompletedState,
        completedAt: newCompletedAt,
      },
      taskId: task.id,
    });
  };

  const handleImportantState = () => {
    updateTask({ data: { isImportant: !task.isImportant }, taskId: task.id });
  };

  const openDetails = () => {
    setTaskContent(task);
    toggleSheetOpen();
  };

  const dueIsPast =
    !!task.dueDate &&
    !task.completed &&
    DateTime.fromJSDate(new Date(task.dueDate)) < DateTime.local();
  const overdue = isOverdue();
  const hasMeta = task.isToday || !!task.dueDate || overdue;

  return (
    <li
      className={cn(
        "group relative flex items-start gap-3 rounded-lg border bg-card px-3 py-2.5 shadow-xs transition-[background-color,border-color,box-shadow] duration-200",
        "animate-in fade-in slide-in-from-top-1 duration-300",
        "hover:border-foreground/15 hover:bg-accent/30 has-[button[data-open-details]:focus-visible]:ring-[3px] has-[button[data-open-details]:focus-visible]:ring-ring/50"
      )}
    >
      <Checkbox
        checked={task.completed}
        onClick={handleCompleteState}
        aria-label={
          task.completed
            ? `Mark "${task.title}" as not completed`
            : `Complete "${task.title}"`
        }
        className="relative z-10 mt-0.5 size-[18px] rounded-full border-muted-foreground/40 transition-colors hover:border-primary data-[state=checked]:border-success data-[state=checked]:bg-success dark:data-[state=checked]:bg-success"
      />

      <div className="min-w-0 flex-1">
        {/* The whole row opens details via this button's stretched hit-area. */}
        <button
          type="button"
          data-open-details
          onClick={openDetails}
          className="block w-full text-left outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
          aria-label={`Open details for "${task.title}"`}
        >
          <span
            className={cn(
              "block truncate text-sm leading-5",
              task.completed && "text-muted-foreground line-through"
            )}
          >
            {task.title}
          </span>
        </button>

        {task.description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {task.description}
          </p>
        )}

        {hasMeta && !task.completed && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {task.isToday && (
              <span className="inline-flex items-center gap-1">
                <Sun className="size-3" /> My Day
              </span>
            )}
            {task.dueDate && (
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  dueIsPast && "text-destructive"
                )}
              >
                <CalendarClock className="size-3" />
                {formatDueDate(task.dueDate)}
              </span>
            )}
            {overdue && (
              <span className="inline-flex items-center rounded-full bg-destructive/10 px-1.5 py-px font-medium text-destructive">
                Overdue
              </span>
            )}
          </div>
        )}
      </div>

      <Button
        className="relative z-10 -my-1 -mr-1 size-8 shrink-0 transition-transform active:scale-90"
        variant="ghost"
        size="icon"
        onClick={handleImportantState}
        aria-label={task.isImportant ? "Remove star" : "Mark as important"}
        aria-pressed={task.isImportant}
      >
        <StarIcon
          className={cn(
            "size-4 transition-colors",
            task.isImportant
              ? "fill-important text-important"
              : "text-muted-foreground/60 group-hover:text-muted-foreground"
          )}
        />
      </Button>
    </li>
  );
};

export default TaskItem;
