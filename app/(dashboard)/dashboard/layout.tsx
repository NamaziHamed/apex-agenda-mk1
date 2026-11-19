"use client";
import AddListDialog from "@/components/categoryViews/AddListDialog";
import AddListButton from "@/components/categoryViews/AddListButton";
import CategoryMobileView from "@/components/categoryViews/CategoryMobileView";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import Header from "@/components/header/Header";
import AddTaskInput, {
  READ_ONLY_VIEWS,
} from "@/components/TaskViews/AddTaskInput";
import { useUiStore } from "@/store/uiStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
  taskView: ReactNode;
  categoryView: ReactNode;
}

const Layout = ({ children, categoryView, taskView }: layoutProps) => {
  const { matches: isMobile, isLoading } = useMediaQuery();
  const selectedCategoryId = useUiStore((state) => state.selectedCategoryId);
  const canAddTasks = !READ_ONLY_VIEWS.includes(selectedCategoryId);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Header variant="app" leading={isMobile && <CategoryMobileView />} />

      <div className="flex min-h-0 flex-1">
        {!isMobile && (
          <aside
            aria-label="Views and lists"
            className="flex w-64 shrink-0 flex-col border-r bg-sidebar lg:w-72"
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
              {categoryView}
            </div>
            <div className="border-t p-3">
              <AddListButton />
            </div>
          </aside>
        )}

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto">{taskView}</div>
          {/* Planned and Completed are computed views, so there is nothing to add there. */}
          {canAddTasks && (
            <div className="border-t bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto w-full max-w-3xl px-4 py-3 sm:px-8">
                <AddTaskInput />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Single dialog instance for both "new list" and "edit list" */}
      <AddListDialog />
      {children}
    </div>
  );
};

export default Layout;
