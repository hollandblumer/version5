import { Heading, useTheme, Authenticator, } from "@aws-amplify/ui-react";
import "../../styles/signin/signin.css";
import { useState } from "react";

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <div>  
    <div className="login-title" padding={`0 0 0`}>
      Login{" "}
    </div>
    {/* Additional buttons or components for other custom tabs */}
{/*  <Authenticator tab="signIn" /> */} </div>
  );
}
