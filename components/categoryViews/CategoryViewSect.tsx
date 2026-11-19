"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { Separator } from "../ui/separator";
import { useTaskDataStore } from "@/store/taskDataStore";
import { Categories } from "@/types/categoryTypes";

const CategoryViewSect = () => {
  const categories = useTaskDataStore((state) => state.categories);
  const counts = useTaskDataStore((state) => state.counts);

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
    <ul className="space-y-1">
      {views.map((view) => (
        <CategoryItem item={view} key={view.id} />
      ))}
      <li role="separator" className="relative w-full h-4 p-2">
        <Separator />
      </li>
      {categories?.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </ul>
  );
};

export default CategoryViewSect;
