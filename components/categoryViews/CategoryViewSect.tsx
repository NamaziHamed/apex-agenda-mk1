"use client";
import React from "react";
import CategoryItem from "./CategoryItem";
import { useGetCategories } from "@/hooks/useCategory";
import { Loader2 } from "lucide-react";
import { staticView } from "@/utils/predefined";

const CategoryViewSect = () => {
  const { data: categories, status } = useGetCategories();

  if (status !== "success") {
    return <Loader2 className="animate-spin text-blue-400" />;
  }

  return (
    <ul className="space-y-1">
      {staticView.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}

      {status === "success" &&
        categories?.map((category) => (
          <CategoryItem item={category} key={category.id} />
        ))}
    </ul>
  );
};

export default CategoryViewSect;
