import React from "react";
import "../../styles/blob-animation/blob-animation.css"; // Create a CSS file for your animation styles

function BlobAnimation({ url }) {
  const blobStyle = {
    backgroundImage: `url(${url})`,
  };

  return (
    <div className="outer-blob-container">
      <div className="outer-blob">
        <div className="inner-blob" style={blobStyle}>
          {/* You can optionally include child content here */}
        </div>
      </div>
      {/* <div className="inner-blob-2"></div> */}
    </div>
  );
}

export default BlobAnimation;
