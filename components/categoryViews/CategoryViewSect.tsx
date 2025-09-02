"use client";
import React from "react";
import CategoryItem from "./CategoryItem";
import { useGetCategories } from "@/hooks/useCategory";

const CategoryViewSect = () => {
  const { data: categories, status } = useGetCategories();

  return (
    <ul className="space-y-1">
      {categories?.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </ul>
  );
};

export default CategoryViewSect;
