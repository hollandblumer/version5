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

function MilestoneTracker({
  suggestion,
  businessname,
  index,
  currentMilestone,
  url,
}) {
  const [milestones, setMilestones] = useState([]);
  const [icon, setIcon] = useState();
  console.log("bname", businessname);

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

        const icon = await DataStore.query(Suggestion, (p) =>
          p.suggestion.eq(suggestion)
        );
        setIcon(icon[0].icon);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {milestones.length > 0 ? (
        <div>
          <div className="milestone-subtle-suggestion-info">
            <div>03/01/2023</div> <div>{suggestion}</div>
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
            <span className="milestone-businessname"> @{businessname} </span>
            <span className="actual-milestone"> {currentMilestone} </span>
            {/*    <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="share"
                color="rgb(47,47,47)"
              /> */}
            {/* <div className="milestone-suggestion"> */}{" "}
            <span className="milestone-grey"> in response to the </span>
            <span className="actual-milestone-suggestion">
              {suggestion} project
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
          </p>
          <div className="see-more-milestone"> see more </div>
          <div className="milestone-follower-container">
            <div className="milestone-counter-line">
              <div>{milestones.length}</div>{" "}
              {milestones.length == 1 ? (
                <div className="left">milestone</div>
              ) : (
                <div className="left">
                  milestones{" "}
                  {/*   <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="share"
                    color="#8e8e8e"
                  />{" "} */}
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
          </div>
        </div>
      ) : (
        <div className="text">Not started</div>
      )}
    </div>
  );
}

export default MilestoneTracker;
