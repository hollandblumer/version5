import { React, useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/header/header.css";
import "../../styles/header/search/search.css";
import "../../styles/home/home.css";
import { useNavigate } from "react-router-dom";
import Search from "../../components/header/Search";
import MagnifyingGlass from "../../assets/images/Magnifyingglass2.png";
import QRCode from "../../assets/images/QRcode.png";
import QRScanner from "../../components/qrscanner/QRScanner";
import Footer2 from "../../components/footer/Footer2";
import TopBrands from "../../components/brand/TopBrands";

function Home() {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [qrScannerVisible, setQRScannerVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleQRCodeClick = () => {
    setQRScannerVisible(true);
  };

  const handleQRScannerClose = () => {
    setQRScannerVisible(false);
    setQrCodeData(null); // Reset scanned data
  };
  const navigate = useNavigate();

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

  const [animatePlaceholder, setAnimatePlaceholder] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePlaceholder((prevValue) => !prevValue);
    }, 3000); // Change every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="home">
      <div
        className="home-search-container"
        onMouseEnter={() => setShowInput(true)}
      >
        <div className="home-search-form">
          <img
            src={MagnifyingGlass}
            className="magnifying-glass"
            alt="Logo image"
          />

          <div onChange={createSearch} className="home-search-input-container">
            <input
              className="home-search-input"
              type="text"
              placeholder=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="placeholder-animation">
              {search ? null : (
                <div className="search-animation">
                  <div className="placeholder-text">
                    Search for a business or brand{" "}
                  </div>
                </div>
              )}
            </span>
          </div>

          <button className="xbutton" onClick={() => setSearch("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
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
      {!qrScannerVisible && (
        <img
          src={QRCode}
          className="QR-code"
          alt="QR Code"
          onClick={handleQRCodeClick}
        />
      )}
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
      <TopBrands />
      <Footer2 />
    </div>
  );
}

export default Home;
