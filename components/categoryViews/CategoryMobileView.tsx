"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import AddListButton from "./AddListButton";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import CategoryViewSect from "./CategoryViewSect";
import { useUiStore } from "@/store/uiStore";

const CategoryMobileView = () => {
  const isExpanded = useUiStore((state) => state.dashboardExpanded);
  const toggleExpand = useUiStore((state) => state.toggleDashboardExpanded);
  return (
    <Sheet open={isExpanded} onOpenChange={toggleExpand}>
      <SheetTrigger asChild>
        <Button className="w-fit" variant={"ghost"} size="icon" aria-label="Open views">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-3 px-5 pt-10" side="left">
        <SheetTitle className="text-2xl font-semibold">Views</SheetTitle>
        <SheetDescription>Select a view to continue</SheetDescription>
        <Separator />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <CategoryViewSect />
        </div>
        <SheetFooter className="border-t px-0">
          <AddListButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryMobileView;
