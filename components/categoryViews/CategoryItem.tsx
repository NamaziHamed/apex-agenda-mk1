import React from "react";
import { Button } from "../ui/button";
import { WrenchIcon } from "lucide-react";
import { Badge } from "../ui/badge";

const CategoryItem = () => {
  return (
    <Button className="flex justify-between w-full">
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <WrenchIcon />
        <span className="truncate">Category Item</span>
      </div>
      <Badge variant={"default"}> 0 </Badge>
    </Button>
  );
};

export default CategoryItem;
