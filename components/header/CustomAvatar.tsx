"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader2, LogIn, LogOut, User2 } from "lucide-react";
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
      <Button className="flex gap-2" asChild>
        <Link href={"/login"}>
          <LogIn />
          Login
        </Link>
      </Button>
    );

  console.log("Debug", session?.user.image);

  if (status === "loading") return <Loader2 className="animate-spin" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          {session?.user && (
            <>
              <AvatarImage
                src={session?.user?.image || ""}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {session.user.name?.slice(0, 2).toUpperCase() || <User2 />}
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button
            variant={"ghost"}
            className="flex gap-2 items-center w-full justify-start"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomAvatar;
