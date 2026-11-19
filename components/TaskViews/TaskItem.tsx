import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BellRing, CalendarClock, StarIcon } from "lucide-react";
import { useUpadeTask } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";
import { DateTime } from "luxon";
import { Badge } from "../ui/badge";
import { Tasks } from "@/types/categoryTypes";

/** Short label for a date: "Today 14:00", "Tomorrow 09:30", "Tue, Nov 24". */
export const formatShortDate = (value: Date | string) => {
  const date = DateTime.fromJSDate(new Date(value));
  const now = DateTime.local();
  if (date.hasSame(now, "day")) return `Today ${date.toFormat("HH:mm")}`;
  if (date.hasSame(now.plus({ days: 1 }), "day"))
    return `Tomorrow ${date.toFormat("HH:mm")}`;
  return date.toFormat(date.hasSame(now, "year") ? "ccc, LLL d" : "LLL d, yyyy");
};

const TaskItem = ({ task }: { task: Tasks }) => {
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
  const setTaskContent = useTaskDetailsStore((state) => state.setTaskContent);

  const { mutate: updateTask } = useUpadeTask();

  const isOverdue = () => {
    if (!task.isToday || !task.setTodayDate || task.completed) return false;

    const taskDateLocal = DateTime.fromJSDate(new Date(task.setTodayDate));
    const startOfToday = DateTime.local().startOf("day");

    return taskDateLocal < startOfToday;
  };

  const dueIsPast =
    !!task.dueDate &&
    !task.completed &&
    DateTime.fromJSDate(new Date(task.dueDate)) < DateTime.local();
  const reminderIsUpcoming =
    !!task.reminder &&
    !task.completed &&
    DateTime.fromJSDate(new Date(task.reminder)) > DateTime.local();

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    openDetails();
  };

  return (
    <li>
      <Card className="cursor-pointer py-3 transition-colors hover:border-blue-500/40 hover:bg-accent/40">
        <CardContent
          role="button"
          tabIndex={0}
          aria-label={`Open "${task.title}"`}
          className={cn(
            "flex w-full items-center gap-4 px-4 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-lg",
            task.completed && "text-muted-foreground"
          )}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openDetails();
            }
          }}
        >
          <Checkbox
            checked={task.completed}
            onClick={handleCompleteState}
            aria-label={task.completed ? "Mark as not done" : "Mark as done"}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle
              className={cn("truncate leading-6", task.completed && "line-through")}
            >
              {task.title}
            </CardTitle>
            {task.description && (
              <CardDescription className="line-clamp-1">
                {task.description}
              </CardDescription>
            )}
            {!task.completed && (task.dueDate || reminderIsUpcoming) && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {task.dueDate && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      dueIsPast && "text-destructive"
                    )}
                  >
                    <CalendarClock className="size-3" />
                    {formatShortDate(task.dueDate)}
                  </span>
                )}
                {reminderIsUpcoming && task.reminder && (
                  <span className="inline-flex items-center gap-1">
                    <BellRing className="size-3" />
                    {formatShortDate(task.reminder)}
                  </span>
                )}
              </div>
            )}
          </div>
          {isOverdue() && (
            <Badge variant={"destructive"} className="text-xs">
              Overdue
            </Badge>
          )}
          <Button
            className="shrink-0 transition-all duration-300 active:scale-90"
            variant={"ghost"}
            size="icon"
            onClick={handleImportantState}
            aria-label={task.isImportant ? "Remove importance" : "Mark as important"}
            aria-pressed={task.isImportant}
          >
            <StarIcon
              className={cn(
                task.isImportant
                  ? "fill-red-300 text-red-300"
                  : "fill-transparent text-card-foreground"
              )}
            />
          </Button>
        </CardContent>
      </Card>
    </li>
  );
};

export default TaskItem;
