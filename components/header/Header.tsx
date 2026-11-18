import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import CustomAvatar from "./CustomAvatar";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "marketing" | "app";
  /** Optional element rendered before the logo (e.g. mobile menu trigger). */
  leading?: React.ReactNode;
}

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#demo", label: "Demo" },
];

const Header = ({ variant = "marketing", leading }: HeaderProps) => {
  const isApp = variant === "app";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center gap-3 px-4 sm:px-6",
          !isApp && "mx-auto max-w-6xl"
        )}
      >
        {leading}
        <Logo />
        {!isApp && (
          <nav
            aria-label="Main"
            className="ml-6 hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <CustomAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
