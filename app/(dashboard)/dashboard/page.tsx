"use client";
import { useEffect } from "react";
import { useGetUserData } from "@/hooks/useTasks";
import { Loader2 } from "lucide-react";
import { useTaskDataStore } from "@/store/taskDataStore";
import { categorizeTasks } from "@/utils/categorization";

const Dashboard = () => {
  const { data, status } = useGetUserData();

  const updateCategories = useTaskDataStore((state) => state.updateCategories);
  const updateTasks = useTaskDataStore((state) => state.updateTasks);
  const updateCounts = useTaskDataStore((state) => state.updateCounts);

  useEffect(() => {
    if (data) {
      const categorized = categorizeTasks(data);
      updateCategories(categorized.categories);
      updateTasks(categorized.tasks);
      updateCounts();
    }
  }, [data, updateCategories, updateCounts, updateTasks]);

  if (status === "pending")
    return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;

  return null;
};

export default Dashboard;
