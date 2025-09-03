"use client";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import AddTaskInput from "@/components/TaskViews/AddTaskInput";
import TaskItem from "@/components/TaskViews/TaskItem";

import { useGettasks } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";
import { Loader2 } from "lucide-react";
import React from "react";

const taskView = () => {
  const isMobile = useUiStore((state) => state.isMobile);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);
  const { data: allTasks, isLoading } = useGettasks();

  if (isLoading) return <Loader2 className="animate-spin w-5 h-5" />;

  const filterTasks = () => {
    switch (selectedCategory) {
      case "Today":
        return allTasks?.filter((task) => task.isToday);
      case "Important":
        return allTasks?.filter((task) => task.isImportant);
      case "Completed":
        return allTasks?.filter((task) => task.completed);
      case "Planned":
        return allTasks?.filter((task) => task.dueDate);
      case "All":
        return allTasks;
      default:
        return allTasks?.filter(
          (task) => task.categoryId === selectedCategoryId
        );
    }
  };

  const filteredTasks = filterTasks();

  return (
    <div className="h-full border relative p-2">
      {isMobile && <CategoryMobileView />}
      <h3 className="text-blue-500 font-semibold text-2xl mb-4 md:text-3xl lg:text-4xl">
        {selectedCategory}
      </h3>
      <ul className="space-y-1">
        {filteredTasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <AddTaskInput view={selectedCategory} />
    </div>
  );
};

export default taskView;
