import { React, useState, useEffect, useRef } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faMicrophone,
  faMicrophoneSlash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../../styles/header/header.css";
import "../../styles/header/search/search.css";
import "../../styles/home/home.css";
import { useNavigate } from "react-router-dom";
import Search from "../../components/header/Search";
import SearchMagnifyingGlass from "../../assets/images/search.svg";
import QRCode from "../../assets/images/DivotQR.png";
import QRScanner from "../../components/qrscanner/QRScanner";
import Footer2 from "../../components/footer/Footer2";
import TopBrands from "../../components/brand/TopBrands";
import LightningArrow from "../../assets/images/lightning-arrow.png";
import WelcomeBlob from "../../assets/images/header-blob-2.svg";
import NaturalBlob from "../../assets/images/naturalblob.png";
import WelcomeX from "../../assets/images/x-button-2.svg";
import PurpleLines from "../../assets/images/purple-lines.png";
import PinkLines from "../../assets/images/pink-lines.svg";
import Earth from "../../assets/images/earth.png";
import LogoGIF from "../../assets/images/future-wise.png";
import EnterBlob from "../../assets/images/enter-blob.svg";
import EyeWorldButton from "../../assets/images/Eye-world-button.png";
import GoEarth from "../../assets/images/GO.png";
import GoEarthYellow from "../../assets/images/GO-Brown.svg";

