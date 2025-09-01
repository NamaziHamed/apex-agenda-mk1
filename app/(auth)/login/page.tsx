import FormWrapper from "@/components/forms/FormWrapper";
import LoginForm from "@/components/forms/LoginForm";
import React from "react";

const page = () => {
  return (
    <FormWrapper
      title="Welcome Back!"
      description="Login to your dashboard"
      isLogin={true}
    >
      <LoginForm />
    </FormWrapper>
  );
};

export default page;
