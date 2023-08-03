import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleCheck,
  faIndustry,
  faCircleQuestion,
  faArrowUpRightFromSquare,
  faEllipsis,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "../../../styles/brand/info/brand-info.css";

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

  return (
    <div className="brand-info">
      <div className="brand-profile">
        <Avatar
          src={url}
          // sx={{ height: "90px", width: "90px" }}
          sx={{ height: "120px", width: "120px" }}
          style={{
            border: "0.1px solid #eeeeee",
          }}
        />
        <div className="brand-profile-info">
          <div className="brand-user-follow">
            <div className="username"> @{username} </div>
            <div className="left">
              {verification ? (
                <div className="right">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="sm"
                    color="#37252C"
                  />
                </div>
              ) : (
                <div className="unverified">
                  unverified{" "}
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    size="sm"
                    color="grey"
                  />
                </div>
              )}{" "}
            </div>

            <div className="brand-action-buttons">
              <button className="user-action-button follow"> Follow </button>
              <button className="info-share">
                <FontAwesomeIcon icon={faEnvelope} size="lg" color="#5c5848" />{" "}
              </button>
              <button className="info-share">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="1x"
                  color="#5c5848"
                />{" "}
              </button>

              <FontAwesomeIcon
                icon={faEllipsis}
                className="share"
                color="#5c5848"
                size="xl"
              />
            </div>
          </div>

          <div className="detailed-brand-info">
            {parentBrand == null ? (
              <div className="brand-name">
                <b>{username}</b>
              </div>
            ) : (
              <div className="parent-brand-info">
                {" "}
                <div className="grey">part of</div> <b>{parentBrand}</b>
              </div>
            )}
            <div className="detailed-brand-info-row">
              <div className="location">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="sm"
                  color="#37252C"
                />
                <div className="grey left">{location}</div>
              </div>

              {industry == "" ? (
                <div></div>
              ) : (
                <div className="row flex-start">
                  {" "}
                  <b>{industry}</b> <div className="grey left"> Industry </div>
                </div>
              )}

              {size == 1 ? (
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
                      <b> {/* &lt;20 */} 1000+</b>{" "}
                      <div className="grey left"> Employees</div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </div>

            {parentBrand == "" ? (
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

            <div className="member-since-row">
              {verification ? (
                <div>
                  {" "}
                  <div className="grey">Member since </div>
                  <b>
                    {formatdate.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                    })}
                  </b>
                </div>
              ) : (
                <div row flex-start>
                  <div>
                    {" "}
                    <b>Brand unverified </b> Claim this brand{" "}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      size="xs"
                      color="#5c5848"
                    />{" "}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(BrandInfo);
