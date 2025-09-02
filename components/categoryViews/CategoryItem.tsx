"use client";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Category } from "@/types/categoryTypes";
import { iconMap } from "@/utils/iconSelector";
import { useUiStore } from "@/store/uiStore";

const CategoryItem = ({ item }: { item: Category }) => {
  const setCategory = useUiStore((state) => state.setSelectedCategory);
  const selectedCategoty = useUiStore((state) => state.selectedCategory);
  const isMobile = useUiStore((state) => state.isMobile);
  const closeDialog = useUiStore((state) => state.toggleDashboardExpanded);
  const setCategoryId = useUiStore((state) => state.setSelectedCategoryId);

  const ViewIcon = iconMap[item.icon] || iconMap["Tasks"];

  const handleCategorySelection = () => {
    setCategory(item.title);
    setCategoryId(item.id);
    isMobile && closeDialog();
  };

  return (
    <Button
      className="flex justify-between w-full"
      variant={selectedCategoty === item.title ? "default" : "outline"}
      onClick={() => handleCategorySelection()}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <ViewIcon className="h-4 w-4" />
        <span className="truncate">{item.title}</span>
      </div>
      <Badge variant={"default"}> {item._count?.tasks} </Badge>
    </Button>
  );
};

export default CategoryItem;
