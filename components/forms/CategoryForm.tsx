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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  BookOpen,
  Briefcase,
  Building,
  Handshake,
  HeartPlus,
  Lightbulb,
  Loader2,
  Mail,
  MonitorPlay,
  NotepadText,
  Plane,
  ShoppingCart,
  ShowerHead,
  Star,
  Tent,
  Wrench,
} from "lucide-react";

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
  const icon = useUiStore((state) => state.selectedCategoryIcon);
  const removeEditMode = useUiStore((state) => state.removeEditMode);
  const setSelectedCategory = useUiStore((state) => state.setSelectedCategory);
  const setSelectedCategoryIcon = useUiStore(
    (state) => state.setSelectedCategoryIcon
  );

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      icon: "NotepadText",
    },
  });

  useEffect(() => {
    if (editMode) {
      form.reset({ title: selectedCategory, icon: icon });
    }
  }, [selectedCategory, selectedCategoryId, icon, editMode, form]);

  const handleSubmit = (data: { title: string; icon?: string }) => {
    const payload = {
      title: data.title,
      icon: data.icon ?? "",
      categoryId: selectedCategoryId,
    };
    const options = {
      onSuccess: () => {
        removeEditMode();
        onClose();
        if (editMode) {
          // Keep the page header in sync with the renamed list.
          setSelectedCategory(payload.title);
          setSelectedCategoryIcon(payload.icon);
          toast.success("List updated!");
        } else {
          toast.success("New List Created!");
        }
      },
    };

    if (editMode) {
      updateCategory(payload, options);
    } else {
      createCategory(data, options);
    }
  };

  const iconMap = [
    { value: "NotepadText", key: <NotepadText /> },
    { value: "Plane", key: <Plane /> },
    { value: "Tent", key: <Tent /> },
    { value: "ShoppingCart", key: <ShoppingCart /> },
    { value: "Lightbulb", key: <Lightbulb /> },
    { value: "HeartPlus", key: <HeartPlus /> },
    { value: "ShowerHead", key: <ShowerHead /> },
    { value: "Briefcase", key: <Briefcase /> },
    { value: "Handshake", key: <Handshake /> },
    { value: "Wrench", key: <Wrench /> },
    { value: "BookOpen", key: <BookOpen /> },
    { value: "Mail", key: <Mail /> },
    { value: "MonitorPlay", key: <MonitorPlay /> },
    { value: "Building", key: <Building /> },
    { value: "Star", key: <Star /> },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. Holiday, Groceries, Side project"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <p className="text-sm font-medium">Icon</p>
              <RadioGroup
                aria-label="List icon"
                className="grid grid-cols-5 gap-2"
                onValueChange={field.onChange}
                value={field.value}
              >
                {iconMap.map((icon) => {
                  const id = `list-icon-${icon.value}`;
                  return (
                    <div key={icon.value} className="relative">
                      <RadioGroupItem
                        value={icon.value}
                        id={id}
                        aria-label={icon.value}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={id}
                        title={icon.value}
                        className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&_svg]:size-5"
                      >
                        {icon.key}
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <Button onClick={onClose} type="button" variant={"outline"}>
            Cancel
          </Button>
          <Button type="submit" disabled={createPending || updatePending}>
            {(createPending || updatePending) && (
              <Loader2 className="animate-spin" />
            )}
            {editMode ? "Save changes" : "Create list"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
