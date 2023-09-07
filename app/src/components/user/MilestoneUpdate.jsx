import { useState, useEffect, React } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Milestone } from "../../models";
import "../../styles/brand/milestone/milestone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function MilestoneUpdate({ suggestion, businessname, suggestionID }) {
  const [milestones, setMilestones] = useState([]);
  const [icon, setIcon] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const milestones = await DataStore.query(Milestone, (c) =>
          c.and((c) => [
            c.brandName.eq(businessname),
            c.suggestionID.eq(suggestionID),
          ])
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

export default MilestoneUpdate;
