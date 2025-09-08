"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import CategoryForm from "../forms/CategoryForm";
import { useUiStore } from "@/store/uiStore";

const AddListDialog = ({ isMobile }: { isMobile: boolean }) => {
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
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={onOpen}
          className={`${isMobile ? "hidden" : "inline-block"}`}
        >
          <PlusIcon />
          <span>Add list</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit" : "Add new"} List or Group
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CategoryForm onClose={onClose} editMode={isEditMode} />
      </DialogContent>
    </Dialog>
  );
};

export default AddListDialog;
