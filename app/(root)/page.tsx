import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import How from "@/components/landing/How";
import Preview from "@/components/landing/preview";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <div className="max-w-7xl m-auto flex flex-col gap-24 pb-24 lg:gap-32">
        <Features />
        <How />
        <Preview />
      </div>
    </>
  );
};

export default page;
