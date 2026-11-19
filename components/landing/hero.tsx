import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section className="max-w-7xl m-auto grid items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
      <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <Badge variant="secondary">Simple. Clean. To the point.</Badge>

        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
          Stop managing your time. Start{" "}
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            mastering
          </span>{" "}
          it.
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Apex Agenda helps you organize your lists, flag what matters and get
          things done, without the clutter.
        </p>

        <div className="flex items-center gap-4">
          <Button asChild size="lg">
            <Link href={"/register"}>Get started</Link>
          </Button>
          <Button asChild size="lg" variant={"outline"}>
            <Link href={"#preview"}>See it in action</Link>
          </Button>
        </div>
      </div>

      <Image
        src="/banner.png"
        alt="Apex Agenda illustration"
        width={1536}
        height={1024}
        priority
        className="w-full rounded-2xl border shadow-lg"
      />
    </section>
  );
}
