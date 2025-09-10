import Demo from "@/components/landing/demo";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import How from "@/components/landing/How";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <How />
      <Demo />
    </div>
  );
};

export default page;
