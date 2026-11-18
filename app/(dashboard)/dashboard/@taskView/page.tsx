// TaskView.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EditTask from "@/components/TaskViews/editTask";
import TaskItem from "@/components/TaskViews/TaskItem";
import { useUiStore } from "@/store/uiStore";
import CategoryEllipsisbtn from "@/components/ui/CategoryEllipsisbtn";
import { iconMap } from "@/utils/iconSelector";
import { useTaskDataStore } from "@/store/taskDataStore";
import { Task } from "@prisma/client";
import { DateTime } from "luxon";
import {
  CalendarClock,
  CheckCheck,
  Inbox,
  ListTodo,
  LucideIcon,
  Star,
  Sun,
} from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import { TaskListSkeleton } from "@/components/dashboard/TaskListSkeleton";
import { useUserDataStatus } from "@/hooks/useUserDataStatus";

const emptyStates: Record<
  string,
  { icon: LucideIcon; title: string; description: string }
> = {
  Today: {
    icon: Sun,
    title: "Your day is clear",
    description:
      "Add a task below. Anything due today will also show up here automatically.",
  },
  Important: {
    icon: Star,
    title: "No starred tasks",
    description: "Star a task from any list to keep it here.",
  },
  Planned: {
    icon: CalendarClock,
    title: "Nothing planned",
    description: "Open a task and set a due date to see it in this view.",
  },
  Completed: {
    icon: CheckCheck,
    title: "Nothing completed yet",
    description: "Tasks you check off will collect here.",
  },
  All: {
    icon: Inbox,
    title: "No tasks yet",
    description: "Add your first task below to get started.",
  },
  __list: {
    icon: ListTodo,
    title: "This list is empty",
    description: "Add a task below to get it going.",
  },
};

const TaskView = () => {
  const tasks = useTaskDataStore((state) => state.tasks);
  const { isLoading } = useUserDataStatus();
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

  const empty = emptyStates[selectedCategory] ?? emptyStates.__list;
  const subtitle =
    selectedCategory === "Today"
      ? DateTime.now().toFormat("cccc, LLLL d")
      : `${filteredTasks.active.length} ${
          selectedCategory === "Completed" ? "completed" : "open"
        } ${filteredTasks.active.length === 1 ? "task" : "tasks"}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          key={selectedCategoryId}
          className="animate-in fade-in slide-in-from-left-1 duration-300 flex min-w-0 items-center gap-3"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <IconComponent className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">
              {selectedCategory}
            </h1>
            {!isLoading && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {selectedCategoryId.length > 10 && <CategoryEllipsisbtn />}
      </div>

      {isLoading ? (
        <TaskListSkeleton />
      ) : (
        <>
          <ul className="space-y-1.5">
            {filteredTasks.active.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </ul>

          {filteredTasks.active.length === 0 &&
            (showCompleted ? (
              <EmptyState
                compact
                icon={CheckCheck}
                title="All caught up"
                description="Everything here is done. Nice work."
              />
            ) : (
              <EmptyState
                icon={empty.icon}
                title={empty.title}
                description={empty.description}
              />
            ))}

          {showCompleted && (
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="completed" className="border-none">
                <AccordionTrigger className="justify-start gap-2 rounded-md px-1 py-2 text-muted-foreground hover:text-foreground hover:no-underline [&>svg]:order-first [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                  Completed
                  <span className="rounded-full bg-muted px-1.5 text-xs tabular-nums">
                    {filteredTasks.completed.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  <ul className="space-y-1.5">
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
