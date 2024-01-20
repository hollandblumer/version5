import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faUtensils, faLaptop } from "@fortawesome/free-solid-svg-icons";

function IconGenerator({ industry }) {
  // Convert both icons to lowercase for case-insensitive comparison
  const lowerCaseIcon = industry.toLowerCase();
  const fastFoodIcon = "fast food";
  const restaurantIcon = "restaurant";
  const hospitalityIcon = "hospitality";
  const technologyIcon = "technology";

  // Check if the provided icon matches the target icon
  return (
    <div>
      {lowerCaseIcon === fastFoodIcon && <FontAwesomeIcon icon={faUtensils} />}
      {lowerCaseIcon === restaurantIcon && (
        <FontAwesomeIcon icon={faUtensils} />
      )}
      {lowerCaseIcon === technologyIcon && <FontAwesomeIcon icon={faLaptop} />}
      {lowerCaseIcon === hospitalityIcon && <FontAwesomeIcon icon={faBed} />}
    </div>
  );
}

export default IconGenerator;
