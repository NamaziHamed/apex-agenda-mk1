import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1
        className="text-2xl md:text-3xl font-bold w-fit pb-1
      bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500
      hover:opacity-80 transition-opacity duration-300"
      >
        Apex Agenda
      </h1>
    </Link>
  );
};

export default Logo;
