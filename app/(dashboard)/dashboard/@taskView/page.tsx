"use client";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import AddTaskInput from "@/components/TaskViews/AddTaskInput";
import { useUiStore } from "@/store/uiStore";
import React from "react";

const taskView = () => {
  const isMobile = useUiStore((state) => state.isMobile);
  return (
    <div className="h-full border relative p-2">
      {isMobile && <CategoryMobileView />}
      taskView
      <AddTaskInput />
    </div>
  );
};

export default taskView;
