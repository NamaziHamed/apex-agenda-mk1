import { userData } from "@/types/categoryTypes";

export const categorizeTasks = (data: userData) => {
  const completed = data.tasks.filter((t) => t.completed);
  const active = data.tasks.filter((t) => !t.completed);

  return {
    categories: data.categories,
    tasks: {
      today: {
        active: active.filter((t) => t.isToday),
        completed: completed.filter((t) => t.isToday),
      },
      important: {
        active: active.filter((t) => t.isImportant),
        completed: completed.filter((t) => t.isImportant),
      },
      planned: {
        active: active.filter((t) => t.dueDate),
        completed: completed.filter((t) => t.dueDate),
      },
      completed: { active: completed, completed: [] },
      all: { active, completed },
    },
  };
};
