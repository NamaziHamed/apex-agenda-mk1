import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center shadow-sm sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="absolute bottom-[-10rem] left-1/2 -z-10 h-[20rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          />
          <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Your calmest to-do list is a minute away
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Create a free account, add your first task, and let My Day do the
            sorting.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="group h-11 px-6">
              <Link href="/register">
                Create free account
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="h-11 px-6">
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
