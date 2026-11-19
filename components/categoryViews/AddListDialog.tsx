"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CategoryForm from "../forms/CategoryForm";
import { useUiStore } from "@/store/uiStore";

const AddListDialog = () => {
  const isOpen = useUiStore((state) => state.isCategoryDialogOpen);
  const onOpen = useUiStore((state) => state.setCategoryDialogOpen);
  const onClose = useUiStore((state) => state.setCategoryDialogClose);
  const isEditMode = useUiStore((state) => state.isEditMode);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit" : "Add new"} List or Group</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Rename this list or pick a different icon."
              : "Group related tasks together and pick an icon for it."}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm onClose={onClose} editMode={isEditMode} />
      </DialogContent>
    </Dialog>
  );
};

export default AddListDialog;
