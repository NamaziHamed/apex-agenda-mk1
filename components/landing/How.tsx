import { FolderPlus, ListPlus, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    title: "Make a list",
    desc: "Create a list for work, personal goals, or anything in between — and pick an icon for it.",
    icon: FolderPlus,
  },
  {
    title: "Add tasks in seconds",
    desc: "Type a title and hit Enter. Add details, a due date or move it to another list whenever you like.",
    icon: ListPlus,
  },
  {
    title: "Focus on today",
    desc: "Star the important ones and open My Day. Check things off and watch the list get shorter.",
    icon: Star,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From blank page to done in three steps"
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border bg-card p-6 shadow-xs sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
