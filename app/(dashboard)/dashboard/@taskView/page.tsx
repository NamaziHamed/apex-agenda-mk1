"use client";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import AddTaskInput from "@/components/TaskViews/AddTaskInput";
import { useUiStore } from "@/store/uiStore";
import React from "react";

const taskView = () => {
  const isMobile = useUiStore((state) => state.isMobile);
  const SelectedCategory = useUiStore((state) => state.selectedCategory);

  return (
    <div className="h-full border relative p-2">
      {isMobile && <CategoryMobileView />}
      <h3 className="text-blue-500 font-semibold text-2xl md:text-3xl lg:text-4xl">
        {SelectedCategory}
      </h3>
      <AddTaskInput view={SelectedCategory} />
    </div>
  );
};

export default taskView;
