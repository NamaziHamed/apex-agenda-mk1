import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Soft backdrop: faint grid + a single accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black_40%,transparent_100%)] opacity-60"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-12rem] -z-10 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-20 pb-14 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <Link
          href="#demo"
          className="animate-in fade-in slide-in-from-bottom-2 duration-700 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground shadow-xs backdrop-blur transition-colors hover:text-foreground"
        >
          <Sparkles className="size-3.5 text-primary" />
          My Day now fills itself from your due dates
          <ArrowRight className="size-3" />
        </Link>

        <h1 className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both delay-100 mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Plan your day.{" "}
          <span className="text-muted-foreground">Then actually do it.</span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both delay-200 mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          Apex Agenda is a calm, focused task manager. Group tasks into lists,
          star what matters, and start every morning with a My Day view that
          already knows what&apos;s due.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both delay-300 mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" asChild className="group h-11 px-6">
            <Link href={"/register"}>
              Get started — it&apos;s free
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-11 px-6">
            <Link href={"#demo"}>Try the live demo</Link>
          </Button>
        </div>

        <p className="animate-in fade-in duration-700 fill-mode-both delay-500 mt-4 text-xs text-muted-foreground">
          Sign in with Google or email. No credit card, no clutter.
        </p>
      </div>
    </section>
  );
}
