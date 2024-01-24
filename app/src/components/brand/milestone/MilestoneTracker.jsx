import React, { useState, useEffect } from "react";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Milestone, Suggestion } from "../../../models";
import "../../../styles/brand/milestone/milestone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEllipsis,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

function formatDate(date) {
  const parsedDate = new Date(date);
  const formattedDate = `${
    parsedDate.getMonth() + 1
  }/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
  return formattedDate;
}

function MilestoneTracker({ businessname, suggestionID }) {
  const [loadedSuggestion, setLoadedSuggestion] = useState(null);
  const [groupedMilestones, setGroupedMilestones] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the loaded suggestion data
        const loadedSuggestion = await DataStore.query(
          Suggestion,
          suggestionID
        );
        setLoadedSuggestion(loadedSuggestion);

        // Fetch milestones related to the suggestion
        const milestones = await DataStore.query(
          Milestone,
          (c) =>
            c.and((c) => [
              c.brandName.eq(businessname),
              c.suggestionID.eq(suggestionID),
            ]),
          {
            sort: (s) => s.createdAt(SortDirection.ASCENDING),
          }
        );

        // Group milestones by suggestion ID
        const groupedBySuggestion = milestones.reduce((acc, milestone) => {
          const suggestionID = milestone.suggestionID;
          acc[suggestionID] = acc[suggestionID] || [];
          acc[suggestionID].push(milestone);
          return acc;
        }, {});

        // Initialize expanded state for each group
        const initialExpandedState = Object.keys(groupedBySuggestion).reduce(
          (acc, currentSuggestionID) => {
            acc[currentSuggestionID] = false;
            return acc;
          },
          {}
        );

        // Set the grouped milestones and expanded state in the state
        setGroupedMilestones(groupedBySuggestion);
        setExpandedGroups(initialExpandedState);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [businessname, suggestionID]);

  const toggleGroup = (suggestionID) => {
    setExpandedGroups((prevExpanded) => ({
      ...prevExpanded,
      [suggestionID]: !prevExpanded[suggestionID],
    }));
  };

  return (
    <div className="milestone">
      {Object.keys(groupedMilestones).length > 0 && (
        <div>
          {Object.keys(groupedMilestones).map((currentSuggestionID, index) => (
            <div key={index}>
              <div className="milestone-title">
                {loadedSuggestion?.suggestion}
              </div>

              {/* Render the first and last milestones always */}
              <div className="milestone-update">
                <div className="actual-milestone-1">
                  <div className={`milestone-dot first-milestone-dot`}></div>{" "}
                  <div className="actual-milestone-content">
                    <div>
                      {groupedMilestones[currentSuggestionID][0].milestone}
                    </div>
                    <div className="text">
                      {formatDate(
                        groupedMilestones[currentSuggestionID][0].updatedAt
                      )}
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faHeartCirclePlus} color="#939392" />
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                {groupedMilestones[currentSuggestionID].length > 2 && (
                  <button
                    onClick={() => toggleGroup(currentSuggestionID)}
                    className="toggle-button"
                  >
                    {expandedGroups[currentSuggestionID]
                      ? "Collapse"
                      : "Expand"}
                  </button>
                )}
                {expandedGroups[currentSuggestionID] &&
                  groupedMilestones[currentSuggestionID].map(
                    (milestone, milestoneIndex, milestonesArray) =>
                      // Start the loop from index 1 and stop before the last index
                      milestoneIndex > 0 &&
                      milestoneIndex < milestonesArray.length - 1 && (
                        <div key={milestoneIndex}>
                          <div className="actual-milestone">
                            <div
                              className={`milestone-dot ${
                                milestoneIndex === milestonesArray.length - 1
                                  ? "last-milestone-dot"
                                  : ""
                              }`}
                            ></div>{" "}
                            <div className="actual-milestone-content">
                              <div>{milestone.milestone}</div>
                              <div className="text">
                                {formatDate(milestone.updatedAt)}
                              </div>
                            </div>
                            <FontAwesomeIcon
                              icon={faHeartCirclePlus}
                              color="#939392"
                            />
                            <FontAwesomeIcon icon={faEllipsis} />
                          </div>
                        </div>
                      )
                  )}

                <div className="actual-milestone">
                  <div className={`milestone-dot last-milestone-dot`}></div>{" "}
                  <div className="actual-milestone-content">
                    <div>
                      {
                        groupedMilestones[currentSuggestionID][
                          groupedMilestones[currentSuggestionID].length - 1
                        ].milestone
                      }
                    </div>
                    <div className="text">
                      {formatDate(
                        groupedMilestones[currentSuggestionID][
                          groupedMilestones[currentSuggestionID].length - 1
                        ].updatedAt
                      )}
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faHeartCirclePlus} color="#939392" />
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
            </div>
          ))}
          <div className="project-incompleted">
            {" "}
            <div className="incomplete-dot"> </div>
            <p>finished project</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MilestoneTracker;
