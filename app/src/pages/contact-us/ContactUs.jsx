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

  return (
    <div className="contact-us">
      <div className="contact-us-container">
        <div className="contact-us-title">
          Contact Us
          <div className="chat-box-text">
            {" "}
            <div
              className={`chat-box-text ${isChatAvailable ? "highlight" : ""}`}
            >
              {" "}
              <TidioWrapper icon="available" />{" "}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label>Questions or Inquiries</label>
            <textarea
              value={inquiry}
              onChange={handleInquiryChange}
              maxLength={1000} // Set the character limit
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
