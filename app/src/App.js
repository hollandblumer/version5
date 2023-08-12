import "./App.css";
import { useState, useEffect, useRef, React } from "react";
import {
  withAuthenticator,
  

} from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { User, Suggestion } from "./models";
import { Auth } from "@aws-amplify/auth";
import { SignInHeader } from "./components/signin/SignInHeader";
import { SignInFooter } from "./components/signin/SignInFooter";
import { ResetPasswordHeader } from "./components/signin/ResetPasswordHeader";
import { SignUpHeader } from "./components/signup/SignUpHeader";
import { SignUpFooter} from "./components/signup/SignUpFooter";
import { SignUpEmailForm } from "./components/signup/SignUpEmailForm";
import Header from "./components/signin/Header";
import Home from "./pages/home/Home";
import Footer2 from "./components/footer/Footer2";
import Header2 from "./components/header/Header2";
import { Amplify, Storage } from "aws-amplify";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
import SignInComponent from "./components/signin/SignInComponent"
import { Helmet } from 'react-helmet';
import TidioWrapper from './TidioWrapper'; 
import CompleteProfile from "./components/signin/CompleteProfile";



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

  const [labelHidden, setLabelHidden] = useState(false);


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

        getUsername();
        getEmail();
        const info = await Auth.currentSession();
        const uname = info.idToken.payload["cognito:username"];
      

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

  const checkAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };


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

             
             {loggedIn? ( <Dropdown url={signedProfileURL} user={user} /> ):(<Link to="/sign-in">Sign In</Link> )}
              {loggedIn? (<FontAwesomeIcon className= "bell-icon" icon={faBell} color="#b7b1a7" size="lg" />):(<div></div>)}

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



export default App;



/* export default withAuthenticator(App, {
  components: {
    Header,
  
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
    SignUp: {
      Header: SignUpHeader,
      Footer: SignUpFooter,
    },
    ResetPassword: {
      Header: ResetPasswordHeader,
    },
  },

  hideSignUp: false,

  formFields: {

    forceNewPassword: {
     password: {
        labelHidden: true,
        placeholder: "Enter New Password",
        isRequired: true,
        order: 1
      },

      confirm_password: {
        labelHidden: true,
        placeholder: "Confirm Password",
        isRequired: true,
        order: 2
      },

      given_name: {
        labelHidden: true,
        placeholder: "First Name",
        isRequired: true,
        order: 3
      },

      family_name: {
        labelHidden: true,
        placeholder: "Last Name",
        isRequired: true,
        order: 4
      },
  


    },

    resetPassword: {
      username: {
        labelHidden: true,
        placeholder: "Enter your email",
        isRequired: true,
       
     
     
      }
  
     
    },
  
    signUp: {
        email: {
        labelHidden: true,
        placeholder: "Email",
        isRequired: true,
        label: "First Name",
      },
      password :{
        labelHidden: true,
        placeholder: "Password",
        isRequired: true,
        label: "First Name",
      },
        confirm_password :{
        labelHidden: true,
        placeholder: "Confirm Password",
        isRequired: true,
        label: "First Name",
      },
      given_name: {
        labelHidden: true,
        placeholder: "First Name",
        isRequired: true,
        label: "First Name",
        order: 1,
      },
     family_name: {
        labelHidden: true,
        placeholder: "Last Name",
        isRequired: true,
        label: "Last Name:",
        order: 2,
      },

    },

    signIn: {
      username: {
        labelHidden: true,
        placeholder: "Email",
        isRequired: true,
       
      },
      password: {
        labelHidden: true,
        placeholder: "Password",
        isRequired: true,
       
      },
    },

   
  },


 
});
 */