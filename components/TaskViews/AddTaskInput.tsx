"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { TaskPayload, taskPayloadSchema } from "@/lib/validations";
import { useCreateTask } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";
import { Loader2, Plus } from "lucide-react";

/** Views that are computed from other tasks, so new tasks can't be added there. */
export const READ_ONLY_VIEWS = ["Planned", "Completed"];

const AddTaskInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useUiStore((state) => state.selectedCategoryId);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const isMobile = useUiStore((state) => state.isMobile);
  const { mutate: createTask, isPending } = useCreateTask();

  const form = useForm({
    resolver: zodResolver(taskPayloadSchema),
    defaultValues: {
      title: "",
    },
  });

  // On desktop, be ready to type after switching lists. On mobile, don't
  // focus automatically: it pops the keyboard over the list you just opened.
  useEffect(() => {
    form.reset();
    if (isMobile) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [id, isMobile, form]);

  const handleSubmit = (data: TaskPayload) => {
    const title = data.title.trim();
    if (!title) return;
    createTask(
      // Built-in views use their name as id, so the id tells us which view we're in.
      { title, selectedCategory: id, categoryId: id },
      {
        onSuccess: () => {
          form.reset();
          requestAnimationFrame(() => inputRef.current?.focus());
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
              <div className="relative">
                {isPending ? (
                  <Loader2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                ) : (
                  <Plus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                )}
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Add a task to ${selectedCategory}`}
                    aria-label="Add a task"
                    autoComplete="off"
                    enterKeyHint="done"
                    className="h-11 rounded-lg bg-card pl-9 pr-16 shadow-sm"
                    {...field}
                    // Stay editable while saving so focus isn't lost between quick adds.
                    readOnly={isPending}
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
