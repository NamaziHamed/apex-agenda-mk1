import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StarIcon } from "lucide-react";
import { useUpadeTask } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";
import { DateTime } from "luxon";
import { Badge } from "../ui/badge";
import { Tasks } from "@/types/categoryTypes";

const TaskItem = ({ task }: { task: Tasks }) => {
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
  const setTaskContent = useTaskDetailsStore((state) => state.setTaskContent);

  const { mutate: updateTask } = useUpadeTask();


const isOverdue = () => {
  if (!task.isToday || !task.setTodayDate || task.completed) return false;

  const taskDateUTC = DateTime.fromJSDate(task.setTodayDate);
  const taskDateLocal = taskDateUTC.toLocal();
  const startOfToday = DateTime.local().startOf('day');

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest('input[type="checkbox"]')
    )
      return;
    setTaskContent(task);
    toggleSheetOpen();
  };

  return (
    <Card>
      <CardContent
        className={cn(
          "flex w-full items-center gap-5 relative",
          task.completed && "text-muted-foreground"
        )}
        onClick={(e) => handleCardClick(e)}
      >
        <Checkbox checked={task.completed} onClick={handleCompleteState} />
        <div className="flex flex-col gap-2">
          <CardTitle className={`${task.completed && "line-through"}`}>
            {task.title}
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </div>
        {isOverdue() && (
          <Badge variant={"destructive"} className="text-xs">
            Overdue
          </Badge>
        )}
        <Button
          className="absolute right-3 active:scale-90 transition-all duration-300 "
          variant={"ghost"}
          onClick={handleImportantState}
        >
          <StarIcon
            fill={task.isImportant ? "#fca5a5" : "#ffffff"}
            className={cn(
              "",
              task.isImportant ? "text-red-300 " : "text-card-foreground"
            )}
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
