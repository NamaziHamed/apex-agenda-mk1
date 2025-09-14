export interface Categories {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  icon: string | null;
  _count: { tasks: number };
}

export interface Tasks {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  description: string | null;
  reminder: Date | null;
  dueDate: Date | null;
  completedAt: Date | null;
  setTodayDate: Date | null;
  completed: boolean;
  isImportant: boolean;
  isToday: boolean;
  categoryId: string | null;
}

export interface userData {
  categories: Categories[];
  tasks: Tasks[];
}
