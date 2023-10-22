import React, { useState, useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [step, setStep] = useState("enterCode");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the URL parameters to get username and code
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get("username");
    const destinationParam = searchParams.get("destination");

    // Set the state values based on URL parameters
    if (usernameParam && destinationParam) {
      setUsername(usernameParam);
      // Set the code or destination parameter based on your URL structure
      setCode(destinationParam);
    }
  }, [location]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      // Verify the confirmation code
      await Auth.forgotPasswordSubmit(username, code, newPassword);

      // If code verification succeeds, proceed to reset the password
      setStep("resetPassword");
    } catch (error) {
      setError(error.message);
      console.error("Code verification error:", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Reset the password using the confirmation code and new password
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      navigate("/sign-in"); // Navigate back to the sign-in page after successful password reset
    } catch (error) {
      setError(error.message);
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="reset-password-container">
      {step === "enterCode" && (
        <form className="reset-password-form" onSubmit={handleVerifyCode}>
          <h1 className="reset-password-header">Enter Confirmation Code</h1>
          <div className="form-group">
            <label htmlFor="code">Confirmation Code:</label>
            <input
              type="text"
              id="code"
              className="custom-form-input"
              value={code}
              onChange={handleCodeChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="reset-password-button">
              Verify Code
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      )}

      {step === "resetPassword" && (
        <form className="reset-password-form" onSubmit={handleResetPassword}>
          <h1 className="reset-password-header">Reset Password</h1>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="custom-form-input"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="reset-password-button">
              Reset Password
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
