import React from "react";
import { useState, useEffect } from "react";
import "../../../../styles/user/stats/dirt/dirt.css";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";

function Dirt({ brand }) {
  const [signedProfileURL, setSignedProfileURL] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const signedFiledAccessURL = await Storage.get(`${brand}.jpg`);
        setSignedProfileURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Avatar
        src={signedProfileURL}
        // sx={{ height: "65px", width: "65px" }}
        //  sx={{ height: "78px", width: "78px" }} real looked good before promo
        sx={{ height: "72px", width: "72px" }}
        r
        style={{
          border: "1px solid #dbdbdb",
          /*  boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px", */
        }}
      />
    </div>
  );
}

export default Dirt;
