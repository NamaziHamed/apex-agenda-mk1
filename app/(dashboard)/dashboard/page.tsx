"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("showWelcomeToast") === "true" && session) {
      setTimeout(() => {
        toast.success(`Welcome back, ${session?.user?.name}!`);
        localStorage.removeItem("showWelcomeToast");
      }, 100);
    }
  }, [session]);

  return null;
};

export default Dashboard;
