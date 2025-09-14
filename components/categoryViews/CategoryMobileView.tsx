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
import AddListDialog from "./AddListDialog";
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
        <Button className="w-fit" variant={"ghost"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-10 px-5" side="left">
        <SheetTitle
          className="font-semibold text-2xl md:text-3xl
        lg:text-4xl"
        >
          Views
        </SheetTitle>
        <SheetDescription>Select a view to continue</SheetDescription>
        <Separator />
        <CategoryViewSect />
        <SheetFooter>
          <AddListDialog />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryMobileView;
