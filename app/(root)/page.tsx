import Demo from "@/components/landing/demo";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import How from "@/components/landing/How";
import React from "react";

const page = () => {
  return (
    <div className="pt-20 lg:pt-24">
      <Hero />
      <div className="max-w-7xl m-auto flex flex-col gap-20 lg:gap-32">
        <Features />
        <How />
        <Demo />
      </div>
    </div>
  );
};

export default page;
