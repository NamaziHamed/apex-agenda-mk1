"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
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

  return (
    <div id="demo" className="py-16">
      <h3 className="text-blue-500 text-center text-xl md:text-2xl lg:text-4xl font-bold mb-10">
        Demo
      </h3>
      <div className="bg-muted m-5 flex-1 grid grid-cols-[40%_60%] md:grid-cols-[25%_75%] p-8 pb-16 relative rounded-xl min-h-[500px]">
        <div className="border h-full flex flex-col gap-3 p-2 rounded-l-md">
          {/* Static categories */}
          {["Today", "Important", "Completed", "All"].map((title) => (
            <Button
              key={title}
              className="justify-between cursor-pointer"
              variant={selectedCategory === title ? "default" : "outline"}
              onClick={() => setSelectedCategory(title)}
            >
              {title}
              <Badge>{getCategoryCount(title)}</Badge>
            </Button>
          ))}

          {/* Custom categories */}
          {categories.map((category) => (
            <Button
              key={category.id}
              className="justify-between cursor-pointer"
              variant={
                selectedCategory === category.title ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.title)}
            >
              {category.title}
              <Badge>{getCategoryCount(category.title)}</Badge>
            </Button>
          ))}
        </div>

        <div className="border h-full rounded-r-md p-3 overflow-auto">
          <h3 className="text-blue-500 font-semibold text-xl lg:text-3xl mb-4">
            {selectedCategory}
          </h3>

          {/* Active tasks */}
          <div className="space-y-2">
            {selectedCategory === "Completed"
              ? filteredTasks.completed.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() =>
                            handleToggle(task.id, "completed")
                          }
                        />
                        <CardTitle className="line-through opacity-50">
                          {task.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleToggle(task.id, "important")}
                      >
                        <Star
                          fill={task.important ? "#fc8181" : ""}
                          className={cn(
                            "h-4 w-4",
                            task.important
                              ? "text-red-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              : filteredTasks.active.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() =>
                            handleToggle(task.id, "completed")
                          }
                        />
                        <CardTitle>{task.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleToggle(task.id, "important")}
                      >
                        <Star
                          fill={task.important ? "#fc8181" : ""}
                          className={cn(
                            "h-4 w-4",
                            task.important
                              ? "text-red-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* Completed tasks accordion (not shown in Completed view) */}
          {selectedCategory !== "Completed" &&
            filteredTasks.completed.length > 0 && (
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="completed">
                  <AccordionTrigger>
                    Completed ({filteredTasks.completed.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {filteredTasks.completed.map((task) => (
                        <Card key={task.id}>
                          <CardContent className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() =>
                                  handleToggle(task.id, "completed")
                                }
                              />
                              <CardTitle className="line-through opacity-50">
                                {task.title}
                              </CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              onClick={() => handleToggle(task.id, "important")}
                            >
                              <Star
                                fill={task.important ? "#fc8181" : ""}
                                className={cn(
                                  "h-4 w-4",
                                  task.important
                                    ? "text-red-400"
                                    : "text-muted-foreground"
                                )}
                              />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
        </div>

        <footer className="absolute bottom-0 h-16 grid grid-cols-[50%_50%] md:grid-cols-[30%_70%] w-full pt-4 pe-10">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="ghost">
                <Plus /> Add List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <Input
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
                <Button type="submit" className="w-full">
                  Add Category
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <form onSubmit={handleAddTask}>
            <Input
              placeholder="Finish Q3 report"
              className="w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={selectedCategory === "Completed"}
            />
          </form>
        </footer>
      </div>
    </div>
  );
}
