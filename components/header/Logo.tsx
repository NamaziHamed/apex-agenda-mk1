import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold w-fit lg:h-13
      bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500
      hover:scale-105 transition-all duration-300"
      >
        Apex Agenda
      </h1>
    </Link>
  );
};

export default Logo;
