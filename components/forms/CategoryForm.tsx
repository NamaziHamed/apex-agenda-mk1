"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategory";
import { useForm } from "react-hook-form";
import { useUiStore } from "@/store/uiStore";
import { toast } from "sonner";

const CategoryForm = ({
  onClose,
  editMode,
}: {
  onClose: () => void;
  editMode: boolean;
}) => {
  const { mutate: createCategory, isPending: createPending } =
    useCreateCategory();
  const { mutate: updateCategory, isPending: updatePending } =
    useUpdateCategory();
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    form.reset({ title: selectedCategory });
  }, [selectedCategory, selectedCategoryId]);

  const handleSubmit = (data: { title: string }) => {
    const payload = {
      title: data.title,
      categoryId: selectedCategoryId,
    };
    const options = {
      onSuccess: () => {
        onClose();
        editMode
          ? toast.success("List updated!")
          : toast.success("New List Created!");
      },
    };
    editMode ? updateCategory(payload, options) : createCategory(data, options);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List name:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Holliday" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={createPending || updatePending}
          className="w-full"
        >
          {editMode ? "Save" : "Add"}
        </Button>
      </form>
      <Button
        onClick={onClose}
        type="reset"
        className="w-full mt-2"
        variant={"secondary"}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default CategoryForm;
