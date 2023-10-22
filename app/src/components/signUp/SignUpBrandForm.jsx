import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../../assets/images/eye-icon.png";
import EyeSlashIcon from "../../assets/images/eye-slash-icon.png";
import emailjs from "emailjs-com";
import "../../styles/signin/signin.css";
import Footer2 from "../footer/Footer2";

function SignUpBrandForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: "",
    yourName: "",
    yourPosition: "",
    linkedInUrl: "",
    certify: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.certify) {
      const emailContent = `
        Brand Name: ${formData.brandName}
        Your Name: ${formData.yourName}
        Your Position: ${formData.yourPosition}
        LinkedIn URL: ${formData.linkedInUrl}
      `;

      emailjs
        .send(
          "your_emailjs_service_id",
          "your_emailjs_template_id",
          {
            to_email: "info@joindivot.com",
            from_name: formData.yourName,
            subject: `${formData.brandName} Brand Inquiry Form`,
            content: emailContent,
          },
          "your_emailjs_user_id"
        )
        .then(
          (response) => {
            setSuccessMessage(
              "You applied. We will get back to you within 72 hours."
            );
            setError(null);
          },
          (error) => {
            setError("Error sending the email. Please try again later.");
            console.error("Email error:", error);
          }
        );
    } else {
      setError("Please certify that you are a representative of this brand.");
    }
  };

  const handleInputFocus = (input) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${input}Focused`]: true,
    }));
  };

  const handleInputBlur = (input) => {
    if (!formData[input]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${input}Focused`]: false,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showConfirmPassword: !prevFormData.showConfirmPassword,
    }));
  };

  return (
    <div className="sign-up-brand-page">
      <div className="signin-title">Business Application</div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label
            className={`form-label ${
              formData.brandNameFocused ? "focused-label" : ""
            }`}
            htmlFor="brandName"
          >
            Brand Name
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            className="custom-form-input"
            value={formData.brandName}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("brandName")}
            onBlur={() => handleInputBlur("brandName")}
            required
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formData.yourNameFocused ? "focused-label" : ""
            }`}
            htmlFor="yourName"
          >
            Your Name
          </label>
          <input
            type="text"
            name="yourName"
            id="yourName"
            className="custom-form-input"
            value={formData.yourName}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("yourName")}
            onBlur={() => handleInputBlur("yourName")}
            required
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formData.yourPositionFocused ? "focused-label" : ""
            }`}
            htmlFor="yourPosition"
          >
            Your Position
          </label>
          <input
            type="text"
            name="yourPosition"
            id="yourPosition"
            className="custom-form-input"
            value={formData.yourPosition}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("yourPosition")}
            onBlur={() => handleInputBlur("yourPosition")}
            required
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formData.linkedInUrlFocused ? "focused-label" : ""
            }`}
            htmlFor="linkedInUrl"
          >
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedInUrl"
            id="linkedInUrl"
            className="custom-form-input"
            value={formData.linkedInUrl}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("linkedInUrl")}
            onBlur={() => handleInputBlur("linkedInUrl")}
          />
        </div>

        <div className="brand-form-checkbox">
          <span
            className={`checkbox-form-label ${
              formData.certify ? "checkbox-form-label" : ""
            }`}
          >
            I certify that I am a representative of this brand.
          </span>
          <input
            type="checkbox"
            name="certify"
            checked={formData.certify}
            onChange={handleCheckboxChange}
          />
        </div>

        <button type="submit" className="signin-button">
          APPLY
        </button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      <Footer2 />
    </div>
  );
}

export default SignUpBrandForm;
