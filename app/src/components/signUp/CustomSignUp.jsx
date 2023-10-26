import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../../assets/images/eye-icon.png";
import EyeSlashIcon from "../../assets/images/eye-slash-icon.png";
import "../../styles/signup/signup.css";
import Footer2 from "../footer/Footer2";

function CustomSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    given_name: "",
    family_name: "",
    secret_code: "",
  });
  const [error, setError] = useState(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [givenNameFocused, setGivenNameFocused] = useState(false);
  const [familyNameFocused, setFamilyNameFocused] = useState(false);
  const [secretCodeFocused, setSecretCodeFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    navigate("/sign-in"); // You can define a route for the password reset page
  };
  const handleBrandForm = () => {
    navigate("/claim-brand"); // You can define a route for the password reset page
  };

  const handleInputFocus = (input) => {
    if (input === "email") {
      setEmailFocused(true);
    } else if (input === "password") {
      setPasswordFocused(true);
    } else if (input === "confirm_password") {
      setConfirmPasswordFocused(true);
    } else if (input === "given_name") {
      setGivenNameFocused(true);
    } else if (input === "family_name") {
      setFamilyNameFocused(true);
    } else if (input === "secret_code") {
      setSecretCodeFocused(true);
    }
  };

  const handleInputBlur = (input) => {
    if (input === "email") {
      setEmailFocused(formData.email !== "");
    } else if (input === "password") {
      setPasswordFocused(formData.password !== "");
    } else if (input === "confirm_password") {
      setConfirmPasswordFocused(formData.confirm_password !== "");
    } else if (input === "given_name") {
      setGivenNameFocused(formData.given_name !== "");
    } else if (input === "family_name") {
      setFamilyNameFocused(formData.family_name !== "");
    } else if (input === "secret_code") {
      setSecretCodeFocused(formData.secret_code !== "");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Check if the secret code is correct
      if (formData.secret_code === "divotbeta1") {
        const signUpResponse = await Auth.signUp({
          username: formData.email,
          password: formData.password,
          attributes: {
            given_name: formData.given_name,
            family_name: formData.family_name,
          },
        });
        // Continue with the sign-up process
        const verificationCode = signUpResponse.code;

        navigate(`/verify/${formData.email}/${verificationCode}`);
      } else {
        // Display an error message or handle invalid secret code
        setError("Invalid secret code");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <div className="custom-signin-container">
        <form className="signin-form" onSubmit={handleSignUp}>
          <div className="signup-header">
            <div className="signup-title"> Sign Up </div>
            <div className="business-form-redirect">
              Business?
              <button onClick={handleBrandForm}> Apply as Business </button>
            </div>
            <div className="signin-redirect">
              Already have an account?{" "}
              <div onClick={handleSignIn}> Sign In</div>{" "}
            </div>
          </div>
          <div className="form-group-sign-up">
            <label
              className={`form-label ${
                givenNameFocused ? "focused-label" : ""
              }`}
              htmlFor="given_name"
            >
              First Name
            </label>
            <input
              type="text"
              name="given_name"
              className="custom-form-input"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("given_name")}
              onBlur={() => handleInputBlur("given_name")}
              value={formData.given_name}
              required
            />
          </div>
          <div className="form-group-sign-up">
            <label
              className={`form-label ${
                familyNameFocused ? "focused-label" : ""
              }`}
              htmlFor="family_name"
            >
              Last Name
            </label>
            <input
              type="text"
              name="family_name"
              className="custom-form-input"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("family_name")}
              onBlur={() => handleInputBlur("family_name")}
              value={formData.family_name}
              required
            />
          </div>
          <div className="form-group-sign-up">
            <label
              className={`form-label ${
                secretCodeFocused ? "focused-label" : ""
              }`}
              htmlFor="secret_code"
            >
              Secret Code
            </label>
            <input
              type="text"
              name="secret_code"
              className="custom-form-input"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("secret_code")}
              onBlur={() => handleInputBlur("secret_code")}
              value={formData.secret_code}
              required
            />
          </div>
          <div className="form-group-sign-up">
            <label
              className={`form-label ${emailFocused ? "focused-label" : ""}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              className="custom-form-input"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("email")}
              onBlur={() => handleInputBlur("email")}
              value={formData.email}
              required
            />
          </div>
          <div className="form-group-sign-up">
            <label
              className={`form-label ${passwordFocused ? "focused-label" : ""}`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="input-with-toggle">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="custom-form-input"
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
                value={formData.password}
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
          <div className="form-group-sign-up">
            <label
              className={`form-label ${
                confirmPasswordFocused ? "focused-label" : ""
              }`}
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <div className="input-with-toggle">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                className="custom-form-input"
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("confirm_password")}
                onBlur={() => handleInputBlur("confirm_password")}
                value={formData.confirm_password}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
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
            {" "}
            SIGN UP
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <Footer2 />
    </div>
  );
}

export default CustomSignUp;
