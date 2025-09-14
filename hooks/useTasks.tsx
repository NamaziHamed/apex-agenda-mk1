import { createTask, deleteTask, fetchUserData, updateTask } from "@/lib/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetUserData() {
  return useQuery({
    queryFn: fetchUserData,
    queryKey: ["userData"],
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      selectedCategory: string;
      categoryId: string;
    }) => createTask(data.title, data.selectedCategory, data.categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }: { taskId: string }) => deleteTask(taskId),
    onMutate: async ({ taskId }) => {
      await queryClient.cancelQueries({ queryKey: ["userData"] });
      const prevTasks = queryClient.getQueryData(["userData"]);

      queryClient.setQueriesData({ queryKey: ["userData"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          tasks: old.tasks.filter((task: any) => task.id !== taskId),
        };
      });

      return { prevTasks };
    },
    onError: (error, newTask, context) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      queryClient.setQueriesData(
        { queryKey: ["userData"] },
        context?.prevTasks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
}
export function useUpadeTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, taskId }: { data: any; taskId: string }) =>
      updateTask(data, taskId),
    onMutate: async ({ data, taskId }) => {
      await queryClient.cancelQueries({ queryKey: ["userData"] });
      const prevTasks = queryClient.getQueryData(["userData"]);

      queryClient.setQueriesData({ queryKey: ["userData"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          tasks: old.tasks.map((task: any) =>
            task.id === taskId ? { ...task, ...data } : task
          ),
        };
      });

      return { prevTasks };
    },
    onError: (error, newTask, context) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      queryClient.setQueriesData(
        { queryKey: ["userData"] },
        context?.prevTasks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
}
