import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/lib/categories";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useGetCategories() {
  const { status } = useSession();

  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: status === "authenticated",
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
      categoryId,
    }: {
      title: string;
      categoryId: string;
    }) => updateCategory(title, categoryId),
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
