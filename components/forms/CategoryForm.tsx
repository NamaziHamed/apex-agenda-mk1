import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateCategory } from "@/hooks/useCategory";

const CategoryForm = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      icon:"",
    },
  });

  const handleSubmit = (data: { title: string }) => { // Correctly receive the validated data object
    createCategory(
      data,
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
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
                <Input type="text" placeholder="Pay the bills" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          Add
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