import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faCircleCheck,
  faCircleQuestion,
  faArrowUpRightFromSquare,
  faEllipsis,
  faEnvelope,
  faIndustry,
  faBuilding,
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
      <Avatar
        src={url}
        // sx={{ height: "90px", width: "90px" }}
        sx={{ height: "120px", width: "120px" }}
        style={{
          border: "0.1px solid #eeeeee",
        }}
      />
      <div className="brand-info-container">
        <div className="brand-user-follow">
          <div className="username-verified">
            <div className="username"> @{username} </div>
            {verification === null ? (
              <div className="unverified">
                {" "}
                unverified{" "}
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
              </>
            )}
          </div>

          <div className="brand-action-buttons">
            <button className="user-action-button follow"> Follow </button>

            <FontAwesomeIcon
              icon={faEllipsis}
              className="share"
              color="#5c5848"
              size="xl"
            />
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
              <FontAwesomeIcon icon={faCompass} size="sm" color="#b7b1a7" />{" "}
              {location}
            </div>
          ) : (
            <div className="info-location">
              <FontAwesomeIcon icon={faCompass} size="sm" color="#b7b1a7" /> Add
              Location
            </div>
          )}

          {industry == null ? (
            <div className="industry-row">
              <>
                {" "}
                <FontAwesomeIcon
                  icon={faBuilding}
                  size="sm"
                  color="#b7b1a7"
                />{" "}
                Add Industry
              </>
            </div>
          ) : (
            <div className="industry-row">
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
              <div className="grey">Member since </div>
              <div className=" member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </div>
            </>
          ) : verification === false ? (
            <>
              <div> Unverified Member since </div>
              <div className="member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </div>
            </>
          ) : (
            <>
              <div>Unverified Member since{"  "} </div>
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

export default withAuthenticator(BrandInfo);
