import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const LogoMark = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30",
      className
    )}
  >
    <CheckIcon className="size-4" strokeWidth={3} />
  </span>
);

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      aria-label="Apex Agenda home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className="text-[15px] font-semibold tracking-tight">
        Apex Agenda
      </span>
    </Link>
  );
};

export default Logo;
