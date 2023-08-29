import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Suggestion, User, UserSuggestion, Verification } from "../../models";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import SuggestionSupporter from "../follower/SuggestionSupporter";
import {
  faEllipsis,
  faPlusCircle,
  faShareNodes,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MilestoneUpdate from "./MilestoneUpdate";
import { Link } from "react-router-dom";

import "../../styles/suggestion/suggestion-user/suggestions.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";

function SuggestionFromUser({
  suggestion,
  businessname,
  date,
  compliment,
  index,
}) {
  const { name } = useParams();

  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [businessAvatarURL, setBusinessAvatarURL] = useState("");
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const suggestionUsers = await DataStore.query(UserSuggestion, (c) =>
          c.and((c) => [
            c.suggestion.suggestion.eq(suggestion),
            c.suggestion.businessName.eq(businessname),
          ])
        );

        const milestoneVerification = await DataStore.query(Verification, (c) =>
          c.and((c) => [
            c.suggestion.eq(suggestion),
            c.brandName.eq(businessname),
          ])
        );

        if (milestoneVerification[0] != null) {
          setVerification(milestoneVerification[0].isVerified);
        }

        let suggestionPromiseArray = [];
        let userPromiseArray = [];
        suggestionUsers.map((p) => suggestionPromiseArray.push(p.suggestion));
        suggestionUsers.map((p) => userPromiseArray.push(p.user));

        await Promise.all(suggestionPromiseArray).then((values) => {
          setSuggestions(values);
        });
        await Promise.all(userPromiseArray).then((values) => {
          setUsers(values);
        });

        // Add more urls if necessary
        const signedFiledAccessURL = await Storage.get(`${businessname}.jpg`);
        console.log("url", signedFiledAccessURL);
        setBusinessAvatarURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // console.log(suggestions[0])
  let avatararray = [];
  let formatdate = new Date(date);
  let array = [];

  return (
    <div className="suggestion-container">
      <div className="subtle-suggestion-info">
        {" "}
        <div>
          {compliment ? (
            <div className="text">compliment </div>
          ) : (
            <div className="text"> suggestion </div>
          )}{" "}
        </div>
        <div> {formatdate.toLocaleDateString("en-US")} </div>
      </div>
      <div className="suggestion-content">
        <div className="suggestion-content-container">
          {/*  <div className="suggestion-text">
            {compliment ? <div>Thanks </div> : <div>Supports</div>}
          </div> */}
          <div className="suggestion-core">
            <div className="suggestion-avatar">
              {" "}
              <Link to={`/${businessname}`}>
                <Avatar
                  src={businessAvatarURL}
                  alt={businessname}
                  sx={{ height: "50px", width: "50px" }}
                  style={{
                    border: "1px solid #dbdbdb",
                  }}
                />
              </Link>
              <Icon icon="placeholderIcon" />
            </div>
            <div className="suggestion-core-content">
              <div className="brand-username"> @{businessname} </div>
            </div>
          </div>
          {/*  {compliment ? (
            <div className="text">for </div>
          ) : (
            <div className="text"> with </div>
          )} */}
          <div className="suggestion">
            {" "}
            {/*  {suggestions.map((p) => (
              <div key={p.id}>
                {array.includes(p.suggestion) ? (
                  <div></div>
                ) : (
                  <div
                    className={` ${
                      p.icon != null && index != 0
                        ? "icon"
                        : p.icon != null && index === 0
                        ? "white-icon"
                        : "no-icon"
                    }`}
                  >
                    <Icon icon={p.icon} />

                    {array.push(p.suggestion).hide}
                  </div>
                )}
              </div>
            ))}{" "} */}
            <p className="actual-suggestion">{suggestion}</p>{" "}
          </div>
          {/*  */}
          {/*    <div className="text">
          {" "}
          on {formatdate.toLocaleDateString("en-US")}{" "}
        </div>
 */}{" "}
        </div>
        <div
          className={` ${index === 0 ? "progress progress-white" : "progress"}`}
        >
          {verification ? (
            <div className="text">Completed </div>
          ) : compliment ? (
            <div className="text">1 Award</div>
          ) : (
            <div>
              {" "}
              <MilestoneUpdate
                suggestion={suggestion}
                businessname={businessname}
              />
            </div>
          )}

          {/*   <div className="single-chart">
          <svg viewBox="0 0 9 9" className="circular-chart orange">
            <path
              className="circle-bg"
              d="M4.5 0.521125
            a 3.978875 3.978875 0 0 1 0 7.95775
            a 3.978875 3.978875 0 0 1 0 -7.95775"
            />
            <path
              className="circle"
              strokeDasharray="7.5, 25"
              d="M4.5 0.521125
      a 3.978875 3.978875 0 0 1 0 7.95775
      a 3.978875 3.978875 0 0 1 0 -7.95775"
            />

            <text x="4.7" y="5" className="percentage">
              60%
            </text>
          </svg>

        </div> */}

          <div className="update">
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="share"
              color="#a7a7a7"
              size="sm"
            />
          </div>
        </div>

        <div className="supporter-container">
          {users.map((p, index) => (
            <div key={index}>
              {avatararray.length < 3 ? (
                <div>
                  <SuggestionSupporter username={p.name} />
                  {avatararray.push(p.name).hide}
                </div>
              ) : (
                <div>
                  {avatararray.push(p.name).hide}
                  {/* <p className="text"> {p.name}</p> */}
                </div>
              )}
            </div>
          ))}
          <div className="avatar-length">
            {" "}
            <div className="follower-count"> +{avatararray.length} </div>{" "}
          </div>
        </div>
        <div className="like-share">
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="share"
            color="#5b584a"
            size="xl"
          />
          <FontAwesomeIcon
            icon={faShareNodes}
            className="share"
            color="#5b584a"
            size="xl"
          />
          <FontAwesomeIcon
            icon={faEllipsis}
            className="share"
            color="#5b584a"
            size="xl"
          />
        </div>
      </div>
    </div>
  );
}

export default SuggestionFromUser;
