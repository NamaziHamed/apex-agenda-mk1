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
  Coffee,
  Handshake,
  HeartPlus,
  Lightbulb,
  Mail,
  MonitorPlay,
  NotepadText,
  Plane,
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

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      icon: "NotepadText",
    },
  });

  useEffect(() => {
    if (editMode) {
      console.log(icon);
      form.reset({ title: selectedCategory, icon: icon });
    }
  }, [selectedCategory, selectedCategoryId, icon]);

  const handleSubmit = (data: { title: string; icon?: string | undefined }) => {
    const payload = {
      title: data.title,
      icon: data.icon,
      categoryId: selectedCategoryId,
    };
    const options = {
      onSuccess: () => {
        removeEditMode();
        onClose();
        editMode
          ? toast.success("List updated!")
          : toast.success("New List Created!");
      },
    };
    editMode ? updateCategory(payload, options) : createCategory(data, options);
  };

  const iconMap = [
    { value: "NotepadText", key: <NotepadText /> },
    { value: "Plane", key: <Plane /> },
    { value: "Tent", key: <Tent /> },
    { value: "Coffee", key: <Coffee /> },
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

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>icon:</FormLabel>
              <FormControl>
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-5 w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {iconMap.map((icon) => (
                        <FormItem key={icon.value} className="flex gap-2">
                          <FormControl>
                            <RadioGroupItem value={icon.value} />
                          </FormControl>
                          <FormLabel>{icon.key}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
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
