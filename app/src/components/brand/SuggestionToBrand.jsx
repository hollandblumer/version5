import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { UserSuggestion, Milestone } from "../../models";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import SuggestionSupporterBrand from "../follower/SuggestionSupporterBrand";
import {
  faEllipsis,
  faPlusCircle,
  faShareNodes,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/suggestion/suggestion-business/suggestion.css";
import "../../styles/suggestion/suggestion-general/suggestion.css";

function SuggestionToBrand({
  suggestion,
  businessname,
  actualindex,
  compliment,
  counter,
}) {
  const { name } = useParams();

  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [businessAvatarURL, setBusinessAvatarURL] = useState("");
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        /*   const businessData = await DataStore.query(Suggestion, p=> p.businessname('eq', name))   
        setSuggestions(businessData); */

        const suggestionUsers = await DataStore.query(
          UserSuggestion,
          (c) =>
            c.and((c) => [
              c.suggestion.suggestion.eq(suggestion),
              c.suggestion.businessname.eq(businessname),
            ]),
          {
            sort: (s) => s.createdAt(SortDirection.ASCENDING),
          }
        );

        const signedFiledAccessURL = await Storage.get(`${businessname}.jpg`);

        setBusinessAvatarURL(signedFiledAccessURL);

        let suggestionpromisearray = [];
        suggestionUsers.map((p) => suggestionpromisearray.push(p.suggestion));
        await Promise.all(suggestionpromisearray).then((values) => {
          setSuggestions(values);
        });

        let userpromisearray = [];
        suggestionUsers.map((p) => userpromisearray.push(p.user));
        await Promise.all(userpromisearray).then((values) => {
          setUsers(values);
        });

        const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [
            c.brandName.eq(businessname),
            c.suggestion.eq(suggestion),
          ])
        );
        setMilestones(milestones);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // console.log(suggestions[0])
  let avatararray = [];
  let array = [];

  return (
    <div
      className={` ${
        actualindex % 2 == 0
          ? "brand-suggestion-container even"
          : "brand-suggestion-container"
      }`}
    >
      <div className="brand-subtle-suggestion-info">
        {" "}
        <div>
          {compliment ? (
            <div className="text">compliment </div>
          ) : (
            <div className="text"> suggestion </div>
          )}{" "}
        </div>
        <div> </div>
      </div>
      <div className="brand-suggestion-content">
        <div className="ranking-number">{counter}</div>
        {/*     {suggestions.map((p, index) => (
          <div key={p.id}>
            {array.includes(p.suggestion) ? (
              <div></div>
            ) : (
              <div
                className={` ${
                  p.icon != null && index != 0
                    ? "icon right"
                    : p.icon != null && index === 0
                    ? "white-icon right"
                    : "no-icon right"
                }`}
              >
                <Icon icon={p.icon} />

                {array.push(p.suggestion).hide}
              </div>
            )}
          </div>
        ))} */}

        <p className="content">{suggestion}</p>
        {/* {suggestion.length < 30 ? <></> : <>...</>} good idea */}

        {compliment == true ? (
          <div className="ranking-progress">2 Awards</div>
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
            icon={faPlusCircle}
            className="share"
            color="#5b584a"
            size="lg"
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
