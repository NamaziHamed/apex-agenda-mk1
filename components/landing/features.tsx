import { FastForward, Feather, Star } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Extremely Simple",
      description:
        "No extra unnecessary or hyper advanced tools, only things you need to master your time.",
      icon: Feather,
      iconColor: "text-violet-500",
    },
    {
      id: 2,
      title: "Quick Signup",
      description:
        "Sign up in under 30 seconds and access your dedicated dashboard.",
      icon: FastForward,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Flag Important Tasks",
      description: "Important tasks are just a click away.",
      icon: Star,
      iconColor: "text-red-400",
    },
  ];

  return (
    <section className="px-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold lg:text-4xl">Features</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need, nothing you don&apos;t.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
