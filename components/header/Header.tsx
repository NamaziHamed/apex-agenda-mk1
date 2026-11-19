import React from "react";
import Logo from "./Logo";
import CustomAvatar from "./CustomAvatar";

const Header = () => {
  return (
    <div className="bg-background/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
      <Logo />
      <CustomAvatar />
    </div>
  );
};

export default Header;
