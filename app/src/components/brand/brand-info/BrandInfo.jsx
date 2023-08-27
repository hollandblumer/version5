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
  let link = null;
  return (
    <div className="brand-info">
      <Avatar
        src={url}
        // sx={{ height: "90px", width: "90px" }}
        sx={{ height: "115px", width: "115px" }}
        style={{
          border: "0.4px solid #eeeeee",
        }}
      />
      <div className="brand-info-container">
        <div className="brand-user-follow">
          <div className="username-verified">
            <div className="username"> @{username} </div>
            {verification == false ? (
              <div className="unverified">
                {" "}
                Unclaimed{" "}
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
                color="#aa7950"
                size="lg"
              />{" "}
            </button>

            <button className="user-action-button follow">
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
              Add Location
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
          {link != null ? (
            <div className="info-website">
              {" "}
              <FontAwesomeIcon icon={faLink} size="sm" color="#aa7950" /> Add
              Website
            </div>
          ) : (
            <div className="info-website">
              {" "}
              <FontAwesomeIcon icon={faLink} size="sm" color="#aa7950" /> Add
              Website
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
                  Claim this brand
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    size="sm"
                    color="#8c8c8c"
                    style={{ marginLeft: "1px" }}
                  />
                </button>
              </div>
            </>
          ) : verification === false ? (
            <>
              <div> Added in </div>
              <div className="member-since-date">
                {"  "}
                {formatdate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </div>
              <button>
                Claim this brand{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="sm"
                  color="#8c8c8c"
                  style={{ marginLeft: "1px" }}
                />
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

export default withAuthenticator(BrandInfo);
