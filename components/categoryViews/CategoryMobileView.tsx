"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import AddListButton from "./AddListButton";
import { Button } from "../ui/button";
import { PanelLeft } from "lucide-react";
import CategoryViewSect from "./CategoryViewSect";
import { useUiStore } from "@/store/uiStore";

const CategoryMobileView = () => {
  const isExpanded = useUiStore((state) => state.dashboardExpanded);
  const toggleExpand = useUiStore((state) => state.toggleDashboardExpanded);
  return (
    <Sheet open={isExpanded} onOpenChange={toggleExpand}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="-ml-2 size-8"
          aria-label="Open views and lists"
        >
          <PanelLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 bg-sidebar p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle>Views</SheetTitle>
          <SheetDescription className="sr-only">
            Choose a view or list to show its tasks.
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <CategoryViewSect />
        </div>
        <SheetFooter className="mt-0 border-t p-3">
          <AddListButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryMobileView;
