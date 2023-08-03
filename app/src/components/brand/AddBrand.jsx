import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import "../../styles/brand/brand-form/brand-form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Storage } from "aws-amplify";

function AddBrand() {
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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
      <div className="brand-form">
        <div className="brand-form-description">
          <h2> Brand Submission Form</h2>
          <div className="p-font">
            {" "}
            Can't find a brand? Submit what you know below to start a profile.
          </div>
          <div className="p-font">
            {" "}
            Profile should be approved in 1-2 business days.
          </div>
        </div>
        <form className="brand-form-container" onChange={createSearch}>
          <input
            className="brand-form-input"
            type="text"
            value={brandName}
            placeholder="Type Brand Name Here"
            onChange={(e) => setBrandName(e.target.value)}
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

        <form className="brand-form-container">
          <input
            className="brand-form-input"
            type="text"
            value={brandIndustry}
            placeholder="Set Brand Industry"
            onChange={(e) => setBrandIndustry(e.target.value)}
          />
          <button className="xbutton" onClick={() => setBrandIndustry("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>

        {brandIndustry != "" ? (
          <div>
            <div className="p-font"> Possible Industries </div>
            {searchList.length != 0 ? (
              <div className="brand-search-list">
                {searchList.map((user) => (
                  <div className="" key={user.id}>
                    <button
                      className="brand-search-button"
                      onClick={() => {
                        setBrandIndustry(user.name);
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
        )}
        <form className="brand-form-container">
          <input
            className="brand-form-input"
            type="text"
            value={brandEmail}
            placeholder="Type Possible Email"
            onChange={(e) => setBrandEmail(e.target.value)}
          />
          <button className="xbutton" onClick={() => setBrandEmail("")}>
            <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
          </button>
        </form>

        <form className="brand-upload-container">
          <div className="p-font"> Upload a photo of the brand logo </div>
          <input
            className="brand-upload-input"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </form>

        <button className="brand-form-submit-button" onClick={brandChecker}>
          {" "}
          <div> Submit</div>
          <FontAwesomeIcon icon={faArrowRight} size="sm" color="#5c5848" />{" "}
        </button>
      </div>
    </div>
  );
}

export default AddBrand;
