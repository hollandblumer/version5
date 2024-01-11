import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faCircleCheck,
  faCircleQuestion,
  faEllipsis,
  faUserPlus,
  faLink,
  faArrowUpRightFromSquare,
  faBed,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import AvatarDesign from "../../../assets/images/avatar-design-5.png";
import "../../../styles/brand/info/brand-info.css";
import GradientHexagon from "../../../assets/images/header-blob-2.svg";
import LinkIcon from "../../../assets/images/link-icon.svg";
function BrandInfo({
  url,
  username,
  location,
  parentBrand,
  date,
  industry,
  verification,
  size,
}) {
  let formatdate = new Date(date);
  let link = null;

  let icon =
    industry === "food"
      ? faUtensils
      : industry === "Hospitality"
      ? faBed
      : null;

  return (
    <div className="brand-info">
      <div className="info-avatar-wrapper">
        {/*  <img
          src={AvatarDesign}
          alt="Avatar Background"
          className="avatar-background"
        /> */}
        {/*  <Avatar
          src={url}
          // sx={{ height: "90px", width: "90px" }}
          sx={{ height: "115px", width: "115px" }}
          style={{
            border: "0.4px solid #eeeeee",
          }}
        /> */}
        {/* <SVGAnimation url={url} /> */}
        <img
          src={GradientHexagon}
          className="hexagon-gradient"
          style={{ opacity: 0.9 }}
        />
        <div className="avatar-background">
          {/*   <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 313 313"
            width="110"
            height="110"
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
          {/*    <Avatar
            src={url}
            // sx={{ height: "90px", width: "90px" }}
            sx={{ height: "110px", width: "110px" }}
            style={{
              border: "0.4px solid #eeeeee",
            }}
          /> */}
          <Avatar
            src={url}
            // sx={{ height: "107px", width: "107px" }}
            className="avatar-icon"
            style={
              {
                // border: "0.4px solid #eeeeee",
              }
            }
          />
          {/*    <svg
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
              x="-15"
              y="-15"
              width="290.12"
              height="300.07"
              clipPath="url(#new-clip-shape)"
            />
          </svg> */}
        </div>
      </div>
      <div className="brand-info-container">
        <div className="brand-user-follow">
          <div className="username-verified">
            <div className="username"> {username} </div>
            {verification == false ? (
              <div className="unverified">
                {" "}
                unverfied{" "}
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  size="sm"
                  color="grey"
                />
              </div>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="sm"
                  color="#5bab5c"
                  style={{ marginLeft: "5px" }}
                />
                Claimed
              </>
            )}
          </div>

          <div className="brand-action-buttons">
            <button className="user-action-button follow">
              {" "}
              <FontAwesomeIcon
                icon={faUserPlus}
                className="share"
                color="#007AFF"
              />{" "}
            </button>

            <button className="user-action-ellipsis">
              <FontAwesomeIcon
                icon={faEllipsis}
                className="share"
                color="#8c8577"
                size="lg"
              />
            </button>
          </div>
        </div>

        {parentBrand == null ? (
          <></>
        ) : (
          <div className="parent-brand-info">
            {" "}
            <div className="grey">part of</div> <b>{parentBrand}</b>
          </div>
        )}

        <div className="detailed-brand-info-row">
          {location ? (
            <div className="info-location">
              <FontAwesomeIcon
                icon={faCompass}
                size="sm"
                color="#aa7950"
                style={{ marginRight: "5px" }}
              />{" "}
              {location}
            </div>
          ) : (
            <div className="info-location">
              <FontAwesomeIcon
                icon={faCompass}
                size="sm"
                color="#aa7950"
                style={{ marginRight: "5px" }}
              />{" "}
              SC
            </div>
          )}

          {industry == null ? (
            <div className="industry-row">
              {/*   <>
                {" "}
                <FontAwesomeIcon
                  icon={faBuilding}
                  size="sm"
                  color="#b7b1a7"
                />{" "}
                Add Industry
              </> */}
            </div>
          ) : (
            <div className="industry-row">
              {" "}
              {icon && (
                <FontAwesomeIcon icon={icon} size="sm" color="#aa7950" />
              )}
              <div className="left">{industry}</div>
            </div>
          )}

          {/*   {size == 1 ? (
            <div className="row flex-start">
              <div>
                {" "}
                <b> </b>
              </div>
            </div>
          ) : size == 2 ? (
            <div className="row flex-start">
              <div>
                {" "}
                <b>{industry}</b> Industry
              </div>
            </div>
          ) : size == 3 ? (
            <div>
              {" "}
              <b>{industry}</b> Industry
            </div>
          ) : size == 4 ? (
            <div></div>
          ) : (
            <div className="row flex-start">
              {" "}
              {username == "starbucks" ? (
                <div>
                  <b>  1000+</b>{" "}
                  <div className="grey left"> Employees</div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )} */}
          {link != null ? (
            <div className="info-website">
              {" "}
              <FontAwesomeIcon icon={faLink} size="sm" color="#aa7950" />
              Link
            </div>
          ) : (
            <div className="info-website">
              {" "}
              {/* <FontAwesomeIcon icon={faLink} size="sm" color="#aa7950" /> */}
              <img src={LinkIcon} className="link-icon" />
            </div>
          )}
        </div>

        {parentBrand != null ? (
          <div className="row flex-start">
            {" "}
            Part of{" "}
            <Link to={`/${parentBrand}`} replace className="parent-brand">
              <div className="username left">{parentBrand}</div>{" "}
            </Link>
          </div>
        ) : (
          <div></div>
        )}

        <div className="member-since">
          {verification === null ? (
            <>
              {" "}
              <div className="grey">Added in </div>
              <div className=" member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
                <button>
                  Claim brand
                  {/*  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    size="sm"
                    color="#8c8c8c"
                    style={{ marginLeft: "1px" }}
                  /> pretty color grey */}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    size="sm"
                    color="#ffffff"
                    style={{ marginLeft: "1px" }}
                  />
                </button>
              </div>
            </>
          ) : verification === false ? (
            <>
              {/*  <div> Added in </div>
              <div className="member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "numeric",
                })}
              </div> */}
              <button>
                Claim brand{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="sm"
                  color="#ffffff"
                  style={{ marginLeft: "1px" }}
                />{" "}
              </button>
            </>
          ) : (
            <>
              <div> Member since{"  "} </div>
              <div className="member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandInfo;
