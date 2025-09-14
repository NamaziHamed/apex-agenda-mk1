import { tasksChemaProps } from "@/lib/validations";
import { Tasks } from "@/types/categoryTypes";
import { create } from "zustand";

interface useTaskDetailsStoreProps {
  isSheetOpen: boolean;
  toggleSheetOpen: () => void;
  sheetClose: () => void;
  taskContent: Tasks | undefined;
  setTaskContent: (task: Tasks) => void;
  removeTaskContent: () => void;
}

export const useTaskDetailsStore = create<useTaskDetailsStoreProps>((set) => ({
  isSheetOpen: false,
  toggleSheetOpen: () => set((state) => ({ isSheetOpen: !state.isSheetOpen })),
  sheetClose: () => set({ isSheetOpen: false }),
  taskContent: undefined,
  setTaskContent: (task) => set({ taskContent: task }),
  removeTaskContent: () => set({ taskContent: undefined }),
}));
