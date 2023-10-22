import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { useNavigate, useParams } from "react-router-dom";

function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { username } = useParams(); // Extract the username from URL params
  const navigate = useNavigate();

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      // Verify the provided verification code
      await Auth.confirmSignUp(username, verificationCode);
      setVerificationSuccess(true);

      // Redirect the user to the sign-in page after successful verification
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      console.error("Verification error:", error);
    }
  };

  const handleSignInClick = () => {
    navigate("/sign-in"); // Navigate back to the sign-in page
  };

  return (
    <div className="verification-container">
      <form className="verification-form" onSubmit={handleVerifyCode}>
        <h1 className="verification-header">Email Verification</h1>
        <p className="verification-info">
          A verification code has been sent to your email. Please enter it
          below.
        </p>
        <div className="form-group">
          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            className="custom-form-input"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="verify-button">
            Verify
          </button>
        </div>
        {verificationSuccess ? (
          <p className="verification-success-message">
            Email verification successful. You can now{" "}
            <span onClick={handleSignInClick}>Sign In</span>.
          </p>
        ) : (
          <p className="verification-success-message">
            {/* Display a different message or UI for unsuccessful verification */}
            Verification code is incorrect. Please try again.
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Verification;
