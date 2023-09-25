import "./App.css";
import { useState, useEffect, React } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";
import { Auth } from "@aws-amplify/auth";
import Home from "./pages/home/Home";
import Header2 from "./components/header/Header2"; // for some reason this is necessary
import { Storage } from "aws-amplify";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AddBrand from "./components/brand/AddBrand";
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./styles/header/header.css";
import Search from "./components/header/Search";
import Dropdown from "./components/header/Dropdown";
import { faMagnifyingGlass, faHome } from "@fortawesome/free-solid-svg-icons";
import SignInComponent from "./components/signin/SignInComponent";
import TidioWrapper from "./TidioWrapper";
import CompleteProfile from "./components/signin/CompleteProfile";
import About from "./pages/about/About";
import ContactUs from "./pages/contact-us/ContactUs";
import Apply from "./pages/apply/Apply";
import SignUpBrandForm from "./components/signup/SignUpBrandForm";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import Notifications from "./components/notification/Notifications";
import GetNotificationsCount from "./components/notification/GetNotificationCount";

function App() {
  const [userName, setUserName] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const path = location.pathname;

  DataStore.start();

  useEffect(() => {
    checkAuthStatus();

    const getData = async () => {
      try {
        const info = await Auth.currentSession();
        const userId = info.idToken.payload["cognito:username"];
        setUserId(userId);
        const signedInUserData = await DataStore.query(User, (post) =>
          post.id.eq(userId)
        );
        setUserData(signedInUserData[0]);
        setUserName(signedInUserData[0].name);
        const signedUserFilePath = signedInUserData[0].filePath;

        if (signedUserFilePath) {
          // If there's a file path, retrieve the signed URL
          const signedFiledAccessURL = await Storage.get(signedUserFilePath);
          setSignedProfileURL(signedFiledAccessURL);
        } else {
          // Set a default avatar image
          setSignedProfileURL("path/to/default/avatar/image.jpg");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-left">
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
          </div>{" "}
          {path === "/" ? (
            <Link to="/about" className="about-link" replace>
              About
            </Link>
          ) : (
            <Link to="/" replace>
              <FontAwesomeIcon icon={faHome} color="#b7b1a7" size="lg" />
            </Link>
          )}
        </div>
        <div className="header-logo">
          {" "}
          <div className="logo">Divot</div>{" "}
          <div className="beta">
            Beta
            <TidioWrapper icon="info" />
          </div>
        </div>
        <div className="header-icons">
          {loggedIn ? (
            <Dropdown url={signedProfileURL} username={userName} />
          ) : (
            <Link to="/sign-in" className="sign-in-link">
              Sign In
            </Link>
          )}
          {loggedIn ? (
            <div
              className="notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FontAwesomeIcon
                className="bell-icon"
                icon={faBell}
                color="#b7b1a7"
                size="lg"
              />
              <GetNotificationsCount userId={userId} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {showNotifications && (
        <Notifications
          userId={userId}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      )}

      <div className={` ${showInput ? "app-content" : "app-content-2"}`}>
        {showInput ? (
          <div className="search-panel">
            <Search />{" "}
          </div>
        ) : (
          <div></div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:name"
            element={
              loggedIn &&
              path !== "/sign-in" &&
              path !== "/complete-profile" &&
              path !== "/about" &&
              path !== "/contact-us" &&
              path !== "/terms" &&
              path !== "/terms" &&
              path !== "/claim-brand" &&
              path !== "/apply" ? (
                <Dashboard SignedInUser={userData} />
              ) : (
                <Dashboard SignedInUser={userData} />
              )
            }
          />
          <Route path="/brand-form" element={<AddBrand />} />
          <Route path="/sign-in" element={<SignInComponent />} />
          <Route path="/claim-brand" element={<SignUpBrandForm />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
