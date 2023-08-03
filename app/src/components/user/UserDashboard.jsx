import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Suggestion, User, UserSuggestion } from "../../models";
import { Storage } from "aws-amplify";
import Info from "./info/Info";
import "../../styles/user/dashboard/profile.css";
import "../../styles/dashboard/dashboard.css";
import "../../styles/user/activity/activity.css";
import "../../styles/empty-content/empty-content.css";
import Stats from "./stats/Stats";
import SuggestionFromUser from "./SuggestionFromUser";
import UserImpact from "./impact/UserImpact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faLeaf,
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function UserDashboard({ user, email }) {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [suggestionId, setSuggestionId] = useState([]);
  const [profileURL, setProfileURL] = useState("");
  const [signedProfileURL, setSignedProfileURL] = useState("");
  const [thisID, setThisID] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userBio, setUserBio] = useState("");
  const [impact, setImpact] = useState(false);

  const [showActivity, setShowActivity] = useState(true);
  const { username } = user;
  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await DataStore.query(User, (p) => p.name.eq(name));

        setUserLocation(userData[0].location);
        setUserBio(userData[0].bio);
        const signedInUserData = await DataStore.query(User, (p) =>
          p.name.eq(username)
        );

        const userId = userData[0].id;

        setThisID(signedInUserData[0].id);

        const userFilePath = userData[0].filePath;
        const signedUserFilePath = signedInUserData[0].filePath;
        const signedFiledAccessURL = await Storage.get(signedUserFilePath);
        const fileAccessURL = await Storage.get(userFilePath);

        setProfileURL(fileAccessURL);

        setSignedProfileURL(signedFiledAccessURL);

        /*  const suggestionId = await DataStore.query(UserSuggestion, (c) =>
          c.user.id.eq(userData[0].id)
        ); */

        const suggestionId = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [
            c.user.id.eq(userData[0].id),
            c.suggestion.show.eq(true),
          ])
        );

        const allSuggestions = await DataStore.query(
          UserSuggestion,
          (c) => c.and((c) => [c.user.id.eq(userData[0].id)]),
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

  /*  async function accessSuggestionPromises(){
    for await(let promise of promises){
      console.log(promise)
    }
  } */

  let array = [];
  let array2 = [];
  let duplicateArray = [];

  userId.map((p) => duplicateArray.push(p.businessname));
  let uniqueArray = [...new Set(duplicateArray)];

  return (
    <div className="user-dashboard">
      {/* <Header url={signedProfileURL}/> */}
      <div className="info-brand">
        <Info
          url={profileURL}
          user={name}
          suggestioncount={userId.length}
          brandcount={uniqueArray.length}
          location={userLocation}
          bio={userBio}
        />

        <Stats brandArray={uniqueArray} user={user} />
      </div>

      {/*     <div class="tab-container">
        <div class="tabs">
          <input
            type="radio"
            id="radio-1"
            name="tabs"
            onClick={(e) => setImpact(false)}
          />
          <label class="tab" for="radio-1">
            Activity
          </label>
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            onClick={(e) => setImpact(true)}
          />
          <label class="tab" for="radio-2">
            Impact
          </label>

          <span class="glider"></span>
        </div>
      </div> */}

      {/* <div className="activity">
        {showActivity ? (
          <div className="activity-row">
            <div className="activity-item">
              {" "}
            <FontAwesomeIcon
                icon={faChartLine}
                size="sm"
                color="#5c5848"
              />{" "}
              Activity{" "}
            </div>
            <div className="activity-item-grey">
              {" "}
              <FontAwesomeIcon
                icon={faLeaf}
                size="sm"
                color="#ccc"
              />  
              Impact{" "}
            </div>
          </div>
        ) : (
          <div className="activity-row">
            <div className="activity-item-grey">
              {" "}
              <FontAwesomeIcon icon={faChartLine} size="sm" color="#ccc" />{" "}
              Activity{" "}
            </div>
            <div className="activity-item">
              {" "}
              <FontAwesomeIcon
                icon={faLeaf}
                size="sm"
                color="ab5c"
              /> Impact{" "}
            </div>
          </div>
        )}
      </div> */}

      <div>
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
          <div className="suggestion-box">
            {allSuggestions.length == 0 ? (
              <div className="placeholder">No suggestions at this time</div>
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

      {/* <SuggestionForm name={user} email={email} thisID={thisID}/> */}

      {/*   { userId.map(p => (
          <h2 key={p.id}>
             <p>{p.suggestion.businessname}</p> 
             <p>{p.suggestion.suggestion}</p> 
      
             <p>{}</p> 
    
    
          </h2>
          )
        )
    } */}

      {/* <div className="query"> RECENT ACTIVITY </div> */}
    </div>
  );
}

export default withAuthenticator(UserDashboard);
