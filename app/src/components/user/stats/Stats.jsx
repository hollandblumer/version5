import React from "react";
import Soil from "./soil/Soil";
import "../../../styles/user/stats/stats/stats.css";

function Stats({ brandArray, user }) {
  return (
    <div className="stats">
      {/* <nav class="slidemenu">
        <input
          type="radio"
          name="slideItem"
          id="slide-item-1"
          class="slide-toggle"
          checked
        />
        <label for="slide-item-1">
          <span>Soil</span>
        </label>

        <input
          type="radio"
          name="slideItem"
          id="slide-item-2"
          class="slide-toggle"
        />
        <label for="slide-item-2">
          <span>Impact</span>
        </label>

        <div class="clear"></div>

        <div class="slider">
          <div class="bar"></div>
        </div>
      </nav> */}

      <Soil brandArray={brandArray} />
    </div>
  );
}

export default Stats;
