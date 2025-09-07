import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./button";
import { useUiStore } from "@/store/uiStore";

const CategoryEllipsisbtn = () => {
  const setEditmode = useUiStore((state) => state.setEditMode);
  const onOpen = useUiStore((state) => state.setCategoryDialogOpen);

  const handleEditModeInit = () => {
    setEditmode();
    onOpen();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVerticalIcon
          className="hover:text-blue-400
        duration-300 transition-colors"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            className="group w-full justify-start "
            onClick={handleEditModeInit}
          >
            <PencilIcon className="group-hover:text-blue-400 duration-300 transition-colors" />
            <span className="group-hover:text-blue-400 duration-300 transition-colors">
              Edit
            </span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant={"ghost"} className="group w-full justify-start">
            <Trash2Icon className="group-hover:text-blue-400 duration-300 transition-colors" />{" "}
            <span className="group-hover:text-blue-400 duration-300 transition-colors">
              Remove
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryEllipsisbtn;
