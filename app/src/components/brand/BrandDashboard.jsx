import React from "react";
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
import "../../styles/brand/dashboard/brand-dashboard.css";
import "../../styles/brand/top-charts/top-charts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TopCharts from "./TopCharts";
import "../../styles/brand/milestone/milestone.css";
import MilestoneTracker from "./milestone/MilestoneTracker";

function BrandDashboard({ SignedInUser }) {
  const { name } = useParams();
  const [activeContainer, setActiveContainer] = useState("milestones");
  const [suggestions, setSuggestions] = useState([]);
  const [brandURL, setBrandURL] = useState("");
  const [parentBrand, setParentBrand] = useState("");
  const [brandLocation, setBrandLocation] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandSize, setBrandSize] = useState(0);
  const [verification, setVerification] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [memberSinceDate, setMemberSinceDate] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const brandData = await DataStore.query(User, (p) => p.name.eq(name));

        const brandFilePath = brandData[0].filePath;

        const signedBrandFilePath = await Storage.get(brandFilePath);
        console.log("hello", signedBrandFilePath);
        setBrandLocation(brandData[0].location);
        setParentBrand(brandData[0].parentBrand);
        setBrandIndustry(brandData[0].industry);
        setMemberSinceDate(brandData[0].createdAt);
        setBrandURL(signedBrandFilePath);
        setVerification(brandData[0].isVerified);

        const suggestions = await DataStore.query(
          UserSuggestion,
          (p) => p.suggestion.businessName.eq(name),
          {
            sort: (s) => s.createdAt(SortDirection.ASCENDING),
          }
        );

        let promisearray = [];
        suggestions.map((p) => promisearray.push(p.suggestion));
        await Promise.all(promisearray).then((values) => {
          setSuggestions(values);
        });

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

  return (
    <div className="brand-dashboard">
      <div className="brand-dashboard-top">
        <div className="brand-dashboard-left">
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
            name={SignedInUser.name}
            email={SignedInUser.email}
            thisID={SignedInUser.id}
            businessName={name}
          />
        </div>

        <div className="brand-dashboard-right">
          <TopCharts thisID={SignedInUser.id} />
        </div>
      </div>
      <div className="brand-dashboard-bottom">
        <div className="brand-nav">
          <h3> Business Activity </h3>
          <div className="business-nav-row">
            <div
              className={`business-nav-item ${
                activeContainer === "milestones" ? "active" : ""
              }`}
              onClick={() => {
                setActiveContainer("milestones");
                setSliderPosition(0);
              }}
            >
              Milestones
            </div>
            <div className="brand-divider">/</div>
            <div
              className={`business-nav-item ${
                activeContainer === "projects" ? "active" : ""
              }`}
              onClick={() => {
                setActiveContainer("projects");
                setSliderPosition(1);
              }}
            >
              Projects
            </div>
            <div className="brand-divider">/</div>
            <div
              className={`business-nav-item ${
                activeContainer === "certifications" ? "active" : ""
              }`}
              onClick={() => {
                setActiveContainer("certifications");
                setSliderPosition(2);
              }}
            >
              Certifications
            </div>
          </div>
          {/*   <div
            className="slider-bar"
            style={{
              backgroundColor: "#808080",
              transform: `translateX(${sliderPosition * 100}px)`, // Move slider based on position
            }}
          ></div> */}
        </div>

        {activeContainer === "milestones" ? (
          milestones.length === 0 ? (
            <div className="milestone-container">
              <div className="no-suggestions-container">
                <div className="no-suggestions">No Milestones Yet</div>
                <div className="no-suggestions-small">
                  This brand's snoozing on the possibilities 💤
                </div>
              </div>
            </div>
          ) : (
            <div className="milestone-container">
              <div className="milestone-cards">
                {milestones.map((p, index) => (
                  <div
                    key={p.id}
                    className={`${
                      index % 2 === 0 && index === 0
                        ? "milestone-active corner milestone"
                        : index % 2 === 0
                        ? " milestone-active milestone"
                        : "milestone-inactive milestone"
                    }`}
                  >
                    <div className="milestone-padding">
                      <MilestoneTracker
                        url={brandURL}
                        businessname={p.brandName}
                        suggestionID={p.suggestionID}
                        date={p.createdAt}
                        milestone={p.milestone}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="dot-row">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="home-arrow-space"
                  size="sm"
                  color="#afa9a1"
                />
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="home-arrow-space"
                  size="sm"
                  color="#afa9a1"
                />
              </div>
            </div>
          )
        ) : activeContainer === "projects" ? (
          <div className="projects-container">
            <div className="no-suggestions-container">
              <div className="no-suggestions">No Projects Yet</div>
              <div className="no-suggestions-small">
                This brand's snoozing on the possibilities 💤
              </div>
            </div>
          </div>
        ) : (
          activeContainer === "certifications" && (
            <div className="certifications-container">
              <div className="no-suggestions-container">
                <div className="no-suggestions">No Certifications Yet</div>
                <div className="no-suggestions-small">
                  This brand's snoozing on the possibilities 💤
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default BrandDashboard;
