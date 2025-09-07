"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { TaskPayload, taskPayloadSchema } from "@/lib/validations";
import { useCreateTask } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";

const AddTaskInput = () => {
  const id = useUiStore((state) => state.selectedCategoryId);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const { mutate: createCategory, isPending } = useCreateTask();
  const [isDiabled, setDisable] = useState(false);

  useEffect(() => {
    if (selectedCategory === "Planned" || selectedCategory === "Completed") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [selectedCategory]);

  const form = useForm({
    resolver: zodResolver(taskPayloadSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (data: TaskPayload) => {
    createCategory(
      { title: data.title, selectedCategory, categoryId: id },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Pay the bills"
                  {...field}
                  disabled={isPending || isDiabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddTaskInput;
