import "./App.css";
import { useState, useEffect, useRef, React } from "react";
import {
  withAuthenticator,
  AmplifySignOut,
  useTheme,
} from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { User, Suggestion } from "./models";
import { Auth } from "@aws-amplify/auth";
import { SignInHeader } from "./components/signin/SignInHeader";
import { SignInFooter } from "./components/signin/SignInFooter";
import Header from "./components/signin/Header";
import Home from "./pages/home/Home";
import Footer2 from "./components/footer/Footer2";
import Header2 from "./components/header/Header2";
import { Amplify, Storage } from "aws-amplify";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import AddBrand from "./components/brand/AddBrand";
import Dashboard from "./Dashboard";
import Movie from "./assets/videos/logo.mp4";
import awsconfig from "./aws-exports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Logo from "./components/signin/Header";
import "./styles/header/header.css";
import Search from "./components/header/Search";
import Dropdown from "./components/header/Dropdown";
import { faMagnifyingGlass, faHome } from "@fortawesome/free-solid-svg-icons";
import LoaderImage from "./assets/images/loader-image.png";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { I18n } from "aws-amplify";
import { SignUp } from "@aws-amplify/ui-react";

function App() {
  const videoRef = useRef();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const [userList, setUserList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userIDString, setUserIDString] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState([]);
  const [suggestionId, setSuggestionId] = useState([]);
  const [profileURL, setProfileURL] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [thisID, setThisID] = useState("");

  const [fade, setFade] = useState(false);
  const [moveUp, setMoveUp] = useState(false);

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  DataStore.start();

  useEffect(() => {
    const getData = async () => {
      try {
        getUsername();
        getEmail();
        /*  const info = await Auth.currentAuthenticatedUser();
        const uname = info.idToken.payload["cognito:username"];

   */
        const info = await Auth.currentSession();
        const uname = info.idToken.payload["cognito:username"];
        setFade(true);
        setTimeout(() => {
          setMoveUp(true);
          setTimeout(() => {
            setFade(false);
          }, 1000); // Adjust the fade out duration as needed
        }, 3000);

        const signedInUserData = await DataStore.query(User, (post) =>
          post.name.eq(uname)
        );
        console.log(uname);

        setUserList(signedInUserData);

        setUserIDString(signedInUserData[0].id);

        const signedUserFilePath = signedInUserData[0].filePath;

        const signedFiledAccessURL = await Storage.get(signedUserFilePath);
        setSignedProfileURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const getUsername = async () => {
    try {
      let info = await Auth.currentSession();
      let userName = info.idToken.payload["cognito:username"];
      setUser(userName);
    } catch (err) {
      console.log(err);
    }
  };

  const getEmail = async () => {
    try {
      let info = await Auth.currentSession();
      let email = info.idToken.payload["email"];
      setEmail(email);
    } catch (err) {
      console.log(err);
    }
  };
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        // Handle password mismatch error
        return;
      }

      // Perform the sign-up logic here using Amplify Auth
      const signUpResult = await Auth.signUp({
  
        attributes: {
          given_name: givenName,
          family_name: familyName,
        },
        username: email,
        password: password,
      });
         // Handle success or navigate to the next page
    } catch (error) {
      // Handle sign-up errors
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="App">
    
      {/* <div className="overlay">
        <div
          className={`image-container ${fade ? "fade" : ""} ${
            moveUp ? "move-up" : ""
          }`}
        >
          <img src={LoaderImage} className="loader-image" alt="Logo image" />
        </div>
      </div> */}
      <div className="header-shadow">
        {/*  <div className="banner">
          <div>
            Virtual Conference on 12/1 <u> Learn More </u>
          </div>
        </div> */}
        <div className="header-container">
          <div className="header">
            <div
              className="header-search"
              onClick={() => setShowInput(!showInput)}
            >
              {showInput ? (
                <div className="exit-search">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    color="#b5a98b"
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  color="#b7b1a7"
                />
              )}
              <div>
                <Link to={`/`} replace>
                  {" "}
                  <FontAwesomeIcon icon={faHome} color="#b7b1a7" size="lg" />
                </Link>
              </div>
            </div>{" "}
            <div className="header-logo">
              {" "}
              <div className="logo">Divot</div>{" "}
              <div className="beta">
                Beta
                <div
                  className="info-logo"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  ⓘ
                </div>
              </div>
              {hover ? (
                <div className="info-message">
                  This is a beta version, which means there may be some issues
                  with it
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="header-icons">
              <Dropdown url={signedProfileURL} user={user} />
              <FontAwesomeIcon icon={faBell} color="#b7b1a7" size="lg" />
            </div>
          </div>
        </div>

        {/* <div className="header-border"></div> */}
      </div>
      <div className={` ${showInput ? "app-content" : "app-content-2"}`}>
        {showInput ? (
          <div className="search-panel">
            <Search />{" "}
          </div>
        ) : (
          <div></div>
        )}
        <Routes>
          {/* <Route path="/home" element={<Navigate to={Home} />} /> */}

          {/* <Route path="/" element={<Navigate to={`/${user}`} />} /> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/:name"
            element={<Dashboard user={user} email={email} id={userIDString} />}
          />

          <Route path="/brand-form" element={<AddBrand />} />

          {/* {isBusiness? (<Route path ='/:name' element={ <BrandDashboard user={user} email={email}/>  }/>):(<Route path ='/:name' element={ <UserDashboard user={user} email={email}/>}/>)} */}
        </Routes>
      </div>

      <div>
        <input
          type="text"
          placeholder="First Name"
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      {/*    <button
          onClick={async () => {
            await Auth.signOut();
    
            await DataStore.clear();
            // window.location.reload(false);
          }}
        >
          Sign Out{" "}
        </button> */}
    </div>
  );
}

I18n.putVocabulariesForLanguage("en", {
  "Sign In": "Sign In", // Tab header
});

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
  },

  hideSignUp: false,

  formFields: {
    signUp: {
      given_name: {
        labelHidden: true,
        placeholder: "given_name",
        isRequired: true,
        label: "First Name",
      },
     family_name: {
        labelHidden: true,
        placeholder: "family_name",
        isRequired: true,
        label: "Last Name:",
      },

    
   


    },

    signIn: {
      username: {
        labelHidden: true,
        placeholder: "Email",
        isRequired: true,
        label: "Username:",
      },
      password: {
        labelHidden: true,
        placeholder: "Password",
        isRequired: true,
        label: "Password:",
      },
    },
  },
});
