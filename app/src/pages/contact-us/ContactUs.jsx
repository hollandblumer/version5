import React, { useState, useEffect } from "react";
import Footer2 from "../../components/footer/Footer2";
import "../../styles/contact-us/contact-us.css";
import TidioWrapper from "../../TidioWrapper";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Added honeypot state
  const [isChatAvailable, setIsChatAvailable] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours(); // UTC time
    const estOffset = -4; // Eastern Standard Time (EST) offset in hours
    const estHour = (currentHour + estOffset + 24) % 24; // Convert to EST time

    if (estHour >= 9 && estHour < 17) {
      setIsChatAvailable(true);
    } else {
      setIsChatAvailable(false);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInquiryChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 1000) {
      setInquiry(inputValue);
    }
  };

  const handleHoneypotChange = (event) => {
    setHoneypot(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (honeypot) {
      alert("This submission appears to be from a bot.");
      return;
    }

    // ... email sending logic

    // Reset form fields after submission
    setName("");
    setEmail("");
    setInquiry("");
    setHoneypot("");

    alert("Your inquiry has been submitted.");
  };
  const username = "holland";
  const password = "PASSWORD";
  return (
    <div className="contact-us">
      <div className="contact-us-container">
        <div className="contact-us-title">Contact Us</div>
        <div className="chat-box-text">
          {" "}
          <div
            className={`chat-box-text ${isChatAvailable ? "highlight" : ""}`}
          >
            {" "}
            <TidioWrapper icon="h" />{" "}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              className={`form-label ${usernameFocused ? "focused-label" : ""}`}
              htmlFor="username"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              className="custom-form-input"
              onFocus={() => handleInputFocus("username")}
              onBlur={() => handleInputBlur("username")}
              required
            />
          </div>
          <div className="form-group-delay">
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
              onFocus={() => handleInputFocus("username")}
              onBlur={() => handleInputBlur("username")}
              required
            />
          </div>
          <div>
            {/* <label>Questions or Inquiries</label> */}
            <textarea
              className="contact-us-textbox"
              value={inquiry}
              onChange={handleInquiryChange}
              maxLength={1000} // Set the character limit
              placeholder="Questions or Inquiries"
              required
            />
            <div className="character-limit">
              Max {inquiry.length} / 1000 characters
            </div>
          </div>
          <div style={{ display: "none" }}>
            {/* Hidden honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={handleHoneypotChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer2 />
    </div>
  );
}

export default ContactUs;
