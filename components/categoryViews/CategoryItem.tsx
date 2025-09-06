"use client";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Category } from "@/types/categoryTypes";
import { useUiStore } from "@/store/uiStore";
import { LucideIcon, icons } from "lucide-react";

// Static views mapping
const staticIconMap: Record<string, LucideIcon> = {
  Today: icons.Sun,
  Important: icons.Star,
  Planned: icons.Timer,
  Completed: icons.CheckCheck,
  All: icons.Infinity,
  Tasks: icons.List,
};

const CategoryItem = ({ item }: { item: Category }) => {
  const setCategory = useUiStore((state) => state.setSelectedCategory);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const isMobile = useUiStore((state) => state.isMobile);
  const closeDialog = useUiStore((state) => state.toggleDashboardExpanded);
  const setCategoryId = useUiStore((state) => state.setSelectedCategoryId);

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
    isMobile && closeDialog();
  };

  return (
    <Button
      className="flex justify-between w-full"
      variant={selectedCategory === item.title ? "default" : "outline"}
      onClick={() => handleCategorySelection()}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <ViewIcon className="h-4 w-4" />
        <span className="truncate">{item.title}</span>
      </div>
      <Badge variant={"default"}>{item._count?.tasks || 0}</Badge>
    </Button>
  );
};

export default CategoryItem;