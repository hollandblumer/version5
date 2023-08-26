import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { User, UserSuggestion, Milestone } from "../../models";
import { Storage } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SuggestionToBrand from "./SuggestionToBrand";

function TopCharts() {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [brandSize, setBrandSize] = useState(0);
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandData = await DataStore.query(User, (p) => p.name.eq(name));
        setVerification(brandData[0].isVerified);

        const suggestions = await DataStore.query(
          UserSuggestion,
          (p) => p.suggestion.businessName.eq(name),
          { sort: (s) => s.createdAt(SortDirection.ASCENDING) }
        );

        const suggestionValues = await Promise.all(
          suggestions.map((p) => p.suggestion)
        );
        setSuggestions(suggestionValues);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const seenSuggestions = new Set();
  let count = 0;

  return (
    <div className="top-charts">
      <div className="top-charts-title-sort">
        <h3> Top Charts</h3>
        <div className="sort-by">
          <div>sort by</div>
          <select className="sort-select">
            <option>
              All{" "}
              <FontAwesomeIcon icon={faCaretDown} size="xs" color="#5c5848" />{" "}
            </option>
          </select>
        </div>
      </div>
      <div className="top-suggestions-box">
        {suggestions.map((p, index) => (
          <div key={p.id}>
            {seenSuggestions.has(p.suggestion) ? (
              <></>
            ) : (
              <div>
                {(count++).hide}
                <SuggestionToBrand
                  suggestion={p.suggestion}
                  iscompliment={p.compliment}
                  businessname={p.businessName}
                  counter={count}
                />

                {seenSuggestions.add(p.suggestion).hide}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCharts;
