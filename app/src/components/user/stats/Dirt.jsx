import React, { useState, useEffect } from "react";
import "../../../styles/user/dirt/dirt.css";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";
import { Link } from "react-router-dom";

function Dirt({ brand, showBlankAvatar }) {
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const blankAvatarURL = "data:image..."; // shortened for brevity

  const [position, setPosition] = useState({ x: 0, y: 10 });
  const [direction, setDirection] = useState({
    x: Math.random() < 0.5 ? 1 : -1,
    y: Math.random() < 0.5 ? 1 : -1,
  });

  useEffect(() => {
    const move = () => {
      // Randomize movement magnitude for y between 1 and 3
      const magnitudeY = Math.floor(Math.random() * 3) + 1;

      // Only change y value
      let newY = position.y + magnitudeY * direction.y;

      // Randomly change y-direction with a 10% chance
      if (Math.random() < 0.1) {
        setDirection((prev) => ({ x: 0, y: -prev.y })); // keep x direction constant
      }

      // Adjust y position when boundary is hit
      if (newY > 13 || newY < -13) {
        setDirection({ ...direction, y: -direction.y });
      } else {
        setPosition((prev) => ({ x: 0, y: newY })); // keep x constant
      }
    };

    const randomInterval = Math.floor(Math.random() * 200) + 50; // Random interval between 50ms and 250ms
    const interval = setInterval(move, randomInterval);

    return () => clearInterval(interval);
  }, [position, direction]);

  useEffect(() => {
    const getData = async () => {
      try {
        const signedFiledAccessURL = await Storage.get(`${brand}.jpg`);
        setSignedProfileURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
        if (showBlankAvatar) {
          setSignedProfileURL(blankAvatarURL);
        }
      }
    };
    getData();
  }, [brand, showBlankAvatar]);

  const avatarStyle = {
    height: "50px",
    width: "50px",
    border: "1px solid #dbdbdb",
    backgroundColor: showBlankAvatar ? "#e8e5dd" : "transparent",
    filter: signedProfileURL ? "none" : "blur(5px)",
    position: "relative",
    left: `${position.x}px`,
    top: `${position.y + 11}px`, // Adjusted for vertical centering
    transition: "top 0.2s linear, left 0.2s linear",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "80px",
        height: "100px",
        display: "flex", // Enable Flexbox
        alignItems: "center", // Vertically center content
        justifyContent: "center", // Horizontally center content
      }}
    >
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

export default Dirt;
