import "./App.css";
import { useState, useEffect, React } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User} from "./models";
import { Auth } from "@aws-amplify/auth";
import Home from "./pages/home/Home";
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
import SignInComponent from "./components/signin/SignInComponent"
import TidioWrapper from './TidioWrapper'; 
import CompleteProfile from "./components/signin/CompleteProfile";


function App() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userIDString, setUserIDString] = useState("");
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  DataStore.start();

  useEffect(() => {
    checkAuthStatus();
    const getData = async () => {
      try {
        const info = await Auth.currentSession();
        const email = info.idToken.payload["email"];
        const signedInUserData = await DataStore.query(User, (post) =>
          post.email.eq(email)
        );
        setUserIDString(signedInUserData[0].id);
        {signedInUserData[0].name !=''? (setUsername(signedInUserData[0].name)):(<div></div>)}
        const signedUserFilePath = signedInUserData[0].filePath;
        const signedFiledAccessURL = await Storage.get(signedUserFilePath);
        setSignedProfileURL(signedFiledAccessURL);
        console.log(signedProfileURL);

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
      <div className="header-shadow">
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
              <div className="home-link">
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
               <TidioWrapper/>
              </div>
            </div>
            <div className="header-icons">
              {loggedIn? (<Dropdown url={signedProfileURL} username={username} /> ):(<Link to="/sign-in">Sign In</Link> )}
              {loggedIn? (<FontAwesomeIcon className= "bell-icon" icon={faBell} color="#b7b1a7" size="lg" />):(<div></div>)}
            </div>
          </div>
        </div>
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
          <Route path="/" element={<Home />} />
          <Route
            path="/:name"
            element={
              loggedIn && path !== '/sign-in' && path !=='/complete-profile' && path !== '/brand-form' ?  (
                <Dashboard user={user} email={email} id={userIDString} />
              ) :  <Dashboard user={user} email={email} id={userIDString} />
            }          />
          <Route path="/brand-form" element={<AddBrand />} />
          <Route path="/sign-in" element={< SignInComponent/>} />
          <Route path="/complete-profile" element={<CompleteProfile/>} />
          {/* {isBusiness? (<Route path ='/:name' element={ <BrandDashboard user={user} email={email}/>  }/>):(<Route path ='/:name' element={ <UserDashboard user={user} email={email}/>}/>)} */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

