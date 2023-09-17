import React from "react";
import "../../../styles/user/dashboard/user-dashboard.css";
import "../../../styles/user/info/info.css";
import Avatar from "@mui/material/Avatar";
import Follower from "../../follower/Follower";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faLocationDot,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import InfoSettings from "./InfoSettings";

function SignedInUserInfo({
  user,
  url,
  suggestionCount,
  complimentCount,
  brandcount,
  createdAt,
  location,
  bio,
}) {
  const joinDate = new Date(createdAt); // Convert the createdAt string to a Date object
  const monthAbbreviation = joinDate.toLocaleString("default", {
    month: "short", // Use "short" for abbreviated month names
  });
  const joinYear = joinDate.getFullYear();
  const joinMonthYear = `${monthAbbreviation} ${joinYear}`;

  return (
    <div className="info">
      <div className="profile">
        <Avatar
          src={url}
          // sx={{ height: "100px", width: "100px" }}
          sx={{ height: "120px", width: "120px" }}
          style={{
            border: "1px solid white",
          }}
        />
        <div className="profile-info">
          <div className="row flex-start">
            <div className="username-badge">
              <div className="username"> @{user} </div>
              <div className="left">
                {/* <FontAwesomeIcon icon={faTree} size="small" color="#5bab5c" /> */}
              </div>
            </div>
            <div className="action-buttons">
              <div className="info-share">
                <InfoSettings />
                {/* <Follower signedInUser={user} /> */}
                {/*  <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  color="#5c5848"
                />{" "} */}
              </div>
              {/*    <button className="info-share">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="1x"
                  color="#5c5848"
                />{" "}
              </button> */}
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
                <div className="bio-emphasis left">{suggestionCount}</div>{" "}
                <div className="grey left">Suggestions</div>{" "}
              </div>
              <div className="cell left">
                {" "}
                <div className="bio-emphasis left">{complimentCount}</div>{" "}
                <div className="grey left">Compliments</div>{" "}
              </div>
              <div className="cell left">
                {" "}
                <div className="bio-emphasis left">0</div>{" "}
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
            {location == "" ? (
              <></>
            ) : (
              <div className="location-row">
                <div className="location">
                  {/* <div className="grey bio">{bio}</div> */}
                  <FontAwesomeIcon icon={faLocationDot} size="sm" />
                  <div className="grey left">{location}</div>
                </div>
              </div>
            )}
            <div className="member-since">
              {" "}
              <div className="grey right">Member since</div>{" "}
              <div className="bio-emphasis left">{joinMonthYear}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignedInUserInfo;
