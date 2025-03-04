import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { User, UserSuggestion } from "../../models";
import { Storage } from "aws-amplify";
import Info from "./info/Info";
import SignedInUserInfo from "../signedInUser/info/SignedInUserInfo";
import "../../styles/user/dashboard/user-dashboard.css";
import "../../styles/dashboard/dashboard.css";
import "../../styles/user/activity/activity.css";
import Soil from "../user/stats/Soil";
import SignedInUserSoil from "../signedInUser/soil/SignedInUserSoil";
import SuggestionFromUser from "./SuggestionFromUser";
import UserImpact from "./impact/UserImpact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function UserDashboard({ SignedInUser }) {
  const { name } = useParams();
  const [userId, setUserId] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [profileURL, setProfileURL] = useState("");
  const [thisID, setThisID] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const [userBio, setUserBio] = useState("");
  const [impact, setImpact] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [urlUser, setURLUser] = useState([]);
  const [username, setUsername] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("most recent"); // Default to suggestions
  const [searchTerm, setSearchTerm] = useState(""); //
  const [signedInUserProfile, setSignedInUserProfile] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        SignedInUser.name === name
          ? setSignedInUserProfile(true)
          : setSignedInUserProfile(false);

        const URLUserData = await DataStore.query(User, (p) => p.name.eq(name));
        setURLUser(URLUserData[0]);

        const user = URLUserData[0];
        const userCreatedAt = user.createdAt;
        setUserCreatedAt(userCreatedAt);

        const userId = URLUserData[0].id;
        setThisID(userId);
        const userFilePath = URLUserData[0].filePath;
        setUsername(URLUserData[0].name);
        const fileAccessURL = await Storage.get(userFilePath);
        setProfileURL(fileAccessURL);
        const suggestionId = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [
            c.user.id.eq(URLUserData[0].id),
            c.suggestion.feature.eq(true),
          ])
        );

        const allSuggestions = await DataStore.query(
          UserSuggestion,
          (c) => c.and((c) => [c.user.id.eq(URLUserData[0].id)]),
          {
            sort: (s) => s.updatedAt(SortDirection.DESCENDING),
          }
        );

        let promisearray = [];
        let promiseArrayAll = [];

        suggestionId.map((p) => promisearray.push(p.suggestion));
        allSuggestions.map((p) => promiseArrayAll.push(p.suggestion));

        await Promise.all(promisearray).then((values) => {
          setUserId(values);
        });

        await Promise.all(promiseArrayAll).then((values) => {
          setAllSuggestions(values);
        });
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  let array = [];
  let array2 = [];

  const getSuggestionCount = () =>
    allSuggestions.filter((p) => !p.compliment).length;

  const getComplimentCount = () =>
    allSuggestions.filter((p) => p.compliment).length;

  let duplicateArray = [];

  userId.map((p) => duplicateArray.push(p.businessName));
  let uniqueArray = [...new Set(duplicateArray)];

  return (
    <div className="user-dashboard">
      <div className="user-dashboard-top">
        {signedInUserProfile ? (
          <>
            <SignedInUserInfo
              url={profileURL}
              user={name}
              suggestionCount={getSuggestionCount()}
              complimentCount={getComplimentCount()}
              brandcount={uniqueArray.length}
              createdAt={userCreatedAt}
              location={userLocation}
              bio={userBio}
            />
            <SignedInUserSoil brandArray={uniqueArray} />
          </>
        ) : (
          <>
            {" "}
            <Info
              url={profileURL}
              user={name}
              suggestionCount={getSuggestionCount()}
              complimentCount={getComplimentCount()}
              brandcount={uniqueArray.length}
              createdAt={userCreatedAt}
              location={userLocation}
              bio={userBio}
              signedInUser={SignedInUser}
            />
            <Soil brandArray={uniqueArray} />
          </>
        )}
      </div>
      <div className="user-dashboard-bottom">
        <div className="sort-row">
          {/* <div className="search-user-suggestions"> Search </div> */}
          <select className="chart-select" onChange={(e) => setImpact(!impact)}>
            {" "}
            <option>ACTIVITY </option>
            <option>IMPACT </option>
          </select>
          <div className="user-suggestion-sort">
            <div className="user-sort-select-container">
              <div>sort by</div>
              <select
                className="sort-select"
                onChange={(e) => setSelectedOption(e.target.value)}
                value={selectedOption}
              >
                <option value="most recent">most recent</option>
                <option value="suggestions">suggestions</option>
                <option value="compliments">compliments</option>
              </select>
            </div>

            <div
              className={
                showSearchInput
                  ? "trending-search-container"
                  : "trending-search-container false"
              }
            >
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                color="#b7b1a7"
                style={{}}
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
              {showSearchInput && (
                <div>
                  <input
                    type="text"
                    className="trending-search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle} // You can replace this with the desired close icon
                    size="sm"
                    color="#b7b1a7" // Adjust the color as needed
                    onClick={() => setShowSearchInput(false)} // Click event to close the search
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {impact ? (
          <div>
            {" "}
            <UserImpact
              user={name}
              suggestioncount={getSuggestionCount()}
              complimentCount={getComplimentCount()}
              brandcount={uniqueArray.length}
            />
          </div>
        ) : (
          <div
            className={`suggestion-box ${
              allSuggestions.length === 0 ? "no-suggestions-container" : ""
            }`}
          >
            {allSuggestions.length == 0 ? (
              <div className="no-suggestions-container">
                <div className="no-suggestions">No Activity Yet</div>
                <div className="no-suggestions-small">
                  This user's snoozing on the possibilities 💤
                </div>
              </div>
            ) : (
              <div>
                {/* Display suggestions and compliments based on selected option */}
                {selectedOption === "most recent" &&
                  allSuggestions
                    .filter((p) =>
                      p.suggestion
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((p, index) => (
                      <div key={p.id}>
                        {/* Render the suggestions using SuggestionFromUser component */}
                        <SuggestionFromUser
                          suggestion={p.suggestion}
                          businessName={p.businessName}
                          date={p.updatedAt}
                          compliment={p.compliment}
                          index={index}
                          thisID={SignedInUser.id}
                        />
                      </div>
                    ))}

                {selectedOption === "suggestions" &&
                  allSuggestions
                    .filter((p) => !p.compliment)
                    .filter((p) =>
                      p.suggestion
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) // Filter out compliments
                    .map((p, index) => (
                      <div key={p.id}>
                        {/* Render the suggestions using SuggestionFromUser component */}
                        <SuggestionFromUser
                          suggestion={p.suggestion}
                          businessname={p.businessName}
                          date={p.updatedAt}
                          compliment={p.compliment}
                          index={index}
                        />
                      </div>
                    ))}

                {selectedOption === "compliments" &&
                  allSuggestions
                    .filter((p) => p.compliment) // Filter only compliments
                    .filter((p) =>
                      p.suggestion
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((p, index) => (
                      <div key={p.id}>
                        {/* Render the compliments using SuggestionFromUser component */}
                        <SuggestionFromUser
                          suggestion={p.suggestion}
                          businessname={p.businessName}
                          date={p.updatedAt}
                          compliment={p.compliment}
                          index={index}
                        />
                      </div>
                    ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
