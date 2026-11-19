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
import { useGetUserData } from "@/hooks/useTasks";
import { Task } from "@prisma/client";
import { DateTime } from "luxon";
import { ClipboardList, Loader2 } from "lucide-react";

const BUILT_IN_VIEWS = ["Today", "Important", "Planned", "Completed", "All"];

const emptyMessages: Record<string, string> = {
  Today: "Nothing planned for today. Add a task below.",
  Important: "Star a task to see it here.",
  Planned: "No tasks with a due date yet.",
  Completed: "Nothing completed yet.",
  All: "No tasks yet. Add your first one below.",
};

const TaskView = () => {
  const tasks = useTaskDataStore((state) => state.tasks);
  const { isPending } = useGetUserData();
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

  const isBuiltInView = BUILT_IN_VIEWS.includes(selectedCategoryId);
  const showCompleted =
    selectedCategoryId !== "Completed" && filteredTasks.completed.length > 0;

  // Switch on the id, not the title: a list named "Today" is still a list.
  useEffect(() => {
    if (tasks) {
      switch (selectedCategoryId) {
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
  }, [tasks, selectedCategoryId]);

  const count = filteredTasks.active.length;
  const subtitle =
    selectedCategoryId === "Today"
      ? DateTime.now().toFormat("cccc, LLLL d")
      : `${count} ${selectedCategoryId === "Completed" ? "completed" : "open"} ${
          count === 1 ? "task" : "tasks"
        }`;

  return (
    <div className="relative">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1">
          {isMobile && <CategoryMobileView />}
          <div className="ms-2 min-w-0">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-500 md:text-3xl lg:text-4xl">
              <IconComponent className="shrink-0" />
              <span className="truncate">{selectedCategory}</span>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {!isBuiltInView && <CategoryEllipsisbtn />}
      </div>

      {isPending ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {filteredTasks.active.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </ul>

          {count === 0 && (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
              <ClipboardList className="size-6" />
              {showCompleted
                ? "All done here. Nice work!"
                : emptyMessages[selectedCategoryId] ??
                  "This list is empty. Add a task below."}
            </div>
          )}

          {showCompleted && (
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="completed" className="border-none">
                <AccordionTrigger className="ps-4">
                  Completed ({filteredTasks.completed.length})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {filteredTasks.completed.map((task) => (
                      <TaskItem task={task} key={task.id} />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </>
      )}

      <EditTask />
    </div>
  );
};

export default TaskView;
