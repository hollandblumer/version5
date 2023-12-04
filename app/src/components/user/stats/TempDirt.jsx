import React, { useState, useEffect } from "react";
import "../../../styles/user/dirt/dirt.css";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";
import { Link } from "react-router-dom";

function TempDirt({ brand, showBlankAvatar, index }) {
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const blankAvatarURL = "data:image..."; // shortened for brevity
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const signedFiledAccessURL = await Storage.get(`${brand}.jpg`);
        setSignedProfileURL(signedFiledAccessURL);
        setIsBouncing(true); // Start bouncing animation
      } catch (err) {
        console.error(err);
        if (showBlankAvatar) {
          setSignedProfileURL(blankAvatarURL);
        }
      }
    };
    getData();
  }, [brand, showBlankAvatar]);

  const animationDuration = "1s"; // Adjust the duration of each bounce
  const iterationCount = 1;

  const avatarStyle = {
    height: "50px",
    width: "50px",
    border: "1px solid #dbdbdb",
    backgroundColor: showBlankAvatar ? "#e8e5dd" : "transparent",
    filter: signedProfileURL ? "none" : "blur(5px)",
    position: "relative",
    transition: "top 0.2s linear, left 0.2s linear",
    animation: isBouncing
      ? `bounce1 ${animationDuration} ${iterationCount}`
      : "none",
    animationDelay: isBouncing ? `${index * 0.1}s` : "0s",
    position: "absolute",
    zIndex: isBouncing ? "2000" : "1000", // Set a higher zIndex when bouncing
  };

  const containerStyle = {
    position: "relative",
    width: "80px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: isBouncing ? "2000" : "1000", // Set a higher zIndex when bouncing
    overflow: "visible", // Ensure overflow is set to visible
  };

  return (
    <div style={containerStyle}>
      {showBlankAvatar ? (
        <Avatar src={signedProfileURL} style={avatarStyle} />
      ) : (
        <Link to={`/${brand}`} className="dirt-user">
          <Avatar
            src={signedProfileURL}
            className="dirt-avatar"
            style={avatarStyle}
          />
        </Link>
      )}
    </div>
  );
}

export default TempDirt;
