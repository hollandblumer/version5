import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { UserSuggestion, Verification, Suggestion } from "../../models";
import Avatar from "@mui/material/Avatar";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import SuggestionSupporter from "../follower/SuggestionSupporter";
import {
  faEllipsis,
  faThumbsUp,
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
  businessName,
  date,
  compliment,
  index,
  thisID,
}) {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [businessAvatarURL, setBusinessAvatarURL] = useState("");
  const [verification, setVerification] = useState(false);
  const [hasClickedThumbsUp, setHasClickedThumbsUp] = useState(false);
  const [userHasMadeSuggestion, setUserHasMadeSuggestion] = useState(false);
  const [thumbsUpState, setThumbsUpState] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const existingUserSuggestion = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.user.id.eq(thisID),
              c.suggestion.suggestion.eq(suggestion),
              c.suggestion.businessName.eq(businessName),
            ])
        );

        if (existingUserSuggestion.length > 0) {
          setUserHasMadeSuggestion(true);
        }

        const suggestionUsers = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.suggestion.suggestion.eq(suggestion),
              c.suggestion.businessName.eq(businessName),
            ]),
          {
            sort: (s) => s.createdAt(SortDirection.ASCENDING),
          }
        );

        const milestoneVerification = await DataStore.query(Verification, (c) =>
          c.and((c) => [
            c.suggestion.eq(suggestion),
            c.brandName.eq(businessName),
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
        const signedFiledAccessURL = await Storage.get(`${businessName}.jpg`);
        setBusinessAvatarURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [name, thumbsUpState]);

  const handleThumbsUpClick = async () => {
    try {
      if (userHasMadeSuggestion) {
        // User has already made this suggestion, so remove only the user's like
        const existingUserSuggestion = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.user.id.eq(thisID),
              c.suggestion.suggestion.eq(suggestion),
              c.suggestion.businessName.eq(businessName),
            ])
        );

        if (existingUserSuggestion.length > 0) {
          const suggestionToDelete = existingUserSuggestion[0];
          await DataStore.delete(suggestionToDelete);

          // Update the state to reflect the removal
          setHasClickedThumbsUp(false);
          // Set userHasMadeSuggestion to false immediately after removing
          setUserHasMadeSuggestion(false);
          setThumbsUpState(false);
        }
      } else {
        // User hasn't made this suggestion, so add it
        const matchingSuggestions = await DataStore.query(Suggestion, (p) =>
          p.and((c) => [
            p.suggestion.eq(suggestion),
            p.businessName.eq(businessName),
          ])
        );

        if (matchingSuggestions.length > 0) {
          const suggestionToSave = matchingSuggestions[0];
          await DataStore.save(
            new UserSuggestion({
              userId: thisID,
              suggestion: suggestionToSave,
            })
          );

          // Update the state to reflect the addition
          setHasClickedThumbsUp(true);
          // Set userHasMadeSuggestion to true immediately after adding
          setUserHasMadeSuggestion(true);
          setThumbsUpState(true);
        } else {
          // Handle the case where there's no matching Suggestion
          console.error("No matching Suggestion found.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  let avatararray = [];
  let formatdate = new Date(date);
  let array = [];

  const getThumbsUpColor = () => {
    return userHasMadeSuggestion ? "#5bab5c" : "black";
  };

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
          <div className="suggestion-core">
            <div className="suggestion-avatar">
              {" "}
              <Link to={`/${businessName}`}>
                <Avatar
                  src={businessAvatarURL}
                  alt={businessName}
                  sx={{ height: "40px", width: "40px" }}
                  style={{
                    border: "1px solid #dbdbdb",
                  }}
                />
              </Link>
              <Icon icon="placeholderIcon" />
            </div>
            <div className="suggestion-core-content">
              <div className="brand-username"> @{businessName} </div>
            </div>
          </div>

          <div className="suggestion">
            {" "}
            <p className="actual-suggestion">{suggestion}</p>{" "}
            <div
              className={` ${
                index === 0 ? "progress progress-white" : "progress"
              }`}
            >
              {verification ? (
                <div className="text">Completed </div>
              ) : compliment ? (
                <div className="text">1 Awqard</div>
              ) : (
                <div>
                  {" "}
                  <MilestoneUpdate
                    suggestion={suggestion}
                    businessname={businessName}
                  />
                </div>
              )}

              <div className="update">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="share"
                  color="#a7a7a7"
                  size="sm"
                />
              </div>
            </div>
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
            icon={faThumbsUp}
            className="share"
            color={getThumbsUpColor()}
            size="lg"
            onClick={handleThumbsUpClick}
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
