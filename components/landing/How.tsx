import { AlarmClock,  Notebook, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Organize Your Agenda",
      desc: "With a single tap, create a new list for work, personal goals, or anything in between.",
      icon: Notebook,
      iconColor: "text-red-400",
    },
    {
      id: 2,
      title: "Prioritize with a Star",
      desc: "Easily flag important tasks so you can focus on what truly matters.",
      icon: Star,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Stay on Track",
      desc: "Add a new task in seconds. Type down a title for your task and hit enter.",
      icon: AlarmClock,
      iconColor: "text-violet-500",
    },
  ];

  return (
    <section className="bg-muted py-16">
      <h3 className="text-blue-500 text-center text-xl md:text-2xl lg:text-4xl font-bold mb-10">
        How it Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {steps.map((step) => (
          <Card
            key={step.title}
            className="group relative cursor-pointer overflow-hidden
            transform transition-all duration-500 hover:scale-105
            hover:shadow-2xl"
          >
            <CardHeader className="text-center space-y-4">
              <step.icon
                className={`mx-auto h-12 w-12 ${step.iconColor}
                  transition-transform duration-300 group-hover:-translate-y-1`}
              />
              <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{step.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
