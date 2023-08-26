import React, { useState, useEffect } from "react";
import "../../../styles/user/dirt/dirt.css";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";

function Dirt({ brand, showBlankAvatar }) {
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const blankAvatarURL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NSIgaGVpZ2h0PSI2NSIgdmlld0JveD0iMCAwIDY1IDY1Ij4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6IzFiN2IxNztsaW5lLWhlaWdodDowOyIgLz4KPC9zdmc+Cg==";

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
    height: "72px",
    width: "72px",
    border: "1px solid #dbdbdb",
    backgroundColor: showBlankAvatar ? "#e8e5dd" : "transparent", // Set background color here
    filter: signedProfileURL ? "blur(5px)" : "none", // Apply blur effect if no URL
  };

  return (
    <div className="url-user-brand-avatar">
      <Avatar src={signedProfileURL} sx={avatarStyle} />
    </div>
  );
}

export default Dirt;
