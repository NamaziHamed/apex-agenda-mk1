import { categoryFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const AddListForm = () => {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      icon: "",
      title: "",
    },
  });
  return (
    <Form {...form}>
      <form></form>
    </Form>
  );
};

export default AddListForm;
