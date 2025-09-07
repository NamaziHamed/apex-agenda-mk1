// TaskView.tsx
"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import EditTask from "@/components/TaskViews/editTask";
import TaskItem from "@/components/TaskViews/TaskItem";
import { useTaskData } from "@/hooks/useTaskData";
import { useUiStore } from "@/store/uiStore";
import { Loader2 } from "lucide-react";
import CategoryEllipsisbtn from "@/components/ui/CategoryEllipsisbtn";

const TaskView = () => {
  const isMobile = useUiStore((state) => state.isMobile);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);

  const { filteredTasks, isLoading } = useTaskData(
    selectedCategory,
    selectedCategoryId
  );

  if (isLoading) {
    return <Loader2 className="animate-spin w-5 h-5" />;
  }

  const showCompleted =
    selectedCategory !== "Completed" && filteredTasks.completed.length > 0;

  return (
    <div className="h-full border relative p-2">
      {isMobile && <CategoryMobileView />}

      <div className="flex justify-between items-center">
        <h3 className="text-blue-500 font-semibold text-2xl mb-4 md:text-3xl lg:text-4xl">
          {selectedCategory}
        </h3>
        {selectedCategoryId.length > 10 && <CategoryEllipsisbtn />}
      </div>

      <ul className="space-y-1">
        {filteredTasks.active.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </ul>

      {showCompleted && (
        <Accordion type="single" collapsible>
          <AccordionItem value="completed">
            <AccordionTrigger className="ps-4">
              Completed ({filteredTasks.completed.length})
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {filteredTasks.completed.map((task) => (
                  <TaskItem task={task} key={task.id} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <EditTask />
    </div>
  );
};

export default TaskView;
