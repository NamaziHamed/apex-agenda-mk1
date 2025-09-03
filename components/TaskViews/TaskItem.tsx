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

const TaskItem = ({ task }: { task: tasksChemaProps }) => {
  return (
    <Card>
      <CardContent className="flex w-full items-center gap-3 relative">
        <Checkbox checked={task.completed} />
        <div>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </div>
        <StarIcon className="absolute right-3" />
      </CardContent>
    </Card>
  );
};

export default TaskItem;
