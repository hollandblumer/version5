import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "@aws-amplify/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { UserSuggestion, Milestone, Suggestion } from "../../models";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import SuggestionSupporterBrand from "../follower/SuggestionSupporterBrand";
import {
  faEllipsis,
  faPlusCircle,
  faShareNodes,
  faArrowUpRightFromSquare,
  faThumbsUp,
  faHeartCirclePlus,
  faPlus,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/suggestion/suggestion-business/suggestion.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";
import ShareNodes from "../../assets/images/share-nodes.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

function SuggestionToBrand({
  suggestion,
  businessName,
  actualindex,
  iscompliment,
  counter,
  thisID,
}) {
  const [users, setUsers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [hasClickedThumbsUp, setHasClickedThumbsUp] = useState(false);
  const [userHasMadeSuggestion, setUserHasMadeSuggestion] = useState(false);
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false); // To track if the link has been copied
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        // User is not authenticated
        setUser(null);
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        // Check if the user has already made a UserSuggestion for this suggestion and businessName
        const existingUserSuggestion = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.user.id.eq(thisID.thisID),
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

        let userpromisearray = [];

        suggestionUsers.map((p) => userpromisearray.push(p.user));
        await Promise.all(userpromisearray).then((values) => {
          setUsers(values);
        });

        const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [c.brandName.eq(businessName)])
        );
        setMilestones(milestones);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [hasClickedThumbsUp]);

  const getThumbsUpColor = () => {
    return userHasMadeSuggestion ? "#5bab5c" : "#525050";
  };

  const handleCopyLink = () => {
    // You can construct your shareable link using businessName, counter, suggestion, and iscompliment
    const shareableLink = `${
      window.location.origin
    }/share?businessName=${encodeURIComponent(
      businessName
    )}&counter=${counter}&suggestion=${encodeURIComponent(suggestion)}&type=${
      iscompliment ? "compliment" : "suggestion"
    }`;

    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        setCopied(true);

        // Show the tooltip for a short duration
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy link to clipboard:", error);
      });
  };

  const handleThumbsUpClick = async () => {
    try {
      if (userHasMadeSuggestion) {
        // User has already made this suggestion, so remove it
        const existingUserSuggestion = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.user.id.eq(thisID.thisID),
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
              userId: thisID.thisID,
              suggestion: suggestionToSave,
            })
          );

          // Update the state to reflect the addition
          setHasClickedThumbsUp(true);
          // Set userHasMadeSuggestion to true immediately after adding
          setUserHasMadeSuggestion(true);
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
  let array = [];

  return (
    <div
      className={` ${
        actualindex == 0
          ? "brand-suggestion-container first"
          : "brand-suggestion-container"
      }`}
    >
      <div className="brand-suggestion-content">
        <div className="ranking-content">
          <div className="ranking-number">{counter}</div>

          <div className="suggestion-update">
            <div className="content">{suggestion}</div>
            <div className="brand-subtle-suggestion-info">
              {" "}
              {iscompliment ? (
                <div className="text">compliment </div>
              ) : (
                <div className="text"> suggestion -</div>
              )}{" "}
              {iscompliment == true ? (
                <div className="ranking-progress"></div>
              ) : (
                <div>
                  {" "}
                  {milestones.length === 0 ? (
                    <div className="ranking-progress">Not Started</div>
                  ) : (
                    <div className="top-milestones">
                      <div>
                        {milestones.length == 1 ? (
                          <div>1 Milestone</div>
                        ) : (
                          <div>{milestones.length} Milestones</div>
                        )}{" "}
                      </div>
                      <div className="update">
                        {/*   <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="share"
                          color="#a7a7a7"
                        /> */}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div> </div>
            </div>
          </div>
        </div>

        <div className="brand-supporter-container">
          {users.map((p) => (
            <div key={p.id}>
              {avatararray.length < 4 ? (
                <div>
                  {p.isVerified == true ? (
                    <SuggestionSupporterBrand username={p.name} />
                  ) : (
                    <></>
                  )}

                  {avatararray.push(p.name).hide}
                </div>
              ) : (
                <div>{avatararray.push(p.name).hide}</div>
              )}
            </div>
          ))}

          <div>
            {" "}
            {avatararray.length > 0 ? (
              <div className="avatar-length">+{avatararray.length}</div>
            ) : (
              <div></div>
            )}{" "}
          </div>
        </div>
        <div className="like-share right">
          {/* {user && ( // Check if the user is authenticated
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="share"
              color={getThumbsUpColor()}
              size="lg"
              onClick={handleThumbsUpClick}
            />
          )} */}
          {/*    <FontAwesomeIcon
            icon={faHeartCircleCheck}
            color="#5BAB5C"
            size="xl"
          /> */}
          {/* <FontAwesomeIcon icon={faHeartCirclePlus} color="#e2bd75" size="xl" /> */}
          <FontAwesomeIcon icon={faHeartCirclePlus} color="#E8542B" size="xl" />
          {/* <CopyToClipboard
            text={`Shareable Link: ${businessName} has ${counter} people supporting ${suggestion} ${
              iscompliment ? "compliment" : "suggestion"
            }`}
          >
            <FontAwesomeIcon
              icon={faShareNodes}
              className="share button"
              color="#525050"
              size="lg"
              onClick={handleCopyLink}
            />
          </CopyToClipboard> */}
          <FontAwesomeIcon
            icon={faEllipsis}
            className="share"
            color="#5b584a"
            size="lg"
          />
        </div>
        {showTooltip && <div className="tooltip">Copied to clipboard!</div>}
      </div>
    </div>
  );
}

export default SuggestionToBrand;
