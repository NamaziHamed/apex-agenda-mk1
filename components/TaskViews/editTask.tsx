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
import { useGetCategories } from "@/hooks/useCategory";
import { useDeleteTask, useUpadeTask } from "@/hooks/useTasks";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const EditTask = () => {
  const [dueDate, setDueDate] = useState(false);
  const isSheetOpen = useTaskDetailsStore((state) => state.isSheetOpen);
  const taskConetent = useTaskDetailsStore((state) => state.taskContent);
  const toggleSheetOpen = useTaskDetailsStore((state) => state.toggleSheetOpen);
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
    form.reset(taskConetent);
    setDueDate(false);
  }, [taskConetent, form.reset]);

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

  // loading categories
  const { data: categories, isLoading } = useGetCategories();

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
      setOverdue(!date.hasSame(dt, "day"));
    } else setOverdue(false);
  }, [taskConetent, isToday]);

  const handleDeleteTask = () => {
    deleteTask({ taskId: form.getValues("id") },{
      onSuccess:()=>handleOpenChange()
    });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit task</SheetTitle>
          <SheetDescription>
            Make changes to this task and its attributes.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="task-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-4 relative w-full min-h-0"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g finish q3 report" {...field} />
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
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g finalize charts"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-5">
                {/* Toggle add to today */}
                <DetailsBtn
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
                  <Sun />
                  {isToday ? "Remove from today list" : "Add to today list"}
                  {isOverdue && <Badge variant={"destructive"}>Overdue</Badge>}
                </DetailsBtn>

                {/* Toggle Completed */}
                <DetailsBtn
                  onClick={() => {
                    form.setValue("completed", !isCompleted);
                    form.setValue("completedAt", dt.toUTC().toISO());
                  }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 /> Completed
                    </>
                  ) : (
                    <>
                      <Circle /> Incompleted
                    </>
                  )}
                </DetailsBtn>

                {/* Toggle Important */}
                <DetailsBtn
                  onClick={() => {
                    form.setValue("isImportant", !isImportant);
                  }}
                >
                  {!isImportant ? (
                    <>
                      <Star /> Set as important
                    </>
                  ) : (
                    <>
                      <Star className="text-red-400" fill={"#F87171"} /> Remove
                      importance
                    </>
                  )}
                </DetailsBtn>

                {/* Setting Due date */}
                {isDueDate || dueDate ? (
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-">Set Due Date: </FormLabel>
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
                  <DetailsBtn onClick={() => setDueDate(true)}>
                    <CalendarX2 />
                    Set Due Date
                  </DetailsBtn>
                )}

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Change Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          ?.filter(
                            (category) =>
                              category.id !== taskConetent?.categoryId
                          )
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <SheetFooter className="space-y-5">
          <Button
            type="submit"
            className="w-full "
            form="task-form"
            disabled={(EditStatus || deleteStatus) === "pending"}
          >
            {EditStatus === "pending" ? (
              <>
                <Loader2 className="animate-spin" /> Updating...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            className="flex gap-3"
            variant={"destructive"}
            onClick={handleDeleteTask}
            disabled={(EditStatus || deleteStatus) === "pending"}
          >
            {deleteStatus !== "pending" ? (
              <Trash2 />
            ) : (
              <Loader2 className="animate-spin" />
            )}
            {deleteStatus !== "pending" ? (
              <span>Delete</span>
            ) : (
              <span>Removing...</span>
            )}
          </Button>
          <SheetClose>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditTask;
