import { createCategory, fetchCategories } from "@/lib/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
