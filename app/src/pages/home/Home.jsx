import { React, useState, useEffect, useRef } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
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

function Home() {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [qrScannerVisible, setQRScannerVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleQRCodeClick = () => {
    setQRScannerVisible(true);
  };

  const handleQRScannerClose = () => {
    setQRScannerVisible(false);
    setQrCodeData(null); // Reset scanned data
  };

  useEffect(() => {
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
    e.preventDefault();
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

  return (
    <div className="home">
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
          <div onChange={createSearch} className="home-search-input-container">
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
                <div className="placeholder-text">
                  Search businesses, users, more...
                </div>
              )}
            </span>
          </div>
          {search !== "" && (
            <button className="xbutton" onClick={() => setSearch("")}>
              <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
            </button>
          )}

          <FontAwesomeIcon icon={faMicrophone} className="microphone" />

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
