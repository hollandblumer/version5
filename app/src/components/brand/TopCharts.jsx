import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { User, Suggestion } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import SuggestionToBrand from "./SuggestionToBrand";

function TopCharts() {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [verification, setVerification] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const seenSuggestions = new Set();
  let count = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandData = await DataStore.query(User, (p) => p.name.eq(name));
        setVerification(brandData[0].isVerified);

        const suggestions = await DataStore.query(
          Suggestion,
          (p) => p.businessName.eq(name),
          { sort: (s) => s.createdAt(SortDirection.ASCENDING) }
        );

        setSuggestions(suggestions);
        seenSuggestions.clear();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [name]);

  const filterSuggestionsBySearch = () => {
    return suggestions.filter((suggestion) => {
      if (selectedFilter === "All") {
        return suggestion.suggestion
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (selectedFilter === "Suggestions") {
        return (
          !suggestion.compliment &&
          suggestion.suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (selectedFilter === "Compliments") {
        return (
          suggestion.compliment &&
          suggestion.suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    });
  };

  return (
    <div className="top-charts">
      <div className="top-charts-title-sort">
        <h3> Trending </h3>
      </div>
      <div className="trending-filter-buttons">
        <button
          onClick={() => setSelectedFilter("All")}
          className={selectedFilter === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter("Suggestions")}
          className={selectedFilter === "Suggestions" ? "active" : ""}
        >
          Suggestions
        </button>
        <button
          onClick={() => setSelectedFilter("Compliments")}
          className={selectedFilter === "Compliments" ? "active" : ""}
        >
          Compliments
        </button>
        <div className="search-container">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            color="#b7b1a7"
            onClick={() => setShowSearchInput(!showSearchInput)}
          />
        </div>
      </div>
      <div className="top-suggestions-box">
        {filterSuggestionsBySearch().length === 0 ? (
          <div className="no-results-message">No search results, add it</div>
        ) : (
          filterSuggestionsBySearch().map((p, index) => {
            count = index + 1;
            if (!seenSuggestions.has(p.suggestion)) {
              seenSuggestions.add(p.suggestion);

              return (
                <div key={p.id}>
                  <SuggestionToBrand
                    suggestion={p.suggestion}
                    iscompliment={p.compliment}
                    businessname={p.businessName}
                    counter={count}
                    actualindex={index}
                  />
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </div>
  );
}

export default TopCharts;
