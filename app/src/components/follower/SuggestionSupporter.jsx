import React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";

function SuggestionSupporter({ username }) {
  const [signedProfileURL, setSignedProfileURL] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const signedFiledAccessURL = await Storage.get(`${username}.jpg`);
        setSignedProfileURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [username]);

  return (
    <Avatar
      src={signedProfileURL}
      style={{
        border: "1px solid white",
        marginLeft: "-22px",
      }}
    />
  );
}

export default SuggestionSupporter;
