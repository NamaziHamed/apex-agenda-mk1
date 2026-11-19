"use client";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useUiStore } from "@/store/uiStore";
import { LucideIcon, icons } from "lucide-react";
import { Categories } from "@/types/categoryTypes";

// Static views mapping
const staticIconMap: Record<string, LucideIcon> = {
  Today: icons.Sun,
  Important: icons.Star,
  Planned: icons.Timer,
  Completed: icons.CheckCheck,
  All: icons.Infinity,
  Tasks: icons.List,
};

const CategoryItem = ({ item }: { item: Categories }) => {
  const setCategory = useUiStore((state) => state.setSelectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);
  const isMobile = useUiStore((state) => state.isMobile);
  const closeDialog = useUiStore((state) => state.toggleDashboardExpanded);
  const setCategoryId = useUiStore((state) => state.setSelectedCategoryId);
  const setSelectedIcon = useUiStore((state) => state.setSelectedCategoryIcon);

  // Dynamic icon selection
  const getIcon = () => {
    // Check static views first
    if (item.icon && staticIconMap[item.icon]) {
      return staticIconMap[item.icon];
    }

    // For dynamic icons, convert icon name to PascalCase and get from icons object
    if (item.icon && icons[item.icon as keyof typeof icons]) {
      return icons[item.icon as keyof typeof icons];
    }

    // Default icon
    return icons.Folder;
  };

  const ViewIcon = getIcon();

  const handleCategorySelection = () => {
    setCategory(item.title);
    setCategoryId(item.id);
    setSelectedIcon(item.icon || "");
   if(isMobile) closeDialog();
  };

  // Compare ids, not titles: a list named "Today" must not light up the Today view.
  const isActive = selectedCategoryId === item.id;

  return (
    <li>
    <Button
      className="flex justify-between w-full"
      variant={isActive ? "default" : "outline"}
      aria-current={isActive ? "page" : undefined}
      onClick={() => handleCategorySelection()}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <ViewIcon className="h-4 w-4" />
        <span className="truncate">{item.title}</span>
      </div>
      {item._count.tasks > 0 && (
        <Badge variant={isActive ? "secondary" : "default"}>
          {item._count.tasks}
        </Badge>
      )}
    </Button>
    </li>
  );
};

export default CategoryItem;
