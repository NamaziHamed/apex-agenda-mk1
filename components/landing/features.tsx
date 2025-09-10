import { FastForward, Feather, Star } from "lucide-react";
import {
  Card,
  CardContent,
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
        "No extra unnecessary or hyper advanced tools, only things you need to master your time",
      icon: Feather,
      iconColor: "text-violet-500",
    },
    {
      id: 2,
      title: "Quick Signup",
      description:
        "Signup under 30 seconds and access your dedicated dashboard",
      icon: FastForward,
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Flag Important Tasks",
      description: "Important tasks are just a click away",
      icon: Star,
      iconColor: "text-red-400",
    },
  ];

  return (
    <section className="bg-background py-16">
      <h3 className="text-blue-500 text-center text-xl md:text-2xl lg:text-4xl font-bold mb-10">
        Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="group relative cursor-pointer overflow-hidden
            transform transition-all duration-500 hover:scale-105
            hover:shadow-2xl"
          >
            <CardHeader className="text-center space-y-4">
              <feature.icon
                className={`mx-auto h-12 w-12 ${feature.iconColor}
                  transition-transform duration-300 group-hover:-translate-y-1`}
              />
              <CardTitle className="text-xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}