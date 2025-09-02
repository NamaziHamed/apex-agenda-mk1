import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Category } from "@/types/categoryTypes";
import { iconMap } from "@/utils/iconSelector";

const CategoryItem = ({ item }: { item: Category }) => {
  const ViewIcon = iconMap[item.icon] ?? iconMap["Tasks"];
  return (
    <Button className="flex justify-between w-full">
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <ViewIcon className="h-4 w-4" />
        <span className="truncate">{item.title}</span>
      </div>
      <Badge variant={"default"}> {item._count?.tasks} </Badge>
    </Button>
  );
};

export default CategoryItem;