function Home() {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [qrScannerVisible, setQRScannerVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopupOut, setAnimatePopupOut] = useState(false);
  const [isGoHovered, setIsGoHovered] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [recording, setRecording] = useState(false);

  const handleQRCodeClick = () => {
    setQRScannerVisible(true);
  };

  const handleQRScannerClose = () => {
    setQRScannerVisible(false);
    setQrCodeData(null); // Reset scanned data
  };

  useEffect(() => {
    setShowPopup(true);
    // Set focus to the input field when the component mounts
    inputRef.current.focus();

    // Function to continuously toggle cursor visibility
    const toggleCursor = () => {
      setCursorVisible((prevCursorVisible) => !prevCursorVisible);
    };

    // Start the cursor blinking animation
    const intervalId = setInterval(toggleCursor, 700); // Adjust the blinking speed (milliseconds)

    // Stop the blinking when the input field is focused
    const handleFocus = () => {
      clearInterval(intervalId);
      setCursorVisible(true); // Show the cursor when focused
    };

    // Attach the focus event listener
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
    }

    return () => {
      // Remove the event listener and clear the interval when the component unmounts
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
      }
      clearInterval(intervalId);
    };
  }, []);

  const createSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // then you save the mode that links a post with an editor
    const searchList = await DataStore.query(User, (p) =>
      p.name.contains(search)
    );
    setSearchList(searchList);
  };

  const goLink = (user) => {
    navigate(`/${user}`);
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    // Function to open the Tidio chatbox
    const openTidioChatbox = () => {
      if (window.tidioChatApi) {
        window.tidioChatApi.open();
      }
    };

    // Check if we are on the home page ("/")
    if (window.location.pathname === "/") {
      // Open the chatbox when on the home page
      openTidioChatbox();
    }
  }, []);

  const handleGoMouseEnter = () => {
    setIsGoHovered(true);
  };

  const handleGoMouseLeave = () => {
    setIsGoHovered(false);
  };

  const handleMicrophoneClick = () => {
    if (!recording) {
      if (SpeechRecognition.browserSupportsSpeechRecognition()) {
        resetTranscript();
        SpeechRecognition.startListening();
        setRecording(true);
      } else {
        alert("Speech recognition is not supported in your browser.");
      }
    } else {
      SpeechRecognition.stopListening();
      setRecording(false);
    }
  };

  useEffect(() => {
    // Set the spoken text to the search state when it changes
    if (transcript !== "") {
      setSearch(transcript);
      createSearch();
      resetTranscript();
    }
  }, [transcript]);

  return (
    <div className="home">
      <div
        className={
          showPopup
            ? "popup"
            : animatePopupOut
            ? "popup popup-exit"
            : "popup-hidden"
        }
      >
        {/*         <img className="popup-image" src={WelcomeBlob} />
         */}{" "}
        {/* <img className="welcome-earth" src={Earth} /> */}
        <img className="natural-blob" src={NaturalBlob} />
        <img className="popup-background" src={PinkLines} />{" "}
        {/*           <FontAwesomeIcon icon={faX} className="welcome-x" />*/}{" "}
        <div
          onClick={() => {
            setAnimatePopupOut(true);
            setTimeout(() => setShowPopup(false), 300); // adjust 300 to your desired animation duration
          }}
        >
          <img className="welcome-x" src={WelcomeX} />
        </div>
        {/* <img className="logo-gif-popup" src={LogoGIF} /> */}
        <div className="welcome-title"> WELCOME </div>
        <div className="welcome-info">
          Help your favorite brands become more eco-friendly and track their
          progress.
        </div>
        <button
          onMouseEnter={handleGoMouseEnter}
          onMouseLeave={handleGoMouseLeave}
          onClick={() => {
            setAnimatePopupOut(true);
            setTimeout(() => setShowPopup(false), 300);

            // adjust 300 to your desired animation duration
          }}
        >
          {" "}
          <img
            className="go-blob"
            src={isGoHovered ? GoEarthYellow : GoEarth}
            alt="Go Earth"
          />
        </button>
      </div>

      <div className="about-blurb"></div>
      <div
        className="home-search-container"
        onMouseEnter={() => setShowInput(true)}
      >
        <div className="home-search-form">
          {/*  <img
            src={SearchMagnifyingGlass}
            className="magnifying-glass"
            alt="Logo image"
          />
 */}
          <div
            onChange={createSearch}
            className="home-search-input-container"
            onClick={() => inputRef.current.focus()} // Focus on the input when the container is clicked
          >
            <input
              className="home-search-input"
              type="text"
              placeholder=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
            />

            <span className="placeholder-animation">
              {search ? null : (
                <div style={{ display: "flex" }}>
                  <div className="placeholder-blink"></div>
                  <div className="placeholder-text">
                    Search brands, users, more...
                  </div>
                </div>
              )}
            </span>
          </div>
          {search !== "" && (
            <button className="xbutton" onClick={() => setSearch("")}>
              <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
            </button>
          )}

          <FontAwesomeIcon
            icon={recording ? faMicrophoneSlash : faMicrophone}
            className="microphone"
            onClick={handleMicrophoneClick}
          />

          {/*      {!qrScannerVisible && (
            <img
              src={QRCode}
              className="QR-code"
              alt="QR Code"
              onClick={handleQRCodeClick}
            />
          )} */}
        </div>
        {search != "" ? (
          <div className="searches">
            {searchList.length != 0 ? (
              <div>
                {searchList.map((user) => (
                  <div className="searchList" key={user.id}>
                    <button
                      className="search-button"
                      onClick={() => {
                        goLink(user.name);
                      }}
                    >
                      <div>{user.name}</div>
                    </button>
                  </div>
                ))}
                <div>
                  {" "}
                  <button
                    className="search-button"
                    onClick={() => {
                      navigate(`/brand-form`);
                    }}
                  >
                    <div className="brand-form-button">Can't Find Brand?</div>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <button
                  className="search-button"
                  onClick={() => {
                    navigate(`/brand-form`);
                  }}
                >
                  <div className="brand-form-button">Can't Find Brand?</div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {" "}
            <button
              className="search-button"
              onClick={() => {
                navigate(`/brand-form`);
              }}
            >
              <div className="brand-form-button">Can't Find Brand?</div>
            </button>
          </div>
        )}
      </div>
      <TopBrands />

      {qrScannerVisible && (
        <QRScanner
          onClose={() => {
            setQRScannerVisible(false);
            setQrCodeData(null);
          }}
          onScan={setQrCodeData}
        />
      )}
      <div className="qr-result">
        {/* ... Display scanned QR code data ... */}
      </div>

      <Footer2 />
    </div>
  );
}

export default Home;
