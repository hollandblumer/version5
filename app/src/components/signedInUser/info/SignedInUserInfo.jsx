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
import faint from "../../../assets/images/faintbackground.png";
import AvatarDesign from "../../../assets/images/avatar-design-8.png";
import BlobAnimation from "../../blob-avatar/BlobAnimation";
import WavyBrown from "../../../assets/images/wavy-clipping-mask-brown.svg";
import HexagonGradient from "../../../assets/images/hexagon-gradient.svg";
import GradientHexagon from "../../../assets/images/header-blob-2.svg";

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
        <div className="info-avatar-wrapper">
          {/* <SVGAnimation url={url} /> */}

          <img
            src={GradientHexagon}
            className="hexagon-gradient"
            style={{ opacity: 0.9 }}
          />

          <div className="avatar-background">
            <Avatar
              src={url}
              sx={{ height: "107px", width: "107px" }}
              style={{}}
            />
            {/*             <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="260"
              zoomAndPan="magnify"
              viewBox="0 0 810 810"
              height="280"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
            >
              <defs>
                <clipPath id="new-clip-shape">
                  <path d="M 246.91211 126.289063 C 246.91211 126.289063 195.433594 137.007812 148.853516 190.121094 C 102.271484 243.238281 113.728516 269.048828 108.140625 322.59375 C 103.425781 367.923828 128.425781 411.164062 153.179688 429.958984 C 177.929688 448.753906 204.396484 490.673828 290.1875 492.960938 C 384.175781 495.601562 445.716797 438.695312 463.671875 391.369141 C 480.609375 346.035156 502.742188 296.033203 480.865234 256.955078 C 459.996094 219.884766 467.966797 181.160156 433.613281 163.966797 C 399.257812 146.773438 367.044922 125.666031 332.392578 119.914062 C 282.355469 110.525391 246.91211 126.289063 246.91211 126.289063 Z" />
                </clipPath>
              </defs>
              <image
                xlinkHref={url}
                x="90"
                y="80"
                width="420"
                height="450"
                clipPath="url(#new-clip-shape)"
              />
              <path
                d="M 246.91211 126.289063 C 246.91211 126.289063 195.433594 137.007812 148.853516 190.121094 C 102.271484 243.238281 113.728516 269.048828 108.140625 322.59375 C 103.425781 367.923828 128.425781 411.164062 153.179688 429.958984 C 177.929688 448.753906 204.396484 490.673828 290.1875 492.960938 C 384.175781 495.601562 445.716797 438.695312 463.671875 391.369141 C 480.609375 346.035156 502.742188 296.033203 480.865234 256.955078 C 459.996094 219.884766 467.966797 181.160156 433.613281 163.966797 C 399.257812 146.773438 367.044922 125.666031 332.392578 119.914062 C 282.355469 110.525391 246.91211 126.289063 246.91211 126.289063 Z"
                fill="none"
                stroke="rgb(204, 204, 204)"
                strokeWidth="2"
              />
            </svg> */}

            {/*    <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 270.12 263.07"
              width="115"
              height="115"
            >
              <defs>
                <clipPath id="new-clip-shape">
                  <path d="m234.46,45.03l24.29,43.15c15.16,26.92,15.16,59.8,0,86.73l-24.29,43.15c-15.66,27.82-45.1,45.03-77.02,45.03h-44.76c-31.92,0-61.36-17.21-77.02-45.03l-24.29-43.15c-15.16-26.92-15.16-59.8,0-86.73l24.29-43.15C51.32,17.21,80.76,0,112.68,0h44.76c31.92,0,61.36,17.21,77.02,45.03Z" />
                </clipPath>
              </defs>
              <image
                xlinkHref={url}
                x="-15"
                y="0"
                width="290.12"
                height="300.07"
                clipPath="url(#new-clip-shape)"
              />
            </svg> */}
            {/*   <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 270.12 263.07"
              width="114"
              height="114"
            >
              <defs>
                <clipPath id="new-clip-shape">
                  <path d="m234.46,45.03l24.29,43.15c15.16,26.92,15.16,59.8,0,86.73l-24.29,43.15c-15.66,27.82-45.1,45.03-77.02,45.03h-44.76c-31.92,0-61.36-17.21-77.02-45.03l-24.29-43.15c-15.16-26.92-15.16-59.8,0-86.73l24.29-43.15C51.32,17.21,80.76,0,112.68,0h44.76c31.92,0,61.36,17.21,77.02,45.03Z" />
                </clipPath>
              </defs>
              <image
                xlinkHref={url}
                x="-20"
                y="-15"
                width="290.12"
                height="300.07"
                clipPath="url(#new-clip-shape)"
              />
            </svg> */}
            {/*   <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 313 313"
              width="120"
              height="120"
            >
              <defs>
                <clipPath id="new-clip-shape">
                  <path d="m184.39,299.57l-92.1-12.81c-22.66-3.15-41.99-18.01-50.86-39.1L5.39,161.94C-3.65,140.44-.45,115.74,13.77,97.26L68.83,25.65C83.04,7.16,106.09-2.27,129.19,.94l92.1,12.81c22.66,3.15,41.99,18.01,50.86,39.1l36.04,85.72c9.04,21.5,5.84,46.19-8.37,64.68l-55.06,71.61c-14.22,18.49-37.26,27.92-60.36,24.71Z" />
                </clipPath>
              </defs>
              <image
                xlinkHref={url}
                x="-3" // A slight offset to center better
                y="-3" // A slight offset to center better
                width="320" // Adjusted to match the viewBox dimensions
                height="320" // Adjusted to match the viewBox dimensions
                clipPath="url(#new-clip-shape)"
              />
            </svg> */}
          </div>
          {/*  <img
            src={AvatarDesign}
            alt="Avatar Background"
            className="avatar-background"
          /> 

          <Avatar
            src={url}
            // sx={{ height: "100px", width: "100px" }}
            sx={{
              height: "110px",
              width: "110px",
              backgroundColor: "transparent",
              // Add a shadow with the #aa7950 color
            }}
            style={{
              border: "1px solid white",
            }}
          />*/}
          {/* <BlobAnimation url={url} /> */}
        </div>
        <div className="profile-info">
          <div className="row flex-start">
            <div className="username-badge">
              <div className="username"> {user} </div>
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
                  color="#8c8577"
                  size="lg"
                />
              </button>
            </div>
          </div>

          <div className="other-user-info">
            <div className="user-info-row">
              <div className="cell">
                {" "}
                <div className="bio-emphasis">{suggestionCount}</div>{" "}
                <div className="bio-emphasis-text left">Suggestions</div>{" "}
              </div>
              <div className="cell left">
                {" "}
                <div className="bio-emphasis left">{complimentCount}</div>{" "}
                <div className="bio-emphasis-text left">Compliments</div>{" "}
              </div>
              <div className="cell left">
                {" "}
                <div className="bio-emphasis left">0</div>{" "}
                <div className="bio-emphasis-text left">Awards</div>{" "}
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
              <div className="bio-emphasis-text">Member since</div>{" "}
              <div className="member-since-date-user">{joinMonthYear}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignedInUserInfo;
