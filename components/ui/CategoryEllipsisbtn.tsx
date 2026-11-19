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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useDeleteCategory } from "@/hooks/useCategory";

const CategoryEllipsisbtn = () => {
  const setEditmode = useUiStore((state) => state.setEditMode);
  const onOpen = useUiStore((state) => state.setCategoryDialogOpen);
  const categoryId = useUiStore((state) => state.selectedCategoryId);
  const setSelectedCategoryId = useUiStore(
    (state) => state.setSelectedCategoryId
  );
  const setSelectedCategory = useUiStore((state) => state.setSelectedCategory);
  const setSelectedCategoryIcon = useUiStore(
    (state) => state.setSelectedCategoryIcon
  );
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleEditModeInit = () => {
    setEditmode();
    onOpen();
  };

  const handleCategoryRemove = () => {
    deleteCategory({ categoryId });
    setSelectedCategory("Today");
    setSelectedCategoryId("Today");
    setSelectedCategoryIcon("Sun");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon" aria-label="List options">
          <EllipsisVerticalIcon
            className="hover:text-blue-400
          duration-300 transition-colors"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditModeInit}>
          <PencilIcon className="group-hover:text-blue-400 duration-300 transition-colors" />
          <span className="group-hover:text-blue-400 duration-300 transition-colors">
            Edit
          </span>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon className="group-hover:text-blue-400 duration-300 transition-colors" />{" "}
              <span className="group-hover:text-blue-400 duration-300 transition-colors">
                Remove
              </span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                List and all the tasks within from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCategoryRemove}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryEllipsisbtn;
