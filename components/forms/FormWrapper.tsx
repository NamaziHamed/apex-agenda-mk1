import React, { ReactNode } from "react";
import Link from "next/link";
import GoogleBtn from "@/components/forms/GoogleBtn";

interface wrapperProps {
  title: string;
  description: string;
  isLogin: boolean;
  children: ReactNode;
}

const FormWrapper = ({
  title,
  children,
  isLogin,
  description,
}: wrapperProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <GoogleBtn />

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or continue with email
          <span className="h-px flex-1 bg-border" />
        </div>

        {children}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? "New to Apex Agenda?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default FormWrapper;
