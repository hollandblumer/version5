import React, { useState, useEffect } from "react";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Milestone, Suggestion } from "../../../models";
import "../../../styles/brand/milestone/milestone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEllipsis } from "@fortawesome/free-solid-svg-icons";

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

        // Set the grouped milestones in the state
        setGroupedMilestones(groupedBySuggestion);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [businessname, suggestionID]);

  return (
    <div className="milestone">
      {Object.keys(groupedMilestones).length > 0 && (
        <div>
          {Object.keys(groupedMilestones).map((currentSuggestionID, index) => (
            <div key={index}>
              <div className="milestone-title">
                {loadedSuggestion?.suggestion}
              </div>
              <div className="milestone-update">
                {groupedMilestones[currentSuggestionID].map(
                  (milestone, milestoneIndex, milestonesArray) => (
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
                            {" "}
                            {formatDate(milestone.updatedAt)}
                          </div>
                        </div>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <FontAwesomeIcon icon={faEllipsis} />
                      </div>
                    </div>
                  )
                )}
                <div className="project-incompleted">
                  {" "}
                  <div className="incomplete-dot"> </div>
                  <p>finished project</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MilestoneTracker;
