import { createTask, fetchTasks } from "@/lib/tasks";
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
    mutationFn: (data: { title: string; view: string; categoryId: string }) =>
      createTask(data.title, data.view, data.categoryId),
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
