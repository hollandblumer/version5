import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { UserSuggestion, Verification } from "../../models";
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
import MilestoneUpdate from "../user/MilestoneUpdate";
import { Link } from "react-router-dom";

import "../../styles/suggestion/suggestion-user/suggestions.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";

function SignedInSuggestionFromUser({
  suggestion,
  businessname,
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
  const [isDeleted, setIsDeleted] = useState(false); // State to track whether the user has deleted themselves from the suggestion

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
        setBusinessAvatarURL(signedFiledAccessURL);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [isDeleted]);

  let avatararray = [];
  let formatdate = new Date(date);
  let array = [];

  const handleDeleteClick = async () => {
    try {
      // Remove the user from the suggestion
      const existingUserSuggestion = await DataStore.query(
        UserSuggestion,
        (c) =>
          c.and((c) => [
            c.user.id.eq(thisID),
            c.suggestion.suggestion.eq(suggestion),
            c.suggestion.businessName.eq(businessname),
          ])
      );

      if (existingUserSuggestion.length > 0) {
        const suggestionToDelete = existingUserSuggestion[0];
        await DataStore.delete(suggestionToDelete);

        // Update the state to reflect the removal
        setIsDeleted(true);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
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

          <div className="suggestion">
            {" "}
            <p className="actual-suggestion">{suggestion}</p>{" "}
          </div>
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
          <button onClick={handleDeleteClick}>delete</button>
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

export default SignedInSuggestionFromUser;
