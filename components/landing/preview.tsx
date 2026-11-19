import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Preview() {
  return (
    <section id="preview" className="scroll-mt-24 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold lg:text-4xl">See it in action</h2>
        <p className="mt-2 text-muted-foreground">
          This is what your dashboard looks like.
        </p>
      </div>

      <Image
        src="/screenshot.png"
        alt="Apex Agenda dashboard"
        width={944}
        height={903}
        className="mx-auto w-full max-w-3xl rounded-xl border shadow-2xl"
      />

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-xl font-semibold">Ready to get organized?</p>
        <Button asChild size="lg">
          <Link href={"/register"}>Create your free account</Link>
        </Button>
      </div>
    </section>
  );
}
