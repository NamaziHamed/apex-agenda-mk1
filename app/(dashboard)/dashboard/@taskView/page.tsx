"use client";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import { useUiStore } from "@/store/uiStore";
import React from "react";

const taskView = () => {
  const isMobile = useUiStore((state) => state.isMobile);
  return (
    <div className="flex flex-col">
      {isMobile && <CategoryMobileView />}
      taskView
    </div>
  );
};

export default taskView;
