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
import CategoryItem from "./CategoryItem";
import AddListDialog from "./AddListDialog";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const CategoryMobileView = () => {
  return (
    <Sheet>
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
        <CategoryItem />
        <SheetFooter>
          <AddListDialog />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryMobileView;
