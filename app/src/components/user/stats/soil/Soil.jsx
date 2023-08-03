import React, { useState } from "react";

import Dirt from "./Dirt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import EditSoil from "./EditSoil";

function Soil({ brandArray }) {
  const [showEditSoil, setShowEditSoil] = useState(false);

  let maxBrandsArray = [];

  return (
    <div className="dirt-container">
      {/* <div className="featured-brands">Featured Brands</div> */}
      <div className="dirt-content">
        {brandArray.map((p, index) => (
          <div key={index}>
            {maxBrandsArray.length < 8 ? (
              <div>
                <Dirt brand={p} />

                {maxBrandsArray.push(p).hide}
              </div>
            ) : (
              <div>{maxBrandsArray.push(p).hide}</div>
            )}
          </div>
        ))}

        {showEditSoil ? (
          <div className="edit-soil">
            <button
              className="exit-edit-soil"
              onClick={() => setShowEditSoil(false)}
            >
              <FontAwesomeIcon icon={faXmarkCircle} color="white" />
            </button>
            <EditSoil brandArray={brandArray} />
          </div>
        ) : (
          <div></div>
        )}
        <div className="more-dirt">
          <FontAwesomeIcon
            icon={faEllipsis}
            className="share"
            color="white"
            size="1x"
          />
        </div>
      </div>
    </div>
  );
}

export default Soil;
