import Link from "next/link";
import Logo from "../header/Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden sm:inline">·</span>
          <span>Plan your day. Then do it.</span>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <Link href="/#features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
          <a
            href="https://github.com/NamaziHamed/apex-agenda-mk1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Source on GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
