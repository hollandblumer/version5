import React, { useState } from "react";
import Dirt from "./Dirt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faLock,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import EditSoil from "./EditSoil";

function Soil({ brandArray }) {
  const [showEditSoil, setShowEditSoil] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`dirt-container ${brandArray.length === 0 ? "no-brands" : ""}`}
    >
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

      <div className={`more-dirt ${brandArray.length === 0 ? "blur" : ""}`}>
        <FontAwesomeIcon
          icon={faEllipsis}
          className={`share ${brandArray.length === 0 ? "unclickable" : ""}`}
          color="white"
          size="1x"
        />
      </div>

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

export default Soil;
