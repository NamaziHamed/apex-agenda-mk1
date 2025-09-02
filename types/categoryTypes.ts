export interface Category {
  id: string;
  title: string;
  icon: string | null;
  createdAt: string;
  userId: string;
  _count?: {
    tasks: number;
  };
}
