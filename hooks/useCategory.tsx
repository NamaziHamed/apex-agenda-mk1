import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/lib/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      icon,
      categoryId,
    }: {
      title: string;
      icon: string;
      categoryId: string;
    }) => updateCategory(title, icon , categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: string }) =>
      deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Category removed successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
