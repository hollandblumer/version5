import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function BrandSize({ size }) {
  return (
    <div>
      {size === 1 ? (
        <div className="info-location">
          <div>
            {" "}
            <div className="info-location">
              <FontAwesomeIcon icon={faUser} />
              <div className="specific-info">
                <div className="city">&lt; 10</div>
                <p className="small-info"> employees</p>
              </div>
            </div>
          </div>
        </div>
      ) : size === 2 ? (
        <div className="info-location">
          <div className="info-location">
            <FontAwesomeIcon icon={faUser} />
            <div className="specific-info">
              <div className="city">10+</div>
              <p className="small-info"> employees</p>
            </div>
          </div>
        </div>
      ) : size === 3 ? (
        <div className="info-location">
          <FontAwesomeIcon icon={faUser} />
          <div className="specific-info">
            <div className="city">1000+</div>
            <p className="small-info"> employees</p>
          </div>
        </div>
      ) : size === 4 ? (
        <div className="info-location">
          <FontAwesomeIcon icon={faUser} />
          <div className="specific-info">
            <div className="city">10000+</div>
            <p className="small-info"> employees</p>
          </div>
        </div>
      ) : (
        <div className="info-location">
          <FontAwesomeIcon icon={faUser} />
          <div className="specific-info">
            <div className="city">Unknown</div>
            <p className="small-info"> employees</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandSize;
