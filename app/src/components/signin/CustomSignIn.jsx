import React, { useState, useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import EyeIcon from "../../assets/images/eye-icon.png";
import EyeSlashIcon from "../../assets/images/eye-slash-icon.png";
import Footer2 from "../footer/Footer2";
import { DataStore } from "aws-amplify";
import { User } from "../../models"; // Import the User model

function CustomSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state variable
  const [error, setError] = useState(null);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isSignInLoading, setIsSignILoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputFocus = (input) => {
    if (input === "username") {
      setUsernameFocused(true);
    } else if (input === "password") {
      setPasswordFocused(true);
    }
  };

  const handleInputBlur = (input) => {
    if (input === "username") {
      setUsernameFocused(username !== "");
    } else if (input === "password") {
      setPasswordFocused(password !== "");
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // You can define a route for the password reset page
  };
  const handleSignUp = () => {
    navigate("/sign-up"); // You can define a route for the password reset page
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSignILoading(true);
    try {
      // Sign in using Amplify Auth
      await Auth.signIn(username, password);

      // Redirect to the appropriate page (e.g., dashboard)
      const user = await Auth.currentAuthenticatedUser();
      const cognitoUserId = user.attributes.sub;
      const userProfileData = await DataStore.query(User, (u) =>
        u.id.eq(cognitoUserId)
      );

      if (userProfileData.length > 0 && userProfileData[0].hasCompletedForm) {
        // Redirect to the appropriate page (e.g., dashboard)
        navigate("/");
        refreshPage();
      } else {
        // Redirect to the complete-profile page
        navigate("/complete-profile");
      }
    } catch (error) {
      setIsSignILoading(false);
      setError(error.message);
      console.error("Sign-in error:", error);

      // Check if the error message indicates that email confirmation is needed
      if (error.message === "User is not confirmed.") {
        // Redirect the user to the verification page
        await Auth.resendSignUp(username);
        navigate(`/verify/${username}/undefined`);
      }
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <div className="custom-signin-container">
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="signin-header">
            <div className="signin-title">Sign In </div>
            <div className="signup-redirect">Don't have an account?</div>
            <button type="button" onClick={handleSignUp}>
              {" "}
              Join Now
            </button>
          </div>

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
              onFocus={() => handleInputFocus("username")}
              onBlur={() => handleInputBlur("username")}
              required
            />
          </div>
          <div className="form-group">
            <label
              className={`form-label ${passwordFocused ? "focused-label" : ""}`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="input-with-toggle">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="custom-form-input"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img
                    className="eye-slash-icon"
                    src={EyeSlashIcon}
                    alt="Hide Password"
                  />
                ) : (
                  <img className="eye-icon" src={EyeIcon} alt="Show Password" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="signin-button">
            {isSignInLoading ? (
              <div className="bouncing">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="forgot-password-text">
          <button
            type="button"
            className="forgot-password-redirect"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
      <Footer2 />
    </div>
  );
}

export default CustomSignIn;
