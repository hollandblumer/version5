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

function formatDate(date) {
  const parsedDate = new Date(date);
  const formattedDate = `${
    parsedDate.getMonth() + 1
  }/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
  return formattedDate;
}

function MilestoneTracker({
  suggestion,
  businessname,
  index,
  currentMilestone,
  url,
  date,
}) {
  const [milestones, setMilestones] = useState([]);
  const [icon, setIcon] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        /*   const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [
            c.brandName.eq(businessname),
            c.suggestion.eq(suggestion),
          ])
        ); */

        const milestones = await DataStore.query(
          Milestone,
          (c) =>
            c.and((c) => [
              c.brandName.eq(businessname),
              c.suggestion.eq(suggestion),
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
          <p className="milestone-update">
            <div className="milestone-title"> {currentMilestone} </div>
            <span className="milestone-businessname"> @{businessname} </span>
            <span className="actual-milestone"> {currentMilestone} </span>
            {/*    <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="share"
                color="rgb(47,47,47)"
              /> */}
            {/* <div className="milestone-suggestion"> */}{" "}
            <span className="milestone-grey"> in response to the </span>
            <span className="actual-milestone-suggestion">{suggestion}</span>
            <span className="actual-milestone"> suggestion</span>
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
          </p>
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
  );
}

export default MilestoneTracker;
