import { React, useState, useEffect } from "react";
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
  faArrowUpRightFromSquare,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import AvatarDesign from "../../../assets/images/avatar-design-5.png";
import "../../../styles/brand/info/brand-info.css";
import GradientHexagon from "../../../assets/images/header-blob-2.svg";
import LinkIcon from "../../../assets/images/link-icon.svg";
import IconGenerator from "../icon/IconGenerator";
import BrandSize from "../size/BrandSize";
import Tree from "../../../assets/images/subsidiary.png";
import SisterBrands from "../../../assets/images/sister-brands.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import { useClipboard } from "use-clipboard-copy";

function BrandInfo({
  url,
  username,
  location,
  parentBrand,
  date,
  industry,
  verification,
  size,
  city,
  state,
  country,
}) {
  let formatdate = new Date(date);
  let link = null;
  const [reportReason, setReportReason] = useState("");
  const [isProfileCopied, setIsProfileCopied] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const clipboard = useClipboard();

  const handleCopyToClipboard = () => {
    clipboard.copy(shareText);
    setIsProfileCopied(true); // Set state to true after successful copy
  };

  useEffect(() => {
    return () => {
      setIsProfileCopied(false);
    };
  }, []);

  const shareText = `Check out ${username} on Divot. ${window.location.href}`;

  const handleReportProfile = () => {
    const subject = `Report ${username}'s Profile`;
    const body = `If there is a specific reason for reporting ${username}, please let us know below:\n\n`;

    // Construct the mailto link
    const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

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
        </div>
      </div>
      <div className="brand-info-container">
        <div className="brand-user-follow">
          <div className="username-verified">
            <div className="username"> {username} </div>
            {verification == false ? (
              <div className="unverified">
                {" "}
                unclaimed{" "}
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
              <Link to="/sign-in">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="share"
                  color="#007AFF"
                />{" "}
              </Link>
            </button>

            <button className="user-action-ellipsis" onClick={togglePopup}>
              <FontAwesomeIcon
                icon={faEllipsis}
                className="share"
                color="#8c8577"
                size="lg"
              />
            </button>

            {isPopupVisible && (
              <div className="ellipsis-popup-menu">
                <div className="ellipsis-popup-header">
                  <i>Share to</i>
                  <button onClick={togglePopup}>
                    <FontAwesomeIcon icon={faX} size="xs" color="ffffff" />
                  </button>
                </div>
                <CopyToClipboard
                  text={shareText}
                  onCopy={handleCopyToClipboard}
                >
                  <button disabled={isProfileCopied}>
                    {isProfileCopied ? "Copied!" : "Copy Profile"}
                  </button>
                </CopyToClipboard>

                {/* Use react-share for social media sharing */}
                <FacebookShareButton
                  url={window.location.href}
                  quote={`Check out ${username} on Divot.`}
                >
                  <button>Share on Facebook</button>
                </FacebookShareButton>

                <TwitterShareButton
                  url={window.location.href}
                  title={`Check out ${username} on Divot.`}
                >
                  <button>Share on Twitter</button>
                </TwitterShareButton>

                <button onClick={handleReportProfile}>Report Profile</button>
              </div>
            )}
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
          <div className="info-location">
            <FontAwesomeIcon icon={faCompass} size="lg" color="#939392" />{" "}
            <div className="specific-info">
              <div className="city">{city}</div>
              <p className="small-info"> {country}</p>
            </div>
          </div>

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
            <div className="info-location">
              {" "}
              <IconGenerator industry={industry} />
              <div className="specific-info">
                <div className="city">{industry}</div>
                <p className="small-info"> industry</p>
              </div>
            </div>
          )}
        </div>

        {/* {link != null ? (
          <div className="info-website">
            {" "}
            <FontAwesomeIcon icon={faLink} size="sm" color="#aa7950" />
            Link
          </div>
        ) : (
          <div className="info-website">
            {" "}
            <img src={LinkIcon} className="link-icon" />
            Link
          </div>
        )} */}
        <div className="row">
          <BrandSize size={size} />
          {/* <img src={LinkIcon} className="link-icon" /> */}
          {/*   <div className="info-location">
            {" "}
            <img src={SisterBrands} className="tree-icon" />
            <div className="specific-info">
              {" "}
              <div className="city right">
                <p> 3 subsidiaries</p>
              </div>
            </div>
            <div className="city right">
              <p> 4 sibling brands</p>
            </div>
          </div>{" "} */}
          {/*      <div className="specific-info">
            <div className="row"> </div>
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
          )} */}
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
                  <Link to="/claim-brand">
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
                  </Link>
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
                <Link to="/claim-brand">
                  <button>
                    Claim brand{" "}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      size="sm"
                      color="#ffffff"
                      style={{ marginLeft: "1px" }}
                    />{" "}
                  </button>
                </Link>
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
    </div>
  );
}

export default BrandInfo;
