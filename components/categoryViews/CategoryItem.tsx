"use client";
import React from "react";
import { cn } from "@/lib/utils";
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
    if (isMobile) closeDialog();
  };

  // Compare ids, not titles: a list called "Today" must not light up the Today view too.
  const isActive = selectedCategoryId === item.id;
  const count = item._count.tasks;

  return (
    <li>
      <button
        type="button"
        onClick={() => handleCategorySelection()}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-sidebar-ring/50",
          isActive
            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )}
      >
        <ViewIcon
          className={cn(
            "size-4 shrink-0 transition-colors",
            isActive
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span className="flex-1 truncate text-left">{item.title}</span>
        {count > 0 && (
          <span
            className={cn(
              "text-xs tabular-nums",
              isActive ? "text-sidebar-accent-foreground/80" : "text-muted-foreground"
            )}
          >
            {count}
          </span>
        )}
      </button>
    </li>
  );
};

export default CategoryItem;
