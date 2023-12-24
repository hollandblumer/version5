import React, { useState, useEffect } from "react";
import Footer2 from "../../components/footer/Footer2";
import "../../styles/contact-us/contact-us.css";
import TidioWrapper from "../../TidioWrapper";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isChatAvailable, setIsChatAvailable] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleInputFocus = (input) => {
    if (input === "name") {
      setNameFocused(true);
    } else if (input === "email") {
      setEmailFocused(true);
    }
  };

  const handleInputBlur = (input) => {
    if (input === "name") {
      setNameFocused(name !== "");
    } else if (input === "email") {
      setEmailFocused(email !== "");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (honeypot) {
      alert("This submission appears to be from a bot.");
      return;
    }

    try {
      const response = await fetch("https://formkeep.com/f/638529748915", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          inquiry,
        }),
      });

      if (response.ok) {
        alert("Your inquiry has been submitted.");
      } else {
        alert("Failed to submit inquiry. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("An error occurred. Please try again later.");
    }

    // Reset form fields after submission
    setName("");
    setEmail("");
    setInquiry("");
    setHoneypot("");
    setNameFocused(false);
    setEmailFocused(false);
  };

  return (
    <div className="contact-us">
      <div className="contact-us-container">
        <div className="contact-us-title">Contact Us</div>
        <div className="chat-box-text">
          <div
            className={`chat-box-text ${isChatAvailable ? "highlight" : ""}`}
          >
            <TidioWrapper icon="h" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          action="https://formkeep.com/f/638529748915"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          method="POST"
        >
          <div className="form-group">
            <label
              className={`form-label ${nameFocused ? "focused-label" : ""}`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="custom-form-input"
              value={name}
              onChange={handleNameChange}
              onFocus={() => handleInputFocus("name")}
              onBlur={() => handleInputBlur("name")}
              required
            />
          </div>
          <div className="form-group-delay">
            <label
              className={`form-label ${emailFocused ? "focused-label" : ""}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="custom-form-input"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => handleInputFocus("email")}
              onBlur={() => handleInputBlur("email")}
              required
            />
          </div>
          <div>
            <textarea
              className="contact-us-textbox"
              value={inquiry}
              onChange={handleInquiryChange}
              maxLength={1000}
              placeholder="Questions or Inquiries"
              required
            />
            <div className="character-limit">
              Max {inquiry.length} / 1000 characters
            </div>
          </div>
          <div style={{ display: "none" }}>
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
