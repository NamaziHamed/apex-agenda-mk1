import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <main className="text-primary-foreground relative w-full min-h-screen">
      <div className="relative flex min-h-screen items-center">
        <div className="bg-[url('/banner.png')] bg-center bg-cover bg-no-repeat absolute inset-0 z-0"></div>
        <div className="absolute inset-0 z-10 bg-black/70"></div>
        <div
          className="flex flex-col gap-3 items-center max-w-md relative
          mx-auto py-20 z-20 text-center"
        >
          <h1
            className="text-4xl font-bold lg:text-6xl
            bg-clip-text text-transparent w-fit bg-gradient-to-r from-blue-500
            to-purple-500 italic"
          >
            Apex Agenda
          </h1>
          <p className="text-center text-lg lg:text-2xl text-shadow-xs text-shadow-blue-500">
            Stop managing your time. Start{" "}
            <span className="font-bold italic">mastering</span> it. Our sleek,
            modern design and powerful features help you prioritize what truly
            matters and get it done.
          </p>
          <div className="flex items-center gap-5 mt-6">
            <Button asChild className="transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
              <Link href={"/register"}>Get started</Link>
            </Button>
            <Button asChild variant={"outline"} className="transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
              <Link href={"#demo"}>See Demo!</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}