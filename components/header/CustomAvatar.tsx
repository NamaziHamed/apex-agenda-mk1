"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { LayoutDashboard, LogOut, User2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const CustomAvatar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (localStorage.getItem("showWelcomeToast") === "true" && session) {
      setTimeout(() => {
        toast.success(`Welcome back, ${session?.user?.name}!`);
        localStorage.removeItem("showWelcomeToast");
      }, 100);
    }
  }, [session]);

  if (pathname === "/login" || pathname === "/register") return null;

  if (status === "unauthenticated")
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <Link href={"/login"}>Sign in</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={"/register"}>Get started</Link>
        </Button>
      </div>
    );

  if (status === "loading")
    return <Skeleton className="size-8 rounded-full" aria-label="Loading" />;

  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          className="rounded-full outline-none ring-offset-2 ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8 border">
            {session?.user && (
              <>
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="text-xs font-medium">
                  {name.slice(0, 2).toUpperCase() || (
                    <User2 className="size-4" />
                  )}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{name || "Account"}</p>
          {email && (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {pathname !== "/dashboard" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomAvatar;
