import React from "react";
import "../../../styles/user/user-impact/user-impact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
function UserImpact({ user, suggestioncount, brandcount }) {
  return (
    <div className="user-impact">
      {/*       <div className="user-impact-highlight">{suggestioncount} Suggestions</div>{" "}
      <div className="user-impact-highlight">{brandcount} Compliments </div> */}
      <div className="user-impact-award">
        {" "}
        <FontAwesomeIcon icon={faAward} color="#5bab5c" size="8x" />
        <div className="award-text"> 8 Week Streak </div>
      </div>
      <div className="user-impact-award">
        {" "}
        <FontAwesomeIcon icon={faAward} color="#5bab5c" size="8x" />
        <div className="award-text"> First Suggestion</div>
      </div>
      <div className="user-impact-award">
        {" "}
        <FontAwesomeIcon icon={faAward} color="#5bab5c" size="8x" />
        <div className="award-text"> First Compliment </div>
      </div>
    </div>
  );
}

export default UserImpact;
