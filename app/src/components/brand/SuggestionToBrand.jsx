import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "@aws-amplify/auth";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { UserSuggestion, Milestone, Suggestion, User } from "../../models";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import SuggestionSupporterBrand from "../follower/SuggestionSupporterBrand";
import {
  faEllipsis,
  faHeartCirclePlus,
  faHeartCircleCheck,
  faBell,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import FirstRanking from "../../assets/images/first-ranking.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/suggestion/suggestion-business/suggestion.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";
import ShareNodes from "../../assets/images/share-nodes.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

function SuggestionToBrand({
  suggestion,
  suggestionID,
  businessName,
  actualindex,
  iscompliment,
  counter,
  thisID,
  email,
}) {
  const [users, setUsers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [hasClickedThumbsUp, setHasClickedThumbsUp] = useState(false);
  const [userHasMadeSuggestion, setUserHasMadeSuggestion] = useState(false);
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false); // To track if the link has been copied
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");

  const navigate = useNavigate();
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

        let userpromisearray = [];

        suggestionUsers.map((p) => userpromisearray.push(p.user));
        await Promise.all(userpromisearray).then((values) => {
          setUsers(values);
        });

        const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [
            c.brandName.eq(businessName),
            c.suggestionID.eq(suggestionID),
          ])
        );
        setMilestones(milestones);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [userHasMadeSuggestion]);

  const getThumbsUpColor = () => {
    return userHasMadeSuggestion ? "#5bab5c" : "#525050";
  };
  const [clickedSuggestionID, setClickedSuggestionID] = useState(null);

  /*  const handleCopyLink = () => {
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
  }; */

  const handleThumbsUpClick = async () => {
    try {
      if (userHasMadeSuggestion) {
        // User has already made this suggestion, so remove it
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
              userId: thisID,
              suggestion: suggestionToSave,
            })
          );
          setUserHasMadeSuggestion(true);
        } else {
          console.error("No matching Suggestion found.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  let avatararray = [];
  let array = [];

  const popupRef = useRef(null);

  const handleClick = (event) => {
    const ellipsisIconClicked =
      event.target.classList.contains("share") ||
      event.target.closest(".brand-suggestion-container .like-share .share");

    if (ellipsisIconClicked) {
      // Click on the ellipsis icon or its child elements, toggle the popup
      setClickedSuggestionID(suggestionID);
      return; // Add this line to stop event propagation
    }

    // Click outside the popup or ellipsis icon, close it
    setPopupVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleEmailPrompt = async () => {
    const userEmail = prompt("Please enter your email:");
    if (userEmail && userEmail.toLowerCase() !== "na") {
      const existingUser = await DataStore.query(User, (c) =>
        c.email.eq(userEmail)
      );

      if (existingUser.length > 0) {
        const signInConfirmation = window.confirm(
          "An account with this email already exists. Do you want to sign in?"
        );

        if (signInConfirmation) {
          navigate("/sign-in");
        }
      } else {
        setEnteredEmail(userEmail);
      }
    }
  };

  const handleShareClick = () => {
    // You can construct your shareable message
    const shareableMessage = `Check out "${suggestion}" suggestion made to ${businessName}'s profile.`;

    // Copy the message to the clipboard
    navigator.clipboard
      .writeText(shareableMessage)
      .then(() => {
        // Set state to indicate that the message has been copied
        setCopied(true);

        // Show the tooltip for a short duration
        setTimeout(() => {
          // Reset the state after a short duration
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy info to clipboard:", error);
      });
  };

  const handleReportClick = () => {
    // You can construct the mailto link
    const subject = `Reporting "${suggestion}" on ${businessName}'s profile`;
    const content = `Feel free to add more specific details below:`;

    // Open the default mail client with the mailto link
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(content)}`;
  };

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
          <div className="ranking-number">
            <p className="counter">{counter}</p>
            <img src={FirstRanking} className="first-ranking" alt="Ranking" />
          </div>

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
          {/* <FontAwesomeIcon
            icon={faThumbsUp}
            className="share"
            color={getThumbsUpColor()}
            size="lg"
            onClick={handleThumbsUpClick}
          /> */}

          <FontAwesomeIcon
            icon={
              userHasMadeSuggestion ? faHeartCircleCheck : faHeartCirclePlus
            }
            className="share"
            color={userHasMadeSuggestion ? "#2ECC71" : "#E8542B"}
            size="lg"
            onClick={() => {
              if (!email || email.toLowerCase() === "na") {
                // Prompt for email if it's empty or 'na'
                handleEmailPrompt();
              } else {
                // Proceed with existing logic for handleThumbsUpClick
                handleThumbsUpClick();
              }
            }}
          />

          {/*    <FontAwesomeIcon
            icon={faHeartCircleCheck}
            color="#5BAB5C"
            size="xl"
          /> */}
          {/* <FontAwesomeIcon icon={faHeartCirclePlus} color="#e2bd75" size="xl" /> */}
          {/* <FontAwesomeIcon icon={faHeartCirclePlus} color="#E8542B" size="xl" /> */}
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
            onClick={togglePopup}
          />
        </div>
        {isPopupVisible && (
          <div ref={popupRef} className="trending-ellipsis-popup-menu">
            <button onClick={handleShareClick}>
              {copied ? "Copied!" : "Share"}
              <FontAwesomeIcon icon={faShare} />
            </button>

            <button onClick={handleReportClick}>
              Report <FontAwesomeIcon icon={faBell} />
            </button>
          </div>
        )}
        {showTooltip && <div className="tooltip">Copied to clipboard!</div>}
      </div>
    </div>
  );
}

export default SuggestionToBrand;
