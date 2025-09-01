import FormWrapper from "@/components/forms/FormWrapper";
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

const page = () => {
  return (
    <FormWrapper
      title="Create Account"
      description="Welcome to Apex Agenda"
      isLogin={false}
    >
      <RegisterForm />
    </FormWrapper>
  );
};

export default page;
