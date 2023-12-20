import { useState, useEffect } from "react";
import Icon from "../../icon/Icon";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Milestone, Suggestion } from "../../../models";
import Avatar from "@mui/material/Avatar";
import "../../../styles/brand/milestone/milestone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPlusCircle,
  faShareNodes,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import MilestonBlob from "../../../assets/images/milestone-blob.svg";

function formatDate(date) {
  const parsedDate = new Date(date);
  const formattedDate = `${
    parsedDate.getMonth() + 1
  }/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
  return formattedDate;
}

function MilestoneTracker({ businessname, suggestionID, milestone, date }) {
  const [milestones, setMilestones] = useState([]);
  const [icon, setIcon] = useState();
  const [loadedSuggestion, setLoadedSuggestion] = useState(null); // To store the loaded suggestion

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedSuggestion = await DataStore.query(
          Suggestion,
          suggestionID
        );
        setLoadedSuggestion(loadedSuggestion);

        const milestones = await DataStore.query(
          Milestone,
          (c) =>
            c.and((c) => [
              c.brandName.eq(businessname),
              c.suggestionID.eq(suggestionID),
            ]),
          {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
          }
        );

        setMilestones(milestones);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <img src={MilestonBlob} className="milestone-blob" />
      <div className="milestone-tracker">
        {milestones.length > 0 ? (
          <div>
            <div className="milestone-subtle-suggestion-info">
              <div>{formatDate(date)}</div>
            </div>{" "}
            {/*  <Avatar
            src={url}
            // sx={{ height: "90px", width: "90px" }}
            sx={{ height: "40px", width: "40px" }}
            style={{
              border: "1px solid #ffffff",
            }}
          />{" "} */}
            <div className="milestone-update">
              <div className="milestone-title"> {milestone} </div>
              <span className="milestone-businessname"> @{businessname} </span>
              <span className="actual-milestone"> {milestone} </span>
              {/*    <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="share"
                color="rgb(47,47,47)"
              /> */}
              {/* <div className="milestone-suggestion"> */}{" "}
              <span className="milestone-grey"> in response to the </span>
              <span className="actual-milestone-suggestion">
                {loadedSuggestion.suggestion}
              </span>
              <span className="actual-milestone">
                {" "}
                {loadedSuggestion.compliment ? (
                  <span className="actual-milestone">compliment</span>
                ) : (
                  <span className="actual-milestone-suggestion">
                    {loadedSuggestion.suggestion}
                  </span>
                )}
              </span>
              {/* </div> */}
              {/* <div
              className={` ${
                icon != null && index != 0
                  ? "milestone-icon "
                  : icon != null && index === 0
                  ? "milestone-white-icon "
                  : "milestone-no-icon"
              }`}
            >
              <Icon icon={icon} />
            </div> */}
            </div>
            <div className="see-more-milestone">
              Liked by hollandblumer eleanorblumer and see more{" "}
            </div>
            {/*   <div className="milestone-follower-container">
         
                </div>
              )}
            </div>

            <div className="milestone-like-share">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="share"
                color="#2f2f2f"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faShareNodes}
                className="share"
                color="#2f2f2f"
                size="lg"
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="share"
                color="#2f2f2f"
                size="lg"
              />
            </div>
          </div> */}
          </div>
        ) : (
          <div className="text">Not started</div>
        )}
      </div>
    </div>
  );
}

export default MilestoneTracker;
