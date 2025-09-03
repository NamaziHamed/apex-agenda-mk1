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

const TaskItem = ({ task }: { task: tasksChemaProps }) => {
  const { mutate: updateTask } = useUpadeTask();

  const handleCompleteState = () => {
    updateTask({ data: { completed: !task.completed }, taskId: task.id });
  };

  const handleImportantState = () => {
    updateTask({ data: { isImportant: !task.isImportant }, taskId: task.id });
  };

  return (
    <Card>
      <CardContent className="flex w-full items-center gap-3 relative">
        <Checkbox checked={task.completed} onClick={handleCompleteState} />
        <div>
          <CardTitle>{task.title}</CardTitle>
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
