// TaskView.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import EditTask from "@/components/TaskViews/editTask";
import TaskItem from "@/components/TaskViews/TaskItem";
import { useUiStore } from "@/store/uiStore";
import CategoryEllipsisbtn from "@/components/ui/CategoryEllipsisbtn";
import { iconMap } from "@/utils/iconSelector";
import { useTaskDataStore } from "@/store/taskDataStore";
import { Task } from "@prisma/client";

const TaskView = () => {
  const tasks = useTaskDataStore((state) => state.tasks);
  const isMobile = useUiStore((state) => state.isMobile);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);
  const selectedCategoryIcon = useUiStore(
    (state) => state.selectedCategoryIcon
  );

  const [filteredTasks, setFilteredTasks] = useState<{
    active: Task[];
    completed: Task[];
  }>({ active: [], completed: [] });

  const IconComponent =
    iconMap[selectedCategoryIcon as keyof typeof iconMap] ||
    iconMap.DefaultIcon;

  const showCompleted =
    selectedCategory !== "Completed" && filteredTasks.completed.length > 0;

  useEffect(() => {
    if (tasks) {
      switch (selectedCategory) {
        case "Today":
          return setFilteredTasks(tasks.today);
        case "Important":
          return setFilteredTasks(tasks.important);
        case "Completed":
          return setFilteredTasks(tasks.completed);
        case "Planned":
          return setFilteredTasks(tasks.planned);
        case "All":
          return setFilteredTasks(tasks.all);
        default:
          return setFilteredTasks({
            active: tasks.all.active.filter(
              (task) => task.categoryId === selectedCategoryId
            ),
            completed: tasks.all.completed.filter(
              (task) => task.categoryId === selectedCategoryId
            ),
          });
      }
    }
  }, [tasks, selectedCategory, selectedCategoryId]);
  
  return (
    <div className="h-full border relative p-2">
      {isMobile && <CategoryMobileView />}

      <div className="flex justify-between items-center">
        <h3
          className="text-blue-500 font-semibold text-2xl mb-4 md:text-3xl lg:text-4xl
        flex gap-2 items-center ms-2"
        >
          <IconComponent />
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
