import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StarIcon } from "lucide-react";
import { tasksChemaProps } from "@/lib/validations";
import { useUpadeTask } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";

const TaskItem = ({ task }: { task: tasksChemaProps }) => {
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
  const setTaskContent = useTaskDetailsStore((state) => state.setTaskContent);

  const { mutate: updateTask } = useUpadeTask();

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

  const handleCardClick = (e: any) => {
    if (
      e.target.closest("button") ||
      e.target.closest('input[type="checkbox"]')
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
        <Button
          className="absolute right-3 active:scale-90 transition-all duration-300 "
          variant={"ghost"}
          onClick={handleImportantState}
        >
          <StarIcon
            fill={task.isImportant ? "#fca5a5" : ""}
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
