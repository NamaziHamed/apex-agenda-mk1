import { AlarmClock, Notebook, Star } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Organize Your Agenda",
      desc: "With a single tap, create a new list for work, personal goals, or anything in between.",
      icon: Notebook,
    },
    {
      id: 2,
      title: "Prioritize with a Star",
      desc: "Easily flag important tasks so you can focus on what truly matters.",
      icon: Star,
    },
    {
      id: 3,
      title: "Stay on Track",
      desc: "Add a new task in seconds. Type down a title for your task and hit enter.",
      icon: AlarmClock,
    },
  ];

  return (
    <section className="px-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold lg:text-4xl">How it Works</h2>
        <p className="mt-2 text-muted-foreground">
          Three steps to a clearer day.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.id} className="bg-muted/50">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge>Step {step.id}</Badge>
                <step.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription>{step.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
