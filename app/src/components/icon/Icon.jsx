import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faLeaf,
  faBoxOpen,
  faCubesStacked,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";

function Icon({ icon }) {
  return (
    <div>
      {icon === "sugar" ? (
        <div>
          <FontAwesomeIcon icon={faCubesStacked} size="sm" color="#5bab5c" />
        </div>
      ) : (
        <div></div>
      )}

      {icon === "package" ? (
        <div>
          <FontAwesomeIcon icon={faBoxOpen} color="#5bab5c" />
        </div>
      ) : (
        <div></div>
      )}

      {icon === "cup" ? (
        <div>
          <FontAwesomeIcon icon={faMugHot} color="#5bab5c" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Icon;
