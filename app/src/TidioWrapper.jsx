import { useState, useEffect } from "react";
import "./styles/signin/signin.css";
import { Helmet } from "react-helmet";

function TidioWrapper() {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };



  useEffect(() => {
    // Create and append the <style> element to the head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes bounceAnimation {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }

      #tidio-chat-iframe {
        animation: ${hover ? 'bounceAnimation 0.5s infinite' : 'none'};
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up the style element when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [hover]);

  return (
    <div className="info-wrapper">
      {/* Info icon */}
      <div className="info-logo" onMouseEnter={onHover} onMouseLeave={onLeave}>
        ⓘ
      </div>

      {/* Tidio widget */}
      <Helmet>      <script src="//code.tidio.co/zzznw1zygdk0iqjo21gi0g9efxwdrxmi.js" async />
</Helmet>

      {/* Info message */}
   
    </div>
  );
}

export default TidioWrapper;