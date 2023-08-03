import React from "react";
import "../../../styles/user/dashboard/profile.css";
import "../../../styles/user/info/info.css";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faLocationDot,
  faCircleCheck,
  faArrowUpRightFromSquare,
  faEnvelope,
  faAward,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

function Info({ user, url, suggestioncount, brandcount, location, bio }) {
  return (
    <div className="info">
      <div className="profile">
        <Avatar
          src={url}
          // sx={{ height: "100px", width: "100px" }}
          sx={{ height: "120px", width: "120px" }}
          style={{
            border: "0.1px solid #eeeeee",
          }}
        />
        <div className="profile-info">
          <div className="row flex-start">
            <div className="username-badge">
              <div className="username"> @{user} </div>
              <div className="left">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="sm"
                  color="#5bab5c"
                />
                {/* <FontAwesomeIcon icon={faTree} size="small" color="#5bab5c" /> */}
              </div>
            </div>
            <div className="action-buttons">
              <button className="user-action-button follow"> Follow </button>
              <button className="info-share">
                {" "}
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  color="#5c5848"
                />{" "}
              </button>
              <button className="info-share">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="1x"
                  color="#5c5848"
                />{" "}
              </button>
              <button className="info-share">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="share"
                  color="#5c5848"
                  size="xl"
                />
              </button>
            </div>
          </div>

          <div className="other-user-info">
            <div className="user-info-row">
              <div className="cell">
                {" "}
                <div className="bio-emphasis">{suggestioncount}</div>{" "}
                <div className="grey left">Suggestions</div>{" "}
              </div>
              <div className="cell">
                {" "}
                <div className="bio-emphasis">2</div>{" "}
                <div className="grey left">Compliments</div>{" "}
              </div>
              <div className="cell">
                {" "}
                <div className="bio-emphasis">3</div>{" "}
                <div className="grey left">Awards</div>{" "}
                {/*   <div className="strength">
                  {" "}
                  <div className="light green"> </div>
                  <div className="light green"> </div>
                  <div className="light green"> </div>
                  <div className="light green"> </div>
                  <div className="light light-grey"> </div>
                </div>{" "}
                <div className="left"> Strength </div> */}
              </div>

              {/* <div className="username">#</div>{" "} */}
            </div>
            <div className="location-row">
              <div className="location">
                {/* <div className="grey bio">{bio}</div> */}
                <FontAwesomeIcon icon={faLocationDot} size="sm" />
                <div className="grey left">{location}</div>
              </div>
              <div className="member-since">
                {" "}
                <div className="grey">Member since</div>{" "}
                <div className="bio-emphasis">Dec 2022</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*   <div className="info-container">
        <div className="row">
          <div className="cell">
            {" "}
            <div className="username">{suggestioncount}</div>{" "}
            <div className="grey left">Suggestions</div>{" "}
          </div>

          <div className="cell">
            {" "}
            <div className="username">Strength</div>{" "}
            <div className="strength">
              {" "}
              <div className="light green"> </div>
              <div className="light green"> </div>
              <div className="light green"> </div>
              <div className="light green"> </div>
              <div className="light white"> </div>
            </div>{" "}
          </div>
          <div className="cell">
            {" "}
            <div className="username">2</div>{" "}
            <div className="grey left">Compliments</div>{" "}
          </div>
        </div>
        <div className="row">
          <div className="cell">
            {" "}
            <div className="username">Daily</div>
            <div className="grey left">Activity</div>
          </div>
          <div className="cell">
            <div className="username">Supports</div>
            <div className="grey left">{brandcount} brands</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Info;
