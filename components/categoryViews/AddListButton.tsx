"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUiStore } from "@/store/uiStore";

/** Opens the shared AddListDialog, which is mounted once in the dashboard layout. */
const AddListButton = () => {
  const onOpen = useUiStore((state) => state.setCategoryDialogOpen);
  const removeEditMode = useUiStore((state) => state.removeEditMode);
  const isMobile = useUiStore((state) => state.isMobile);
  const isSheetOpen = useUiStore((state) => state.dashboardExpanded);
  const closeSheet = useUiStore((state) => state.toggleDashboardExpanded);

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => {
        // A cancelled "edit list" must not leak into "new list".
        removeEditMode();
        // On mobile, close the views sheet so the dialog isn't stacked on top of it.
        if (isMobile && isSheetOpen) closeSheet();
        onOpen();
      }}
    >
      <PlusIcon />
      <span>Add list</span>
    </Button>
  );
};

export default AddListButton;
