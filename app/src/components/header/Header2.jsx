import { React, useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import Search from "./Search";
import Dropdown from "./Dropdown";
import { User } from "../../models";
import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { SignInHeader } from "../signin/SignInHeader";
import { SignInFooter } from "../signin/SignInFooter";
import Logo from "../signin/Header";
import "../../styles/header/header.css";

Amplify.configure(awsconfig);

function Header2({ url, user }) {
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState([]);
  const [suggestionId, setSuggestionId] = useState([]);
  const [profileURL, setProfileURL] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const [thisID, setThisID] = useState("");

  return (
    <div className="header-shadow">
      <div className="banner">
        <div>
          Virtual Conference on 12/1 <u> Learn More </u>
        </div>
      </div>
      <div className="header">
        <Search />
        <div className="logo">App</div>
        <div className="header-icons">
          <Dropdown url={url} user={user} />
          <FontAwesomeIcon icon={faBell} color="#a7a7a7" size="lg" />

          {/* <FontAwesomeIcon icon={faBell} color="#cccccc" size="lg" /> */}
        </div>
      </div>
      <div className="header-border">
        {/*    <p>
          Virtual Conference on 12/1 <u> Learn More </u>
        </p> */}
      </div>
    </div>
  );
}

export default withAuthenticator(Header2, {
  components: {
    Logo,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
  },
});
