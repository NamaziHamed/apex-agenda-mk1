"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { Skeleton } from "../ui/skeleton";
import { useUserDataStatus } from "@/hooks/useUserDataStatus";
import { useTaskDataStore } from "@/store/taskDataStore";
import { Categories } from "@/types/categoryTypes";

const CategoryViewSect = () => {
  const categories = useTaskDataStore((state) => state.categories);
  const counts = useTaskDataStore((state) => state.counts);
  const { isLoading } = useUserDataStatus();

  const [views, setViews] = useState<Categories[]>([]);

  useEffect(() => {
    setViews([
      {
        id: "Today",
        title: "Today",
        icon: "Sun",
        _count: { tasks: counts.today },
        userId: "",
        createdAt: new Date(),
      },
      {
        id: "Important",
        title: "Important",
        icon: "Star",
        _count: { tasks: counts.important },
        userId: "",
        createdAt: new Date(),
      },
      {
        id: "Planned",
        title: "Planned",
        icon: "AlarmClockCheck",
        _count: { tasks: counts.planned },
        userId: "",
        createdAt: new Date(),
      },
      {
        id: "Completed",
        title: "Completed",
        icon: "ListChecks",
        _count: { tasks: counts.completed },
        userId: "",
        createdAt: new Date(),
      },
      {
        id: "All",
        title: "All",
        icon: "Infinity",
        _count: { tasks: counts.all },
        userId: "",
        createdAt: new Date(),
      },
    ]);
  }, [counts]);

  return (
    <nav aria-label="Views and lists" className="space-y-6">
      <ul className="space-y-0.5">
        {views.map((view) => (
          <CategoryItem item={view} key={view.id} />
        ))}
      </ul>

      <div>
        <h2 className="mb-1 px-2.5 text-xs font-medium text-muted-foreground">
          Lists
        </h2>
        {isLoading ? (
          <div className="space-y-1.5 px-1" aria-hidden>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        ) : categories && categories.length > 0 ? (
          <ul className="space-y-0.5">
            {categories.map((category) => (
              <CategoryItem item={category} key={category.id} />
            ))}
          </ul>
        ) : (
          <p className="px-2.5 py-1.5 text-xs text-muted-foreground">
            No lists yet. Create one to group related tasks.
          </p>
        )}
      </div>
    </nav>
  );
};

export default CategoryViewSect;
