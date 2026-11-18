import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface buttonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

const DetailsBtn = ({ children, onClick, disabled, active }: buttonProps) => {
  return (
    <Button
      type="button"
      variant={"outline"}
      aria-pressed={active}
      className={cn(
        "h-10 w-full justify-start gap-3 font-normal",
        active &&
          "border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 dark:border-primary/30 dark:bg-primary/10 dark:hover:bg-primary/15"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default DetailsBtn;
