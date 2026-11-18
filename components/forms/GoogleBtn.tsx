"use client";
import React from "react";
import { Button } from "../ui/button";
import { signInWithGoogle } from "@/utils/authActions";
import { GoogleButtonContent } from "./GoogleBtnContent";

export default function GoogleBtn() {
  const onClick = () => {
    localStorage.setItem("showWelcomeToast", "true");
    signInWithGoogle();
  };

  return (
    <Button
      variant={"outline"}
      className="h-10 w-full gap-2.5"
      type="button"
      onClick={onClick}
    >
      <GoogleButtonContent />
    </Button>
  );
}
