import React from "react";
import Footer2 from "../../components/footer/Footer2";
import "../../styles/faqs/faqs.css";

function FAQs() {
  return (
    <div>
      <div className="faq-container">
        <div className="question-title">Frequently Asked Questions</div>
        <div className="question">How do I use Divot?</div>
        <div className="answer">
          Use this tool to communicate among the masses your thoughts about your
          favorite brands.
        </div>
        <div className="question">How do I know if a company sees Divot?</div>
        <div className="answer">
          We are currently reaching out to many brands to get them on the
          platform for visibility. In the meantime, you can add a brand here and
          suggest they join the platform.
        </div>
        <div className="question">
          What can I do to ensure the company sees my suggestion?
        </div>
        <div className="answer">
          If you are eager to share your thoughts with the company, please email
          them directly. Ideally, this would be a platform for companies to
          update you on their progress in making improvements. We have email
          templates here that make it easier.
        </div>

        <div className="question">How do I delete my account?</div>
        <div className="answer">
          To delete your account, please email us at info@joinddivot.com or
          contact us via the chatbox. We are available from 9 AM to 6 PM. If you
          choose to delete your account, kindly provide honest feedback about
          why you're doing so, so we can improve accordingly.
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default FAQs;
