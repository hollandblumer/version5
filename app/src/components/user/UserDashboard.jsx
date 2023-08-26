import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { User, UserSuggestion } from "../../models";
import { Storage } from "aws-amplify";
import Info from "./info/Info";
import "../../styles/user/dashboard/user-dashboard.css";
import "../../styles/dashboard/dashboard.css";
import "../../styles/user/activity/activity.css";
import Soil from "../user/stats/Soil";
import SuggestionFromUser from "./SuggestionFromUser";
import UserImpact from "./impact/UserImpact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function UserDashboard({ SignedInUser }) {
  const { name } = useParams();
  const [userId, setUserId] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [profileURL, setProfileURL] = useState("");
  const [thisID, setThisID] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userBio, setUserBio] = useState("");
  const [impact, setImpact] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [urlUser, setURLUser] = useState([]);
  const [username, setUsername] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const URLUserData = await DataStore.query(User, (p) => p.name.eq(name));
        setURLUser(URLUserData[0]);
        const userId = URLUserData[0].id;
        setThisID(userId);
        const userFilePath = URLUserData[0].filePath;
        setUsername(URLUserData[0].name);
        const fileAccessURL = await Storage.get(userFilePath);
        setProfileURL(fileAccessURL);
        const suggestionId = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [
            c.user.id.eq(URLUserData[0].id),
            c.suggestion.show.eq(true),
          ])
        );
        const allSuggestions = await DataStore.query(
          UserSuggestion,
          (c) => c.and((c) => [c.user.id.eq(URLUserData[0].id)]),
          {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
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
  let duplicateArray = [];

  userId.map((p) => duplicateArray.push(p.businessname));
  let uniqueArray = [...new Set(duplicateArray)];

  return (
    <div className="user-dashboard">
      <div className="user-dashboard-top">
        <Info
          url={profileURL}
          user={name}
          suggestioncount={userId.length}
          brandcount={uniqueArray.length}
          location={userLocation}
          bio={userBio}
        />

        <Soil brandArray={uniqueArray} />
      </div>
      <div className="user-dashboard-bottom">
        <div className="sort-row">
          {/* <div className="search-user-suggestions"> Search </div> */}
          <select className="chart-select" onChange={(e) => setImpact(!impact)}>
            {" "}
            <option>
              Activity{" "}
              <FontAwesomeIcon icon={faCaretDown} size="sm" color="#5c5848" />{" "}
            </option>
            <option>
              Impact{" "}
              <FontAwesomeIcon icon={faCaretDown} size="sm" color="#5c5848" />{" "}
            </option>
          </select>
          <div className="user-suggestion-sort">
            <div className="user-sort-select-container">
              <div>sort by</div>
              <select className="sort-select">
                {" "}
                <option>most recent </option>
                <option>suggestions </option>
                <option>compliments </option>
              </select>
            </div>

            <div className="user-sort-select-container">
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2023-03-08"
                min="2018-01-01"
                max="2018-12-31"
              ></input>{" "}
            </div>
          </div>
        </div>
        {impact ? (
          <div>
            {" "}
            <UserImpact
              user={name}
              suggestioncount={userId.length}
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
              <div></div>
            )}

            {allSuggestions.map((p, index) => (
              <div key={p.id}>
                {array.includes(p.suggestion) &&
                array2.includes(p.businessname) ? (
                  <div></div>
                ) : (
                  <div
                    className={` ${
                      index % 2 === 0 && index === 0
                        ? "suggestion-active corner"
                        : index % 2 == 0
                        ? " suggestion-active"
                        : "suggestion-inactive"
                    }`}
                  >
                    <SuggestionFromUser
                      suggestion={p.suggestion}
                      businessname={p.businessname}
                      date={p.updatedAt}
                      compliment={p.compliment}
                      index={index}
                    />

                    {array.push(p.suggestion).hide}
                    {array2.push(p.businessname).hide}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
