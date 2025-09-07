// hooks/useTaskData.ts
import { useMemo, useEffect } from "react";
import { useGettasks } from "@/hooks/useTasks";
import { useGetCategories } from "@/hooks/useCategory";
import { useTaskCountStore } from "@/store/taskCountStore";

export function useTaskData(
  selectedCategory: string,
  selectedCategoryId: string
) {
  const { data: allTasks, isLoading: tasksLoading } = useGettasks();
  const { data: categories, status: categoriesStatus } = useGetCategories();
  const updateCount = useTaskCountStore((state) => state.updateCount);

  // Calculate counts - ONLY count non-completed tasks (except for Completed view)
  const counts = useMemo(() => {
    if (!allTasks) return null;

    return {
      isToday: allTasks.filter((task) => task.isToday && !task.completed)
        .length,
      isImportant: allTasks.filter(
        (task) => task.isImportant && !task.completed
      ).length,
      planned: allTasks.filter((task) => task.dueDate && !task.completed)
        .length,
      completed: allTasks.filter((task) => task.completed).length, // Only this counts completed
      all: allTasks.filter((task) => !task.completed).length, // Active tasks only
    };
  }, [allTasks]);

  // Update global counts when they change
  useEffect(() => {
    if (counts) {
      updateCount(counts);
    }
  }, [counts, updateCount]);

  // Calculate category-specific counts (only non-completed)
  const categoryCountsMap = useMemo(() => {
    if (!allTasks || !categories) return {};

    return categories.reduce((acc, cat) => {
      acc[cat.id] = allTasks.filter(
        (task) => task.categoryId === cat.id && !task.completed
      ).length;
      return acc;
    }, {} as Record<string, number>);
  }, [allTasks, categories]);

  // Filter tasks based on selected view
  const filteredTasks = useMemo(() => {
    if (!allTasks) return { active: [], completed: [] };

    let filtered = allTasks;

    switch (selectedCategory) {
      case "Today":
        filtered = allTasks.filter((task) => task.isToday);
        break;
      case "Important":
        filtered = allTasks.filter((task) => task.isImportant);
        break;
      case "Completed":
        // For Completed view, show ALL completed tasks in the active section
        return {
          active: allTasks.filter((task) => task.completed), // Show completed as active
          completed: [], // No completed section in Completed view
        };
      case "Planned":
        filtered = allTasks.filter((task) => task.dueDate);
        break;
      case "All":
        filtered = allTasks;
        break;
      default:
        filtered = allTasks.filter(
          (task) => task.categoryId === selectedCategoryId
        );
    }

    // For all views except Completed, separate active and completed
    return {
      active: filtered.filter((task) => !task.completed),
      completed: filtered.filter((task) => task.completed),
    };
  }, [allTasks, selectedCategory, selectedCategoryId]);

  // Enhanced categories with counts
  const categoriesWithCounts = useMemo(() => {
    if (!categories) return [];

    return categories.map((cat) => ({
      ...cat,
      _count: { tasks: categoryCountsMap[cat.id] || 0 },
    }));
  }, [categories, categoryCountsMap]);

  return {
    tasks: allTasks,
    categories: categoriesWithCounts,
    filteredTasks,
    counts,
    isLoading: tasksLoading || categoriesStatus !== "success",
  };
}
