import AddListDialog from "@/components/categoryViews/AddListDialog";
import CategoryViewSect from "@/components/categoryViews/CategoryViewSect";
import React from "react";

const categoryView = () => {
  return (
    <div className="border h-full p-2 relative">
      <h2 className="mb-2 text-xl sm:text-2xl lg:text-3xl font-semibold">
        Views
      </h2>
      <CategoryViewSect />
      <div className="absolute bottom-2 w-full">
        <AddListDialog />
      </div>
    </div>
  );
};

export default categoryView;
