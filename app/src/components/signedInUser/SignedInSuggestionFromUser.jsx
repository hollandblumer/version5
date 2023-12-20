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
  faShare,
  faArrowUpRightFromSquare,
  faTrashCan,
  faShareNodes,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MilestoneUpdate from "../user/MilestoneUpdate";
import { Link } from "react-router-dom";
import ShareNodes from "../../assets/images/share-nodes.svg";
import "../../styles/suggestion/suggestion-user/suggestions.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";

function formatTimeDifference(date) {
  const currentDate = new Date();
  const timeDifference = currentDate - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // Assuming an average month has 30.44 days
  const years = Math.floor(days / 365.25); // Considering leap years

  if (years >= 1) {
    return `${years}yr`;
  } else if (months >= 1) {
    return `${months}mo`;
  } else if (weeks >= 1) {
    return `${weeks}w`;
  } else {
    return `${days}d`;
  }
}

function SignedInSuggestionFromUser({
  suggestion,
  businessname,
  date,
  compliment,
  index,
  thisID,
  isBoxHovered,
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
  let formatdate = formatTimeDifference(new Date(date));
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
    <div
      className={`suggestion-container ${
        index === 0 && !isBoxHovered ? "first-suggestion" : ""
      }`}
    >
      <div className="subtle-suggestion-info">
        {/*  {compliment ? (
          <div className="text">compliment </div>
        ) : (
          <div className="text"> suggestion </div>
        )}{" "}
        <div> {formatdate.toLocaleDateString("en-US")} </div> */}
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
                  sx={{ height: "45px", width: "45px" }}
                  style={{
                    border: "1px solid #dbdbdb",
                  }}
                />
              </Link>
              <Icon icon="placeholderIcon" />
            </div>

            <div className="brand-username">
              {" "}
              {suggestion}
              {compliment ? (
                <div className="text">compliment - {formatdate} ago</div>
              ) : (
                <div className="text"> suggestion - {formatdate} ago</div>
              )}{" "}
            </div>
          </div>
        </div>
        {/*     <div className="suggestion">
          {" "}
          <div
            className={` ${
              index === 0 ? "progress progress-white" : "progress"
            }`}
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
        </div> */}

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
        <div className="time-share">
          {/*           {formatdate} ago */}
          <div className="like-share">
            {/* <button
              onClick={handleDeleteClick}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              {" "}
              D
            </button> */}{" "}
            <FontAwesomeIcon
              icon={faShareNodes}
              className="share"
              color="#525050"
              size="lg"
            />
            <FontAwesomeIcon
              icon={faEllipsis}
              style={{ marginTop: "-.2rem" }}
              color="#5b584a"
              size="xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignedInSuggestionFromUser;
