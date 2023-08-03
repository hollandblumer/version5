import { useState, useEffect, React } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Milestone, Suggestion } from "../../models";
import "../../styles/brand/milestone/milestone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function MilestoneTracker({ suggestion, businessname, index }) {
  const [milestones, setMilestones] = useState([]);
  const [icon, setIcon] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [
            c.brandName.eq(businessname),
            c.suggestion.eq(suggestion),
          ])
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
        <div className="milestone-counter">
          {milestones.length}{" "}
          {milestones.length == 1 ? <div>milestone</div> : <>milestones</>}
        </div>
      ) : (
        <div className="text">Not started</div>
      )}
    </div>
  );
}

export default MilestoneTracker;
