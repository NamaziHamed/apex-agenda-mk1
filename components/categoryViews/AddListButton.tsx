"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUiStore } from "@/store/uiStore";

/** Opens the shared AddListDialog (rendered once in the dashboard layout). */
const AddListButton = () => {
  const onOpen = useUiStore((state) => state.setCategoryDialogOpen);
  const removeEditMode = useUiStore((state) => state.removeEditMode);

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
      onClick={() => {
        // Make sure a previously cancelled "edit list" doesn't leak into "new list".
        removeEditMode();
        onOpen();
      }}
    >
      <PlusIcon />
      New list
    </Button>
  );
};

export default AddListButton;
