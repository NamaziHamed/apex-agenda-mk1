import { tasksChemaProps } from "@/lib/validations";
import { create } from "zustand";

interface useTaskDetailsStoreProps {
  isSheetOpen: boolean;
  toggleSheetOpen: () => void;
  sheetClose: () => void;
  taskContent: tasksChemaProps | undefined;
  setTaskContent: (task: tasksChemaProps) => void;
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
