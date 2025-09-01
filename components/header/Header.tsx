import React from "react";
import Logo from "./Logo";
import CustomAvatar from "./CustomAvatar";

const Header = () => {
  return (
    <div className="bg-muted px-3 py-5 flex justify-between">
      <Logo />
      <CustomAvatar />
    </div>
  );
};

export default Header;
