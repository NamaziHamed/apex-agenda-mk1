"use client";
import React from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { TaskPayload, taskPayloadSchema } from "@/lib/validations";
import { useCreateTask } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";

const AddTaskInput = ({ view }: { view: string }) => {
  const id = useUiStore((state) => state.selectedCategoryId);
  const { mutate: createCategory, isPending } = useCreateTask();

  const form = useForm({
    resolver: zodResolver(taskPayloadSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (data: TaskPayload) => {
    createCategory({ title: data.title, view, categoryId: id },{
      onSuccess: () =>{
        form.reset()
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl className="absolute bottom-2 w-[97%]">
                <Input
                  type="text"
                  placeholder="Pay the bills"
                  {...field}
                  disabled={isPending}
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
