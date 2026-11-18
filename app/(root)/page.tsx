import Demo from "@/components/landing/demo";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import How from "@/components/landing/How";
import FinalCta from "@/components/landing/FinalCta";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <Demo />
      <Features />
      <How />
      <FinalCta />
    </>
  );
};

export default page;
