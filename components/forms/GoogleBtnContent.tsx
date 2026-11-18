"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function GoogleButtonContent() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Redirecting...</span>
        </>
      ) : (
        <>
          <Image
            src={"/google.svg"}
            width={18}
            height={18}
            alt=""
          />
          <span>Continue with Google</span>
        </>
      )}
    </>
  );
}
