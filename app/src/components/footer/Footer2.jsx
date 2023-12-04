import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import "../../styles/footer/footer.css";

function Footer2() {
  return (
    <div className="footer">
      <div className="footer-links">
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/about">About</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/apply">Apply</Link>
      </div>
    </div>
  );
}

export default Footer2;
