import { Categories, Tasks } from "@/types/categoryTypes";
import { create } from "zustand";

interface TaskProps {
  today: {
    active: Tasks[];
    completed: Tasks[];
  };
  important: {
    active: Tasks[];
    completed: Tasks[];
  };
  planned: {
    active: Tasks[];
    completed: Tasks[];
  };
  completed: {
    active: Tasks[];
    completed: Tasks[];
  };
  all: {
    active: Tasks[];
    completed: Tasks[];
  };
}

interface countProps {
  today: number;
  important: number;
  planned: number;
  completed: number;
  all: number;
}

interface TaskCountStore {
  counts: countProps;
  tasks: TaskProps;
  categories: Categories[];
  updateCounts: () => void;
  updateTasks: (tasks: TaskProps) => void;
  updateCategories: (categories: Categories[]) => void;
}

export const useTaskDataStore = create<TaskCountStore>((set) => ({
  counts: {
    today: 0,
    important: 0,
    planned: 0,
    completed: 0,
    all: 0,
  },
  tasks: {
    today: { active: [], completed: [] },
    important: { active: [], completed: [] },
    planned: { active: [], completed: [] },
    completed: { active: [], completed: [] },
    all: { active: [], completed: [] },
  },
  categories: [],
  updateTasks: (tasks) => set({ tasks }),
  updateCategories: (categories) => set({ categories }),
  updateCounts: () =>
    set((state) => ({
      counts: {
        today: state.tasks.today.active.length,
        important: state.tasks.important.active.length,
        planned: state.tasks.planned.active.length,
        completed: state.tasks.completed.active.length,
        all: state.tasks.all.active.length,
      },
    })),
}));
