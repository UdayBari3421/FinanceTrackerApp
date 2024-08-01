import React from "react";
import { Header, SignInSignUp } from "../components";

const Signup = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-screen h-[90vh]">
        <SignInSignUp />
      </div>
    </>
  );
};

export default Signup;
