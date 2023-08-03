import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Suggestion, User, UserSuggestion, Milestone } from "../../models";
import Avatar from "@mui/material/Avatar";
import SuggestionToBrand from "./SuggestionToBrand";
import SuggestionForm from "./SuggestionForm";
import BrandInfo from "./brand-info/BrandInfo";
import { Storage } from "aws-amplify";
import Icon from "../icon/Icon";
import "../../styles/brand/dashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faComments,
  faClipboardCheck,
  faEllipsis,
  faPlusCircle,
  faShareNodes,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/brand/milestone/milestone.css";
import MilestoneTracker from "./milestone/MilestoneTracker";

function BrandDashboard({ user, email, id }) {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [brandURL, setBrandURL] = useState("");
  const [parentBrand, setParentBrand] = useState("");
  const [brandLocation, setBrandLocation] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandSize, setBrandSize] = useState(0);
  const [verification, setVerification] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [memberSinceDate, setMemberSinceDate] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const brandData = await DataStore.query(User, (p) => p.name.eq(name));

        const brandFilePath = brandData[0].filePath;

        const signedBrandFilePath = await Storage.get(brandFilePath);
        setBrandLocation(brandData[0].location);
        setParentBrand(brandData[0].parentBrand);
        setBrandIndustry(brandData[0].industry);
        setMemberSinceDate(brandData[0].createdAt);
        setBrandURL(signedBrandFilePath);
        setVerification(brandData[0].isVerified);

        const suggestions = await DataStore.query(
          UserSuggestion,
          (p) => p.suggestion.businessname.eq(name),
          {
            sort: (s) => s.createdAt(SortDirection.ASCENDING),
          }
        );

        let promisearray = [];
        suggestions.map((p) => promisearray.push(p.suggestion));
        await Promise.all(promisearray).then((values) => {
          setSuggestions(values);
        });

        const milestones1 = await DataStore.query(Milestone, (p) =>
          p.brandName.eq(name)
        );

        const milestones = await DataStore.query(
          Milestone,
          (c) => c.and((c) => [c.brandName.eq(name)]),
          {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
          }
        );

        /*  const milestones = await DataStore.query(
          Milestone,
          Predicates.ALL,
          (p) => p.brandName.eq(name),
          {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
          }
        ); */

        /*    const milestones = await DataStore.query(Milestone, Predicates.ALL, {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        });
 */
        setMilestones(milestones);

        /*    const milestones = await DataStore.query(Milestone, (c) => c.and(c => [
          c.brandName.eq(name),
          c.businessname.eq(businessname)


        ]));
 */
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  let array = [];
  let milestonearray = [];
  let avatararray = [];
  let count = 0;

  console.log("size", brandSize);
  return (
    <div>
      <section>
        <article>
          <BrandInfo
            url={brandURL}
            username={name}
            location={brandLocation}
            parentBrand={parentBrand}
            date={memberSinceDate}
            industry={brandIndustry}
            verification={verification}
            size={brandSize}
          />
          <SuggestionForm
            name={user}
            email={email}
            thisID={id}
            businessname={name}
          />
        </article>

        <article>
          <div className="brand-suggestion-info">
            <div className="rankings-title-container">
              {" "}
              <select className="chart-select">
                {" "}
                <option>
                  Top Charts{" "}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    size="sm"
                    color="#5c5848"
                  />{" "}
                </option>
              </select>
              <div className="sort-select-container">
                <div>sort by</div>
                <select className="sort-select">
                  {" "}
                  <option>
                    all{" "}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      size="xs"
                      color="#5c5848"
                    />{" "}
                  </option>
                </select>
              </div>
            </div>

            <div className="top-suggestions-box">
              {suggestions.map((p, index) => (
                <div key={p.id}>
                  {array.includes(p.suggestion) ? (
                    <div></div>
                  ) : (
                    <div>
                      {(count = count + 1).hide}

                      <SuggestionToBrand
                        suggestion={p.suggestion}
                        compliment={p.compliment}
                        businessname={p.businessname}
                        actualindex={index}
                        counter={count}
                      />
                      {array.push(p.suggestion).hide}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <div className="business-nav">
        <div className="business-nav-title"> Activity </div>
        <div className="business-nav-row">
          <div className="business-nav-item">
            {" "}
            {/*  <FontAwesomeIcon
              icon={faClipboardCheck}
              size="sm"
              color="#5c5848"
            />{" "} */}
            Milestones
          </div>
          <div className="business-nav-grey">
            {" "}
            {/* <FontAwesomeIcon icon={faLeaf} size="sm" color="#ccc" /> Completed */}
            Projects{" "}
          </div>
          <div className="business-nav-grey">
            {" "}
            {/* <FontAwesomeIcon icon={faLeaf} size="sm" color="#ccc" /> Completed */}
            Certifications{" "}
          </div>
        </div>

        {milestones.length == 0 ? (
          <div className="milestone-box">
            <p>
              {" "}
              <b>@{name} </b>does not have any milestones yet
            </p>
          </div>
        ) : (
          <div className="milestone-box">
            {" "}
            {milestones.map((p, index) => (
              <div key={p.id}>
                {milestonearray.includes(p.suggestion) ? (
                  <div></div>
                ) : (
                  <div
                    className={` ${
                      index % 2 === 0 && index === 0
                        ? "milestone-active corner milestone"
                        : index % 2 == 0
                        ? " milestone-active milestone"
                        : "milestone-inactive milestone"
                    }`}
                  >
                    <div className="milestone-padding">
                      <MilestoneTracker
                        url={brandURL}
                        businessname={p.brandName}
                        suggestion={p.suggestion}
                        index={index}
                        currentMilestone={p.milestone}
                      />
                    </div>

                    {milestonearray.push(p.suggestion).hide}
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

export default BrandDashboard;
