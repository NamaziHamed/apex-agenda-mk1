import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <main className="relative w-full h-[450px] lg:h-[550px] text-primary-foreground">
      <div className="relative flex items-center justify-center h-full w-full">
        <div className="absolute inset-0 z-0 bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 z-10 bg-black/70"></div>
        <div className="relative z-20 flex max-w-2xl flex-col items-center gap-4 px-4 text-center">
          <h1
            className="w-fit bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
            text-4xl font-bold italic text-transparent lg:text-6xl"
          >
            Apex Agenda
          </h1>

          <p className="text-lg text-shadow-sm text-shadow-blue-500 lg:text-xl">
            Stop managing your time. Start{" "}
            <span className="font-bold italic">mastering</span> it. Our sleek,
            modern design and powerful features help you prioritize what truly
            matters.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <Button
              asChild
              className="transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
            >
              <Link href={"/register"}>Get started</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
            >
              <Link href={"#demo"}>See Demo!</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
