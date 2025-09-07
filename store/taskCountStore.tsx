import { create } from "zustand";
interface CountProp {
  isToday: number;
  isImportant: number;
  planned: number;
  completed: number;
  all: number;
}

interface TaskCountStore {
  counts: CountProp;
  updateCount: (counts: CountProp) => void;
}

export const useTaskCountStore = create<TaskCountStore>((set) => ({
  counts: {
    isToday: 0,
    isImportant: 0,
    planned: 0,
    completed: 0,
    all: 0,
  },
  updateCount: (counts) => set({ counts }),
}));
