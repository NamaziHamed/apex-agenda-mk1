// CategoryViewSect.tsx
"use client";
import React from "react";
import CategoryItem from "./CategoryItem";
import { Loader2 } from "lucide-react";
import { useTaskData } from "@/hooks/useTaskData";
import { useUiStore } from "@/store/uiStore";
import { Separator } from "../ui/separator";

const CategoryViewSect = () => {
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);

  const { categories, counts, isLoading } = useTaskData(
    selectedCategory,
    selectedCategoryId
  );

  const staticViews = [
    {
      id: "Today",
      title: "Today",
      icon: "Sun",
      _count: { tasks: counts?.isToday || 0 },
    },
    {
      id: "Important",
      title: "Important",
      icon: "Star",
      _count: { tasks: counts?.isImportant || 0 },
    },
    {
      id: "Planned",
      title: "Planned",
      icon: "AlarmClockCheck",
      _count: { tasks: counts?.planned || 0 },
    },
    {
      id: "Completed",
      title: "Completed",
      icon: "ListChecks",
      _count: { tasks: counts?.completed || 0 },
    },
    {
      id: "All",
      title: "All",
      icon: "Infinity",
      _count: { tasks: counts?.all || 0 },
    },
  ];

  if (isLoading) {
    return <Loader2 className="animate-spin text-blue-400" />;
  }

  return (
    <ul className="space-y-1">
      {staticViews.map((view) => (
        <CategoryItem item={view} key={view.id} />
      ))}
      <div className="relative w-full h-4 p-2">
        <Separator />
      </div>
      {categories?.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </ul>
  );
};

export default CategoryViewSect;
