import React, { useState } from "react";
import Dirt from "../../user/stats/Dirt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faXmarkCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import EditSoil from "./EditSoil";
import EyeIcon from "../../../assets/images/grey-eye.png";
import SleepingAvatars from "../../sleeping-avatars/SleepingAvatars";
import BouncingBalls from "../../BouncingBalls";

function SignedInUserSoil({ brandArray }) {
  const [showEditSoil, setShowEditSoil] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`dirt-container ${brandArray.length === 0 ? "no-brands" : ""}`}
    >
      <div className={`edit-dirt ${brandArray.length === 0 ? "blur" : ""}`}>
        <div className="brand-length">{brandArray.length} BRANDS</div>

        {expanded ? (
          <img
            className="eye-brands-icon"
            src={EyeIcon}
            onClick={() => setExpanded(false)}
          />
        ) : (
          <img
            className="eye-brands-icon"
            src={EyeIcon}
            onClick={() => setExpanded(true)}
          />
        )}
        <div
          onClick={() => setShowEditSoil(true)} // Show the popup on click
          className={`edit-soil-text ${
            brandArray.length === 0 ? "unclickable" : ""
          }`}
        >
          edit
        </div>
      </div>
      <div className="featured-brands-container">
        {brandArray.length === 0 ? (
          <div className="featured-brands">
            {[...Array(5)].map((_, index) => (
              <Dirt key={index} showBlankAvatar={true} />
            ))}
          </div>
        ) : (
          brandArray.map((p, index) => (
            <div className="featured-brands" key={index}>
              <Dirt brand={p} showBlankAvatar={false} />
            </div>
          ))
        )}

        {brandArray.length === 0 ? (
          <div className="lock-icon">
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <FontAwesomeIcon icon={faLock} color="#b7b1a7" size="2x" />
              {hovered && brandArray.length === 0 && (
                <span className="hover-text">
                  This user does not have featured brands or is private
                </span>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {expanded &&
        brandArray.length > 7 &&
        brandArray.slice(7).map((p, index) => (
          <div className="featured-brands" key={index}>
            <Dirt brand={p} showBlankAvatar={false} />
          </div>
        ))}

      {expanded && brandArray.length < 8 && (
        <div className="featured-brands">
          User has no brands {console.log("made it")}
        </div>
      )}

      {showEditSoil && (
        <div className="edit-soil">
          <button
            className="exit-edit-soil"
            onClick={() => setShowEditSoil(false)}
          >
            <FontAwesomeIcon icon={faXmarkCircle} color="white" />
          </button>
          <EditSoil brandArray={brandArray} />
        </div>
      )}
    </div>
  );
}

export default SignedInUserSoil;
