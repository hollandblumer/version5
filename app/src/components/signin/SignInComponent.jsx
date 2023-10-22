import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import Header from "./Header";
import SignInHeader from "./SignInHeader";
import SignInFooter from "./SignInFooter";
import SignUpHeader from "../signup/SignUpHeader";
import SignUpFooter from "../signup/SignUpFooter";
import ResetPasswordHeader from "./ResetPasswordHeader";
import "../../styles/signin/signin.css";

export function SignInComponent() {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  const checkSecretCode = async (value) => {
    if (value !== "divotbeta1") {
      throw new Error("Invalid secret code. Please enter the correct code.");
    }
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        console.log(hasRedirected);
        if (!hasRedirected) {
          if (user.attributes.email != "") {
            try {
              // Query the user's data using DataStore
              const users = await DataStore.query(User, (u) =>
                u.email.eq(user.attributes.email)
              );
              if (users.length > 0) {
                const userData = users[0];
                console.log("userData:", userData);
                console.log(user.hasCompletedForm);
                if (!userData.hasCompletedForm) {
                  console.log(
                    "User hasn't completed the form. Redirecting to /comp"
                  );
                  // User hasn't completed the form, redirect to completion page
                  navigate("/complete-profile");
                  setHasRedirected(true);
                  return;
                }
              }
            } catch (error) {
              console.error("Error querying user data:", error);
            }
          }

          // User has completed the form or an error occurred, proceed to home page
          navigate("/");
          refreshPage();
          setHasRedirected(true);
          console.log(user.attributes.email);
          refreshPage();
        }
      })
      .catch(() => {
        // User is not authenticated, continue rendering the sign-in component
      });
  }, [navigate, hasRedirected]);

  function refreshPage() {
    window.location.reload(false);
  }

  return <div className="fill-background"></div>;
}

export default SignInComponent;
