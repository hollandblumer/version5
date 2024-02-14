import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";
import { Auth } from "@aws-amplify/auth";
import Home from "./pages/home/Home";
import Header2 from "./components/header/Header2";
import { Storage } from "aws-amplify";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AddBrand from "./components/brand/AddBrand";
import Dashboard from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "./styles/header/header.css";
import Search from "./components/header/Search";
import Dropdown from "./components/header/Dropdown";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import SignInComponent from "./components/signin/SignInComponent";
import TidioWrapper from "./TidioWrapper";
import CompleteProfile from "./components/signin/CompleteProfile";
import About from "./pages/about/About";
import ContactUs from "./pages/contact-us/ContactUs";
import Apply from "./pages/apply/Apply";
import SignUpBrandForm from "./components/signup/SignUpBrandForm";
import FAQs from "./pages/FAQs/FAQs";
import Notifications from "./components/notification/Notifications";
import GetNotificationsCount from "./components/notification/GetNotificationCount";
import CustomSignIn from "./components/signin/CustomSignIn";
import CustomSignUp from "./components/signup/CustomSignUp";
import ForgotPassword from "./components/signin/ForgotPassword";
import ResetPassword from "./components/signin/ResetPassword";
import Verification from "./components/signup/Verification";
import SearchMagnifyingGlass from "./assets/images/header-search.png";
import Loading from "./components/loading/Loading";
import "./App.css";
import LogoGIF from "./assets/images/future-wise.svg";
import WaveBar from "./components/WaveBar";
import OrbEffect from "./components/OrbEffect";
import PinkLines from "./assets/images/pink-lines.svg";
import ReactGA from "react-ga";

function App() {
  const [userName, setUserName] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const path = location.pathname;
  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [circlePosition, setCirclePosition] = useState(100);

  DataStore.start();

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
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

  const toggleOpenState = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleClick = () => {
    setCirclePosition(circlePosition === 0 ? 100 : 0);
  };

  return (
    <div className="App">
      {circlePosition !== 0 && <OrbEffect />}
      {/*   <div className="banner">
        {" "}
        Conference Join on 1/1 and win tickets to this blah blah blah / Trying
        to check if it's working to make it fit all
      </div> */}
      {/* <WaveBar /> */}
      <div className="header">
        <div className="header-left">
          {/*   <img className="menu-icon" src={MenuIcon} /> */}
          <div
            id="hamburger-icon"
            href="#"
            title="Menu"
            onClick={(e) => {
              e.preventDefault();
              setActive(!active);
              setShowInput(!showInput);
            }}
            className={active ? "active" : ""}
          >
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
          {/*  <div
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
              <img
                src={SearchMagnifyingGlass}
                className="header-magnifying-glass"
                alt="Logo image"
              />
            )}
          </div>{" "} */}
          {/*     <Link
            to="/"
            className={
              location.pathname === "/"
                ? "home-button active-link"
                : "home-button"
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              location.pathname === "/about"
                ? "home-button active-link"
                : "home-button"
            }
          >
            About
          </Link> */}
          {/*   {path === "/" ? (
            <Link to="/about" className="about-link" replace>
              About
            </Link>
          ) : (
            <Link to="/" replace>
              <div className="home-button">Home</div>
            </Link>
          )} */}
          {/*  <div className="toggle" onClick={handleToggleClick}>
           
            <div className="toggle-outline"> </div>
            <div
              className="toggle-circle"
              style={{ left: `${circlePosition}%` }}
            ></div>
          </div> */}
          <div>
            <input
              type="checkbox"
              className="toggle-checkbox"
              id="toggleBtn"
              onChange={handleToggleClick}
            />
            <label className="switch" htmlFor="toggleBtn">
              <FontAwesomeIcon icon={faMoon} style={{ color: "#f1c40f" }} />
              <FontAwesomeIcon icon={faSun} style={{ color: "#f39c12" }} />
              <div className="ball"></div>
            </label>
          </div>
        </div>

        <div className="header-logo">
          <a href="/">
            <img className="logo-gif" src={LogoGIF} />
          </a>
          <div className="beta">
            <TidioWrapper />
          </div>
        </div>
        <div className="header-right">
          <div className="header-icons">
            {loggedIn ? (
              <Dropdown url={signedProfileURL} username={userName} />
            ) : (
              <Link to="/sign-in" className="sign-in-link">
                <div className="home-button">Sign In </div>
                <FontAwesomeIcon
                  icon={faSortDown}
                  color="#007AFE"
                  style={{ marginTop: "1px", marginLeft: "4px" }}
                />
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
      </div>

      {/*  <header-wave class="header-wave">
        <div class="relative overflow-hidden w-100 h2 h3-ns">
          <svg
            class="wave w-100 color-transparent"
            width="100%"
            height="100%"
            viewBox="0 0 1200 64"
            preserveAspectRatio="none"
            fill="none"
            style={{ color: "transparent" }}
          >
            <path
              class="wave__path"
              fill="currentColor"
              stroke="#ccc"
              stroke-width="1px"
              stroke-linejoint="miter"
              d="M1201 0V17.6803L1183.0158 20.5915C1164.8578 23.5185 1127.9921 29.2066 1091.9842 27.2263C1055.9763 25.246 1019.2132 15.6296 983.1658 17.4197C946.1343 19.2098 910.0316 32.5741 873.9763 40.211C836.9368 47.8478 800.5104 49.7497 764.4551 44.1485C727.4156 38.5473 690.9417 25.5462 655.2339 25.6251C618.5419 25.7041 582.5656 39.1396 545.5893 43.8796C509.5972 48.6196 473.692 44.6298 436.692 43.6599C400.692 42.6899 364.9842 44.7661 328 40.9476C292 37.1292 256.0237 27.1725 218.9526 19.3621C182.8657 11.5515 145.9684 5.8148 109.9684 7.7546C73.9684 9.6944 37.1737 19.4316 19 24.2322L1 29.0186V0"
            ></path>
          </svg>
        </div>
      </header-wave> */}
      {showNotifications && (
        <Notifications
          userId={userId}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      )}
      {isLoading ? (
        <div className="loading-container">
          {/* You can add a loading spinner or animation here */}
          <Loading />
        </div>
      ) : (
        <div className={` ${showInput ? "app-content" : "app-content-2"}`}>
          <div
            className={`search-panel ${showInput ? "slide-out2" : "slide-in2"}`}
          >
            <Search />{" "}
          </div>
          {/* <img src={PinkLines} className="app-background" />{" "} */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/:name"
              element={
                loggedIn &&
                path !== "/sign-in" &&
                path !== "/forgot-password" &&
                path !== "/sign-up" &&
                path !== "/complete-profile" &&
                path !== "/about" &&
                path !== "/contact-us" &&
                path !== "/terms" &&
                path !== "/faqs" &&
                path !== "/claim-brand" &&
                path !== "/apply" ? (
                  <Dashboard SignedInUser={userData} />
                ) : (
                  <Dashboard SignedInUser={userData} />
                )
              }
            />
            <Route path="/brand-form" element={<AddBrand />} />
            <Route path="/sign-in" element={<CustomSignIn />} />
            <Route path="/sign-up" element={<CustomSignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:username/:code"
              element={<ResetPassword />}
            />
            <Route path="/verify/:username/:code" element={<Verification />} />
            <Route path="/claim-brand" element={<SignUpBrandForm />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
