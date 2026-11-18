import type { Metadata } from "next";
import FormWrapper from "@/components/forms/FormWrapper";
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

export const metadata: Metadata = { title: "Create account" };

const page = () => {
  return (
    <FormWrapper
      title="Create your account"
      description="It takes less than a minute. Free, forever."
      isLogin={false}
    >
      <RegisterForm />
    </FormWrapper>
  );
};

export default page;
