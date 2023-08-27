import { Heading, useTheme, Authenticator } from "@aws-amplify/ui-react";
import "../../styles/signin/signin.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SignUpHeader() {
  const { tokens } = useTheme();

  return (
    <div>
      <div className="login-title" padding={`0 0 0`}>
        Sign Up{" "}
      </div>
      <div className="signup-brand-form-link">
        {" "}
        If you are a brand, please go to this link{" "}
        <Link onClick="" className="sign-in-return-link">
          here
        </Link>
      </div>
      {/* Additional buttons or components for other custom tabs */}
      {/*  <Authenticator tab="signIn" /> */}{" "}
    </div>
  );
}

export default SignUpHeader;
