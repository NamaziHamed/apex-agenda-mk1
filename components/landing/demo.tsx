"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  CheckCheck,
  Home,
  Infinity as InfinityIcon,
  Briefcase,
  List,
  LucideIcon,
  Plus,
  Star,
  Sun,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  important: boolean;
  isToday: boolean;
  categoryId?: string;
}

interface Category {
  id: string;
  title: string;
}

const viewIcons: Record<string, LucideIcon> = {
  Today: Sun,
  Important: Star,
  Completed: CheckCheck,
  All: InfinityIcon,
  Work: Briefcase,
  Home: Home,
};

function DemoTaskRow({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (taskId: number, field: "completed" | "important") => void;
}) {
  return (
    <li className="group animate-in fade-in slide-in-from-top-1 duration-300 flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 shadow-xs transition-colors hover:bg-accent/40">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id, "completed")}
        aria-label={
          task.completed ? `Mark "${task.title}" as not done` : `Complete "${task.title}"`
        }
        className="size-[18px] rounded-full"
      />
      <span
        className={cn(
          "flex-1 truncate text-sm",
          task.completed && "text-muted-foreground line-through"
        )}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={() => onToggle(task.id, "important")}
        aria-label={task.important ? "Remove star" : "Star task"}
        aria-pressed={task.important}
      >
        <Star
          className={cn(
            "size-4 transition-colors",
            task.important
              ? "fill-important text-important"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
      </Button>
    </li>
  );
}

export default function Demo() {
  const [input, setInput] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [taskList, setTaskList] = useState<Task[]>([
    {
      id: 1,
      title: "Finalize presentation for new client",
      completed: true,
      important: true,
      isToday: true,
    },
    {
      id: 2,
      title: "Go to the gym",
      completed: false,
      important: true,
      isToday: true,
    },
    {
      id: 7,
      title: "Water the plants",
      completed: false,
      important: false,
      isToday: false,
      categoryId: "home",
    },
    {
      id: 8,
      title: "Review project proposal draft",
      completed: false,
      important: true,
      isToday: false,
      categoryId: "work",
    },
    {
      id: 9,
      title: "Call mom back",
      completed: false,
      important: false,
      isToday: false,
    },
    {
      id: 10,
      title: "Listen to new album release",
      completed: false,
      important: false,
      isToday: false,
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: "work", title: "Work" },
    { id: "home", title: "Home" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("Today");

  const categorizedTasks = useMemo(() => {
    const result: Record<string, { active: Task[]; completed: Task[] }> = {
      Today: {
        active: taskList.filter((task) => task.isToday && !task.completed),
        completed: taskList.filter((task) => task.isToday && task.completed),
      },
      Important: {
        active: taskList.filter((task) => task.important && !task.completed),
        completed: taskList.filter((task) => task.important && task.completed),
      },
      Completed: {
        active: taskList.filter((task) => task.completed),
        completed: [],
      },
      All: {
        active: taskList.filter((task) => !task.completed),
        completed: taskList.filter((task) => task.completed),
      },
    };

    // Add custom categories
    categories.forEach((cat) => {
      result[cat.title] = {
        active: taskList.filter(
          (task) => task.categoryId === cat.id && !task.completed
        ),
        completed: taskList.filter(
          (task) => task.categoryId === cat.id && task.completed
        ),
      };
    });

    return result;
  }, [taskList, categories]);

  // Get counts for badges (only count active tasks except for Completed view)
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "Completed") {
      return taskList.filter((task) => task.completed).length;
    }
    return categorizedTasks[categoryName]?.active.length || 0;
  };

  const filteredTasks = categorizedTasks[selectedCategory] || {
    active: [],
    completed: [],
  };

  const handleToggle = (taskId: number, field: "completed" | "important") => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId ? { ...task, [field]: !task[field] } : task
      )
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: input,
      completed: false,
      important: false,
      isToday: selectedCategory === "Today",
      categoryId: categories.find((cat) => cat.title === selectedCategory)?.id,
    };

    setTaskList([...taskList, newTask]);
    setInput("");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
      title: newCategoryName,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setDialogOpen(false);
  };

  const views = ["Today", "Important", "Completed", "All"];
  const SelectedIcon = viewIcons[selectedCategory] ?? List;
  const visibleTasks =
    selectedCategory === "Completed"
      ? filteredTasks.completed
      : filteredTasks.active;

  const navButton = (title: string) => {
    const Icon = viewIcons[title] ?? List;
    const active = selectedCategory === title;
    return (
      <button
        key={title}
        type="button"
        onClick={() => setSelectedCategory(title)}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:w-full",
          active
            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/60"
        )}
      >
        <Icon
          className={cn(
            "size-4",
            active ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span className="truncate">{title}</span>
        <span className="ml-auto pl-2 text-xs tabular-nums text-muted-foreground">
          {getCategoryCount(title) || ""}
        </span>
      </button>
    );
  };

  return (
    <section
      id="demo"
      aria-label="Interactive demo"
      className="scroll-mt-20 pb-8"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-300 overflow-hidden rounded-2xl border bg-background shadow-2xl shadow-primary/5 ring-1 ring-black/5 dark:ring-white/5">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="ml-3 text-xs text-muted-foreground">
              Interactive demo — try checking things off
            </span>
          </div>

          <div className="grid min-h-[460px] sm:grid-cols-[13rem_1fr]">
            {/* Sidebar */}
            <aside className="flex flex-col border-b bg-sidebar p-2 sm:border-b-0 sm:border-r sm:p-3">
              <nav
                aria-label="Demo views"
                className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible"
              >
                {views.map(navButton)}
                <div className="mx-1 hidden h-px bg-sidebar-border sm:my-2 sm:block" />
                {categories.map((category) => navButton(category.title))}
              </nav>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 hidden justify-start text-muted-foreground sm:mt-auto sm:flex"
                  >
                    <Plus /> New list
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>New list</DialogTitle>
                    <DialogDescription>
                      Lists live only in this demo — sign up to keep yours.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <Input
                      placeholder="e.g. Groceries"
                      aria-label="List name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      autoFocus
                    />
                    <Button type="submit" className="w-full">
                      Create list
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </aside>

            {/* Task list */}
            <div className="flex min-w-0 flex-col p-4 sm:p-6">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <SelectedIcon className="size-5 text-primary" />
                {selectedCategory}
              </h3>

              <ul className="mt-4 space-y-1.5">
                {visibleTasks.map((task) => (
                  <DemoTaskRow key={task.id} task={task} onToggle={handleToggle} />
                ))}
              </ul>

              {visibleTasks.length === 0 && (
                <p className="mt-6 rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                  Nothing here — add a task below.
                </p>
              )}

              {/* Completed tasks accordion (not shown in Completed view) */}
              {selectedCategory !== "Completed" &&
                filteredTasks.completed.length > 0 && (
                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value="completed" className="border-none">
                      <AccordionTrigger className="justify-start gap-2 py-2 text-muted-foreground hover:no-underline hover:text-foreground [&>svg]:order-first [&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0">
                        Completed
                        <span className="tabular-nums">
                          {filteredTasks.completed.length}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1.5">
                          {filteredTasks.completed.map((task) => (
                            <DemoTaskRow
                              key={task.id}
                              task={task}
                              onToggle={handleToggle}
                            />
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

              <form onSubmit={handleAddTask} className="mt-auto pt-6">
                <div className="relative">
                  <Plus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={
                      selectedCategory === "Completed"
                        ? "Pick another view to add tasks"
                        : `Add a task to ${selectedCategory}`
                    }
                    aria-label="Add a task"
                    className="h-10 pl-9"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={selectedCategory === "Completed"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
