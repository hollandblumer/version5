// ForgotPassword.js
import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import Footer2 from "../footer/Footer2";
import "../../styles/forgot-password/forgot-password.css";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleInputFocus = () => {
    setUsernameFocused(true);
  };

  const handleInputBlur = () => {
    setUsernameFocused(username !== "");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a password reset confirmation code to the user's email
      const response = await Auth.forgotPassword(username);
      setConfirmationSent(true);

      // Navigate to the ResetPassword route with the username and confirmation code
      const safeDestination = response.CodeDeliveryDetails.Destination.replace(
        /[^a-zA-Z0-9-]/g,
        "-"
      );

      // Construct the URL
      const resetPasswordURL = `/reset-password/${username}/${safeDestination}`;

      // Navigate to the ResetPassword route with the sanitized URL
      navigate(resetPasswordURL);
    } catch (error) {
      setError(error.message);
      console.error("Forgot password error:", error);
    }
  };

  const handleSignInClick = () => {
    navigate("/sign-in"); // Navigate back to the sign-in page
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <h1 className="forgot-password-header">Forgot Your Password?</h1>
        <div>
          Enter your email address below, and we’ll send you an email with a
          link to reset your password.
        </div>
        <form className="forgot-password-form" onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label
              className={`form-label ${usernameFocused ? "focused-label" : ""}`}
              htmlFor="username"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              className="custom-form-input"
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <button className="forgot-password-button">SEND RESET CODE</button>

          {confirmationSent && (
            <p className="confirmation-sent-message">
              Confirmation code sent to your email.
            </p>
          )}
          {error && <p className="error">{error}</p>}
          <p className="signin-link">
            Remember your password?{" "}
            <span className="signin-link-text" onClick={handleSignInClick}>
              Sign In
            </span>
          </p>
        </form>
      </div>
      <Footer2 />
    </div>
  );
}

export default ForgotPassword;
