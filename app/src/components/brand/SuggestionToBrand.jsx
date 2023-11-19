import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/suggestion/suggestion-business/suggestion.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";

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
    return userHasMadeSuggestion ? "#5bab5c" : "black";
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
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="share"
                          color="#a7a7a7"
                        />
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
                  <SuggestionSupporterBrand username={p.name} />
                  {avatararray.push(p.name).hide}
                </div>
              ) : (
                <div>{avatararray.push(p.name).hide}</div>
              )}
            </div>
          ))}

          <div>
            {" "}
            {avatararray.length > 4 ? (
              <div className="avatar-length">{avatararray.length - 4}+</div>
            ) : (
              <div></div>
            )}{" "}
          </div>
        </div>

        <div className="like-share right">
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
            size="lg"
          />
          <FontAwesomeIcon
            icon={faEllipsis}
            className="share"
            color="#5b584a"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}

export default SuggestionToBrand;
