import {
  CalendarClock,
  CheckCheck,
  FolderKanban,
  MoonStar,
  ShieldCheck,
  Star,
  Sun,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "My Day, automatically",
    description:
      "Anything due today shows up in My Day on its own — timezone-aware, so nothing slips past midnight.",
    icon: Sun,
  },
  {
    title: "Lists for everything",
    description:
      "Create lists for work, trips or errands and give each one an icon so it's easy to spot.",
    icon: FolderKanban,
  },
  {
    title: "Star what matters",
    description:
      "Flag important tasks with one click and see them all together in the Important view.",
    icon: Star,
  },
  {
    title: "Planned with due dates",
    description:
      "Pick a date and time for any task. The Planned view keeps everything with a deadline in one place.",
    icon: CalendarClock,
  },
  {
    title: "Done stays out of the way",
    description:
      "Completed tasks collapse into a tidy section, so your list only shows what's left.",
    icon: CheckCheck,
  },
  {
    title: "Sign in your way",
    description:
      "Continue with Google or create an account with email and password. Your tasks stay private.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need. Nothing you don't."
          description="Apex Agenda keeps the feature list short on purpose, so the tool gets out of your way and your tasks get done."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-card p-6 transition-colors hover:bg-accent/40 sm:p-8"
            >
              <span className="grid size-10 place-items-center rounded-lg border bg-background text-primary shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MoonStar className="size-4" /> Light and dark themes included.
        </p>
      </div>
    </section>
  );
}
