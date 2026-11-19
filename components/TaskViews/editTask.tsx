import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskDetailsStore } from "@/store/taskDetailsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTaskProps, editTaskSchema } from "@/lib/validations";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import DetailsBtn from "./DetailsBtn";
import {
  CalendarX2,
  CheckCircle2,
  Circle,
  Loader2,
  Star,
  Sun,
  Trash2,
} from "lucide-react";
import { DateTimePicker } from "../ui/DateTimePicker";
import { DateTime } from "luxon";
import { useDeleteTask, useUpadeTask } from "@/hooks/useTasks";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { useTaskDataStore } from "@/store/taskDataStore";

const EditTask = () => {
  const [dueDate, setDueDate] = useState(false);
  const isSheetOpen = useTaskDetailsStore((state) => state.isSheetOpen);
  const taskConetent = useTaskDetailsStore((state) => state.taskContent);
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
  const categories = useTaskDataStore((state) => state.categories);
  const dt = DateTime.now();
  const [isOverdue, setOverdue] = useState(false);

  const { mutate: editTask, status: EditStatus } = useUpadeTask();
  const { mutate: deleteTask, status: deleteStatus } = useDeleteTask();

  const form = useForm({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: taskConetent?.title || "",
    },
  });


useEffect(() => {
  if (taskConetent) {

    const formValues = {
      id: taskConetent.id,
      title: taskConetent.title || "",
      description: taskConetent.description || null,

      reminder: taskConetent.reminder ? new Date(taskConetent.reminder).toISOString() : null,
      dueDate: taskConetent.dueDate ? new Date(taskConetent.dueDate).toISOString() : null,
      completedAt: taskConetent.completedAt ? new Date(taskConetent.completedAt).toISOString() : null,
      setTodayDate: taskConetent.setTodayDate ? new Date(taskConetent.setTodayDate).toISOString() : null,

      isImportant: taskConetent.isImportant || false,
      completed: taskConetent.completed || false,
      isToday: taskConetent.isToday || false,
      categoryId: taskConetent.categoryId || null,
    };

    form.reset(formValues);
    
    setDueDate(!!taskConetent.dueDate);
  }
}, [taskConetent, form]);

  const onSubmit = (data: editTaskProps) => {
    editTask(
      { data, taskId: data.id },
      {
        onSuccess: () => {
          toast.success("Task updated!");
          toggleSheetOpen();
        },
      }
    );
  };

  // controlling form values upon change before submit
  const isCompleted = useWatch({ control: form.control, name: "completed" });
  const isImportant = useWatch({ control: form.control, name: "isImportant" });
  const isToday = useWatch({ control: form.control, name: "isToday" });
  const isDueDate = useWatch({ control: form.control, name: "dueDate" });

  const handleOpenChange = () => {
    setDueDate(false);
    setOverdue(false);
    form.reset();
    toggleSheetOpen();
  };

  useEffect(() => {
    if (form.getValues("setTodayDate")) {
      const date = DateTime.fromISO(form.getValues("setTodayDate") || "");
      setOverdue(!date.hasSame(DateTime.now(), "day"));
    } else setOverdue(false);
  }, [taskConetent, isToday, form]);

  const handleDeleteTask = () => {
    deleteTask(
      { taskId: form.getValues("id") },
      {
        onSuccess: () => handleOpenChange(),
      }
    );
  };

  const isBusy = (EditStatus || deleteStatus) === "pending";

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-base">Task details</SheetTitle>
          <SheetDescription>
            Edit the title, notes, schedule and list for this task.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="task-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-0 w-full flex-1 space-y-6 overflow-y-auto px-6 py-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Finish Q3 report" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add details, links or a checklist…"
                      className="min-h-24 resize-y"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              {/* Toggle add to today */}
              <DetailsBtn
                active={!!isToday}
                onClick={() => {
                  if (isToday) {
                    form.setValue("isToday", false);
                    form.setValue("setTodayDate", null);
                  } else {
                    form.setValue("isToday", true);
                    form.setValue("setTodayDate", dt.toUTC().toISO());
                  }
                }}
              >
                <Sun className={isToday ? "text-primary" : ""} />
                {isToday ? "In My Day" : "Add to My Day"}
                {isOverdue && (
                  <Badge variant={"destructive"} className="ml-auto">
                    Overdue
                  </Badge>
                )}
              </DetailsBtn>

              {/* Toggle Completed */}
              <DetailsBtn
                active={!!isCompleted}
                onClick={() => {
                  form.setValue("completed", !isCompleted);
                  form.setValue(
                    "completedAt",
                    isCompleted ? null : dt.toUTC().toISO()
                  );
                }}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="text-success" /> Completed
                  </>
                ) : (
                  <>
                    <Circle /> Mark as completed
                  </>
                )}
              </DetailsBtn>

              {/* Toggle Important */}
              <DetailsBtn
                active={!!isImportant}
                onClick={() => {
                  form.setValue("isImportant", !isImportant);
                }}
              >
                {!isImportant ? (
                  <>
                    <Star /> Mark as important
                  </>
                ) : (
                  <>
                    <Star className="fill-important text-important" />{" "}
                    Important
                  </>
                )}
              </DetailsBtn>
            </div>

            {/* Setting Due date */}
            {isDueDate || dueDate ? (
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        onChange={field.onChange}
                        value={isDueDate || ""}
                        onCancel={() => setDueDate(false)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">Due date</p>
                <DetailsBtn onClick={() => setDueDate(true)}>
                  <CalendarX2 />
                  Add a due date
                </DetailsBtn>
              </div>
            )}

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Move to list</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    disabled={!categories?.length}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            categories?.length
                              ? "Choose a list"
                              : "Create a list first"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="mt-0 flex-row items-center gap-2 border-t px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            className="mr-auto text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleDeleteTask}
            disabled={isBusy}
          >
            {deleteStatus !== "pending" ? (
              <Trash2 />
            ) : (
              <Loader2 className="animate-spin" />
            )}
            {deleteStatus !== "pending" ? "Delete" : "Deleting…"}
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" form="task-form" disabled={isBusy}>
            {EditStatus === "pending" ? (
              <>
                <Loader2 className="animate-spin" /> Saving…
              </>
            ) : (
              "Save"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditTask;
