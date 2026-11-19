"use client";
import AddListButton from "@/components/categoryViews/AddListButton";
import AddListDialog from "@/components/categoryViews/AddListDialog";
import Header from "@/components/header/Header";
import NotificationBell from "@/components/notifications/NotificationBell";
import AddTaskInput from "@/components/TaskViews/AddTaskInput";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
  taskView: ReactNode;
  categoryView: ReactNode;
}

const Layout = ({ children, categoryView, taskView }: layoutProps) => {
  const { matches: isMobile, isLoading } = useMediaQuery();

  if (isLoading)
    return (
      <div className="grid h-dvh place-items-center">
        <Loader2 className="size-6 animate-spin text-blue-500" />
      </div>
    );

  return (
    <div className="flex h-dvh flex-col">
      <Header actions={<NotificationBell />} />
      {/* The card fills the screen; only the lists inside it scroll, so the
          "Add list" and "Add task" controls stay in reach without a fixed bar. */}
      <div className="grid min-h-0 flex-1 gap-4 bg-card p-4 text-card-foreground md:m-10 md:grid-cols-[25%_1fr] md:rounded-2xl md:border md:shadow-sm xl:p-6">
        {!isMobile && (
          <aside className="flex min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {categoryView}
            </div>
            <div className="mt-3 border-t pt-3">
              <AddListButton />
            </div>
          </aside>
        )}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border">
          <div className="min-h-0 flex-1 overflow-y-auto p-2 md:p-3">
            {taskView}
          </div>
          <div className="border-t bg-background/60 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:p-3">
            <AddTaskInput />
          </div>
        </section>
      </div>
      {/* One dialog for both "new list" and "edit list", always mounted. */}
      <AddListDialog />
      {children}
    </div>
  );
};

export default Layout;
