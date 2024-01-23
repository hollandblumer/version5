import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import "../../styles/brand/brand-form/brand-form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Storage } from "aws-amplify";
import Footer2 from "../footer/Footer2";
import { Link } from "react-router-dom";

function AddBrand() {
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandLocation, setBrandLocation] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandWebsite, setBrandWebsite] = useState("");
  const [brandWebsiteFocused, setBrandWebsiteFocused] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [brandNameFocused, setNameFocused] = useState(false);
  const [brandLocationFocused, setBrandLocationFocused] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputFocus = (input) => {
    if (input === "brandName") {
      setNameFocused(true);
    } else if (input === "brandLocation") {
      setBrandLocationFocused(true);
    } else if (input === "brandWebsite") {
      setBrandWebsiteFocused(true);
    }
  };

  const handleInputBlur = (input) => {
    if (input === "brandName") {
      setNameFocused(brandName !== "");
    } else if (input === "brandLocation") {
      setBrandLocationFocused(brandLocation !== "");
    } else if (input === "brandWebsite") {
      setBrandWebsiteFocused(brandWebsite !== "");
    }
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const createSearch = async (e) => {
    e.preventDefault();
    // then you save the mode that links a post with an editor
    const searchList = await DataStore.query(User, (p) =>
      p.name.contains(brandName)
    );
    setSearchList(searchList);
  };

  const createBrand = async (e) => {
    const newSuggestion = await DataStore.save(
      new User({
        name: brandName.toLowerCase(),
        email: brandEmail.toLowerCase(),
        isVerified: false,
        isBusiness: true,
        filePath: `${brandName}.jpg`,
        industry: brandIndustry,
      })
    );

    console.log("selected", selectedFile);

    if (selectedFile !== null) {
      Storage.put(`${brandName}.jpg`, selectedFile)
        .then((item) => {
          console.log("hello");
          setBrandName("");
          setBrandEmail("");
          setBrandIndustry("");
          setSelectedFile(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setBrandName("");
      setBrandEmail("");
      setBrandIndustry("");

      console.log("got here");
    }
  };

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleBrandIndustryChange = (event) => {
    setBrandIndustry(event.target.value);
  };

  const handleBrandLocationChange = (event) => {
    setBrandLocation(event.target.value);
  };

  const handleBrandEmailChange = (event) => {
    setBrandEmail(event.target.value);
  };

  const handleBrandWebsiteChange = (event) => {
    setBrandWebsite(event.target.value);
  };

  const brandChecker = async (e) => {
    e.preventDefault();
    if (brandName === "") {
      console.log("require brand name");
    }
    // then you save the mode that links a post with an editor
    const searchBrandList = await DataStore.query(User, (p) =>
      p.name.contains(brandName)
    );

    if (searchBrandList.length < 1) {
      createBrand();
      // console.log("brand created");
    } else {
      // console.log("brand name already exists");
      setBrandName("");
      setBrandEmail("");
      setBrandIndustry("");
    }
  };

  return (
    <div className="brand-form-background">
      {submitted && (
        <div>
          <p>
            Enter your name and email so we can notify you when the brand is
            approved:
          </p>
          <label htmlFor="userName" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="custom-form-input"
            value={userName}
            onChange={handleUserNameChange}
          />

          <label htmlFor="userEmail" className="form-label">
            Your Email
          </label>
          <input
            type="text"
            className="custom-form-input"
            value={userEmail}
            onChange={handleUserEmailChange}
          />
        </div>
      )}
      <div className="brand-form">
        <div className="brand-form-description">
          <div className="add-brand-title"> Can't find a brand? </div>
          <div className="p-font">
            {" "}
            Submit the brand you are searching for, and we will promptly add it
            to our selection (please allow up to 24 hours for the approval
            process).
          </div>
        </div>{" "}
        <Link to="/contact-us" className="contact-us-button">
          Contact Us
        </Link>
        <form className="form-group" onChange={createSearch}>
          <label
            className={`form-label ${brandNameFocused ? "focused-label" : ""}`}
            htmlFor="name"
          >
            Type Brand Name Here
          </label>
          <input
            className="custom-form-input"
            type="text"
            value={brandName}
            onChange={handleBrandNameChange}
            onFocus={() => handleInputFocus("brandName")}
            onBlur={() => handleInputBlur("brandName")}
          />
          <button className="xbutton" onClick={() => setBrandName("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>
        {brandName != "" ? (
          <div>
            <div className="p-font"> List of brands that exists:</div>
            {searchList.length != 0 ? (
              <div className="brand-search-list">
                {searchList.map((user) => (
                  <div className="" key={user.id}>
                    <button
                      className="brand-search-button"
                      onClick={() => {
                        setBrandName(user.name);
                      }}
                    >
                      <div>{user.name}</div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <form className="form-group-delay">
          <label
            className={`form-label ${
              brandLocationFocused ? "focused-label" : ""
            }`}
            htmlFor="name"
          >
            Location
          </label>
          <input
            className="custom-form-input"
            type="text"
            value={brandName}
            onChange={handleBrandLocationChange}
            onFocus={() => handleInputFocus("brandLocation")}
            onBlur={() => handleInputBlur("brandLocation")}
          />
          <button className="xbutton" onClick={() => setBrandLocation("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>
        {/*  <form className="form-group-delay">
          <label
            className={`form-label ${
              brandIndustryFocused ? "focused-label" : ""
            }`}
            htmlFor="name"
          >
            Industry
          </label>
          <input
            className="custom-form-input"
            type="text"
            value={brandName}
            onChange={handleBrandIndustryChange}
            onFocus={() => handleInputFocus("brandIndustry")}
            onBlur={() => handleInputBlur("brandIndustry")}
          />
          <button className="xbutton" onClick={() => setBrandIndustry("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>
        {brandIndustry !== "" ? (
          <div>
            <div className="p-font"> Possible Industries </div>
            {searchList.length !== 0 ? (
              <div className="brand-search-list">
                {searchList.map((user) => (
                  <div className="" key={user.id}>
                    <button
                      className="brand-search-button"
                      onClick={() => {
                        setBrandIndustry(user.industry);
                        setSearchList([]); // Clear the search list
                      }}
                    >
                      <div>{user.industry}</div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )} */}
        <form className="form-group-delay">
          <label
            className={`form-label ${
              brandWebsiteFocused ? "focused-label" : ""
            }`}
            htmlFor="name"
          >
            Website
          </label>
          <input
            className="custom-form-input"
            type="text"
            value={brandWebsite}
            onChange={handleBrandWebsiteChange}
            onFocus={() => handleInputFocus("brandWebsite")}
            onBlur={() => handleInputBlur("brandWebsite")}
          />
          <button className="xbutton" onClick={() => setBrandWebsite("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>
        <button className="brand-form-submit-button" onClick={brandChecker}>
          {" "}
          <i>SUBMIT</i>
        </button>
      </div>
      <Footer2 />
    </div>
  );
}

export default AddBrand;
