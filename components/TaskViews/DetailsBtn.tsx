import React, { ReactNode } from "react";
import { Button } from "../ui/button";
interface buttonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const DetailsBtn = ({ children, onClick, disabled }: buttonProps) => {
  return (
    <Button
      type="button"
      variant={"outline"}
      className="justify-start"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default DetailsBtn;
