import React from "react";
import { useState, useEffect, useRef } from "react";
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
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
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
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandSize, setBrandSize] = useState(0);
  const [verification, setVerification] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [memberSinceDate, setMemberSinceDate] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);
  const [topChartsSearchTerm, setTopChartsSearchTerm] = useState("");
  const [selectedSuggestionId, setSelectedSuggestionId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        setCity(brandData[0].city);
        setCountry(brandData[0].country);
        setState(brandData[0].state);
        setBrandSize(brandData[0].size);
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

        const uniqueSuggestionIds = [
          ...new Set(milestones.map((milestone) => milestone.suggestionID)),
        ];

        const uniqueMilestones = uniqueSuggestionIds.map(
          (uniqueSuggestionId) => {
            // Find the first milestone for each unique suggestionId
            return milestones.find(
              (milestone) => milestone.suggestionID === uniqueSuggestionId
            );
          }
        );

        setMilestones(uniqueMilestones);

        /*    const milestones = await DataStore.query(Milestone, (c) => c.and(c => [
          c.brandName.eq(name),
          c.businessname.eq(businessname)
        ]));
        
 */ if (suggestions.length > 0 && !selectedSuggestionId) {
          setSelectedSuggestionId(suggestions[0].id);
        }
      } catch (err) {
        console.error(err);
      }

      if (suggestions.length > 0 && !selectedSuggestionId) {
        // If there are suggestions and no selected suggestion ID is set,
        // set the selected suggestion ID to the first suggestion's ID
        setSelectedSuggestionId(suggestions[0].id);
      }
    };

    getData();
  }, [suggestions, selectedSuggestionId]);

  const handleSelect = (suggestionId) => {
    setSelectedSuggestionId(suggestionId);
  };

  const toggleDropdown = () => {
    // Define toggleDropdown function
    setIsDropdownOpen(!isDropdownOpen);
  };
  /*  let array = [];
  let milestonearray = [];
  let avatararray = [];
  let count = 0; */
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
            city={city}
            state={state}
            country={country}
          />
          <SuggestionForm
            name={SignedInUser.name}
            email={SignedInUser.email}
            thisID={SignedInUser.id}
            businessName={name}
            setTopChartsSearchTerm={setTopChartsSearchTerm}
          />
        </div>

        <div className="brand-dashboard-right">
          <TopCharts
            thisID={SignedInUser.id}
            initialSearchTerm={topChartsSearchTerm}
            email={SignedInUser.email}
          />
        </div>
      </div>
      <div className="brand-dashboard-bottom">
        <div className="brand-nav">
          <h3>
            {" "}
            <i>Business Activity</i>{" "}
          </h3>
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
              Projects
            </div>
            {/*  <div className="brand-divider">/</div>
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
            </div> */}
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
            <div className="no-milestone-container">
              <div className="no-suggestions-container">
                <div className="no-suggestions">No Milestones Yet</div>
                <div className="no-suggestions-small">
                  This brand's snoozing on the possibilities 💤
                </div>
              </div>
            </div>
          ) : (
            <div className="milestone-container">
              <div
                ref={dropdownRef}
                // onChange={(e) => setSelectedSuggestionId(e.target.value)}
                onClick={toggleDropdown}
                style={{ marginBottom: "40px" }}
              >
                <div className="dropdown-header">
                  {/*   {suggestions.map((suggestion) => (
                  <div key={suggestion.id} value={suggestion.id}>
                    {suggestion.suggestion}
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className="dropdown-icon"
                    />
                  </div>
                ))} */}
                  {selectedSuggestionId !== null
                    ? suggestions.map((suggestion) => {
                        if (suggestion.id === selectedSuggestionId) {
                          return suggestion.suggestion;
                        }
                        return null;
                      })
                    : "Select a suggestion"}
                  <FontAwesomeIcon
                    icon={faSortDown}
                    className="dropdown-icon"
                  />
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-options">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="dropdown-option"
                        onClick={() => handleSelect(suggestion.id)}
                      >
                        <div className="checkbox-option">
                          {suggestion.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="milestone-cards">
                {/*   {milestones.map((p, index) => (
                  <MilestoneTracker
                    url={brandURL}
                    businessname={name}
                    suggestionID={p.suggestionID}
                    milestone={p.milestone}
                  />
                ))} */}

                <MilestoneTracker
                  url={brandURL}
                  businessname={name}
                  milestone={selectedSuggestionId.milestone}
                  key={selectedSuggestionId}
                  suggestionID={selectedSuggestionId}
                  milestones={milestones.filter(
                    (milestone) =>
                      milestone.suggestionID === selectedSuggestionId
                  )}
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
