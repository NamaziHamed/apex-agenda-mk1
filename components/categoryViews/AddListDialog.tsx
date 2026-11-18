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

  const handleOpenChange = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit list" : "New list"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Rename this list or give it a different icon."
              : "Group related tasks together. Pick an icon to spot it quickly."}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm onClose={onClose} editMode={isEditMode} />
      </DialogContent>
    </Dialog>
  );
};

export default AddListDialog;
