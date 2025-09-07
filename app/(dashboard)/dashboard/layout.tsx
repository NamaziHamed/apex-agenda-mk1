"use client";
import AddListDialog from "@/components/categoryViews/AddListDialog";
import Header from "@/components/header/Header";
import AddTaskInput from "@/components/TaskViews/AddTaskInput";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUiStore } from "@/store/uiStore";
import { MenuIcon } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

interface layoutProps {
  children: ReactNode;
  taskView: ReactNode;
  categoryView: ReactNode;
}

const layout = ({ children, categoryView, taskView }: layoutProps) => {
  const { matches: isMobile, isLoading } = useMediaQuery();

  if (isLoading) return <MenuIcon className="w-3 h-3" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex-1 bg-card grid md:grid-cols-[25%_75%] md:m-10 md:rounded-2xl 
      text-card-foreground p-4 xl:p-6 relative"
      >
        {!isMobile && <div>{categoryView}</div>}
        <div>{taskView}</div>
      </div>
      {children}
      <footer className="sticky bottom-0 ">
        <div className="h-16 bg-background/80 flex items-center px-15">
          <div className="grid md:grid-cols-[25%_75%] w-full">
            {!isMobile && <AddListDialog />}
            <AddTaskInput />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default layout;
