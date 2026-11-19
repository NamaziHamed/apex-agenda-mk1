"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { TaskPayload, taskPayloadSchema } from "@/lib/validations";
import { useCreateTask } from "@/hooks/useTasks";
import { useUiStore } from "@/store/uiStore";
import { ArrowUp, Info, Loader2, Plus } from "lucide-react";

/** Views built from other tasks, so new tasks can't be added to them directly. */
const READ_ONLY_HINTS: Record<string, string> = {
  Planned: "Tasks with a due date show up here. Open a task to set one.",
  Completed: "Tasks you check off collect here.",
};

const AddTaskInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useUiStore((state) => state.selectedCategoryId);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const isMobile = useUiStore((state) => state.isMobile);
  const { mutate: createTask, isPending } = useCreateTask();

  const form = useForm({
    resolver: zodResolver(taskPayloadSchema),
    defaultValues: { title: "" },
  });
  const hasText = !!form.watch("title")?.trim();
  const readOnlyHint = READ_ONLY_HINTS[id];

  // Ready to type after switching lists on desktop. Not on mobile: focusing
  // would pop the keyboard over the list that was just opened.
  useEffect(() => {
    form.reset();
    if (isMobile || readOnlyHint) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [id, isMobile, readOnlyHint, form]);

  const handleSubmit = (data: TaskPayload) => {
    const title = data.title.trim();
    if (!title) return;
    createTask(
      // Built-in views use their name as id, so the id says which view we're in.
      { title, selectedCategory: id, categoryId: id },
      {
        onSuccess: () => {
          form.reset();
          requestAnimationFrame(() => inputRef.current?.focus());
        },
      }
    );
  };

  if (readOnlyHint) {
    return (
      <p className="flex items-center gap-2 px-2 py-2.5 text-sm text-muted-foreground">
        <Info className="size-4 shrink-0" />
        {readOnlyHint}
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Plus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-500" />
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`Add a task to ${selectedCategory}`}
                    aria-label="Add a task"
                    autoComplete="off"
                    enterKeyHint="done"
                    className="h-11 pl-9 pr-12"
                    {...field}
                    // Stays editable while saving so quick, back-to-back adds keep focus.
                    readOnly={isPending}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el;
                    }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Add task"
                  disabled={!hasText || isPending}
                  className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-md"
                >
                  {isPending ? <Loader2 className="animate-spin" /> : <ArrowUp />}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddTaskInput;
