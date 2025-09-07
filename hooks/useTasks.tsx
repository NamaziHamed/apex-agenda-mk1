import { createTask, fetchTasks, updateTask } from "@/lib/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useGettasks() {
  const { status } = useSession();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: status === "authenticated",
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; selectedCategory: string; categoryId: string }) =>
      createTask(data.title, data.selectedCategory, data.categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
}

export function useUpadeTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, taskId }: { data: any; taskId: string }) =>
      updateTask(data, taskId),
    onMutate: async ({ data, taskId }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueriesData({ queryKey: ["tasks"] }, (old: any) => {
        return old.map((task: any) =>
          task.id === taskId ? { ...task, ...data } : task
        );
      });

      return { prevTasks };
    },
    onError: (error, newTask, context) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      queryClient.setQueriesData({ queryKey: ["tasks"] }, context?.prevTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
