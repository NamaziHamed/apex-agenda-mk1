import React, { ReactNode } from "react";
import Logo from "./Logo";
import CustomAvatar from "./CustomAvatar";

/** `actions` renders before the avatar, e.g. the dashboard's notification bell. */
const Header = ({ actions }: { actions?: ReactNode }) => {
  return (
    <div className="bg-background/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-2">
        {actions}
        <CustomAvatar />
      </div>
    </div>
  );
};

export default Header;
