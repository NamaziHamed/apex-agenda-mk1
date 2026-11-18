"use client";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { TaskPayload, taskPayloadSchema } from "@/lib/validations";
import { useCreateTask } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";
import { Loader2, Plus } from "lucide-react";

const AddTaskInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const focusGainer = () => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }, 500);
  };

  useEffect(() => {
    focusGainer();
  }, [selectedCategory, isDiabled]);

  const handleSubmit = (data: TaskPayload) => {
    createCategory(
      { title: data.title, selectedCategory, categoryId: id },
      {
        onSuccess: () => {
          form.reset();
          requestAnimationFrame(() => inputRef.current?.focus());
        },
      }
    );
  };

  const placeholder = isDiabled
    ? `Switch to Today or a list to add tasks`
    : `Add a task to ${selectedCategory}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                {isPending ? (
                  <Loader2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                ) : (
                  <Plus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                )}
                <FormControl>
                  <Input
                    type="text"
                    placeholder={placeholder}
                    aria-label="Add a task"
                    autoComplete="off"
                    className="h-11 rounded-lg bg-card pl-9 pr-16 shadow-sm"
                    {...field}
                    disabled={isPending || isDiabled}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el;
                    }}
                  />
                </FormControl>
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:block">
                  Enter
                </kbd>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddTaskInput;
