import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";

function CustomSignUpForm() {
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretPasscode, setSecretPasscode] = useState(""); // Add secret passcode state

  const handleSignUp = async () => {
    try {
      // Check if the secret passcode is correct
      if (secretPasscode !== "divotbeta1") {
        // Show an error message or handle the incorrect passcode scenario
        return;
      }

      // Perform the sign-up logic here using Amplify Auth
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          given_name: givenName,
          family_name: familyName,
        },
      });

      // Handle success or navigate to the next page
    } catch (error) {
      // Handle sign-up errors
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={givenName}
        onChange={(e) => setGivenName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Secret Passcode" // Add passcode field
        value={secretPasscode}
        onChange={(e) => setSecretPasscode(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default CustomSignUpForm;
