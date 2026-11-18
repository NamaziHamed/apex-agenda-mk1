import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
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
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleEditModeInit = () => {
    setEditmode();
    onOpen();
  };

  const handleCategoryRemove = () => {
    deleteCategory({ categoryId });
    setSelectedCategory("Today");
    setSelectedCategoryId("Today");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          aria-label="List options"
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={handleEditModeInit}>
          <PencilIcon />
          Edit list
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2Icon />
              Delete list
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this list?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes the list and every task in it. This
                can&apos;t be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCategoryRemove}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                Delete list
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryEllipsisbtn;
