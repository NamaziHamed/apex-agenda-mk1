"use client";
import { useEffect } from "react";
import { useGetUserData } from "@/hooks/useTasks";
import { useTaskDataStore } from "@/store/taskDataStore";
import { categorizeTasks } from "@/utils/categorization";

const Dashboard = () => {
  const { data } = useGetUserData();

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

  // Loading UI is handled by skeletons in the sidebar and task list.
  return null;
};

export default Dashboard;
