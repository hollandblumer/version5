import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { User, Suggestion, UserSuggestion } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import SuggestionToBrand from "./SuggestionToBrand";

function TopCharts({ thisID, initialSearchTerm, email }) {
  const { name } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [verification, setVerification] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const seenSuggestions = new Set();
  let count = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandData = await DataStore.query(User, (p) => p.name.eq(name));
        setVerification(brandData[0].isVerified);

        const suggestions = await DataStore.query(Suggestion, (p) =>
          p.businessName.eq(name)
        );

        const suggestionsWithUserCount = await Promise.all(
          suggestions.map(async (suggestion) => {
            const users = await DataStore.query(UserSuggestion, (us) =>
              us.suggestion.id.eq(suggestion.id)
            );
            return { ...suggestion, userCount: users.length };
          })
        );

        const sortedSuggestions = suggestionsWithUserCount.sort((a, b) => {
          if (b.userCount !== a.userCount) {
            // Sort by user count in descending order
            return b.userCount - a.userCount;
          } else {
            // If user counts are the same, sort by createdAt in ascending order
            return a.createdAt - b.createdAt;
          }
        });
        setSuggestions(sortedSuggestions);
        seenSuggestions.clear();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [name, initialSearchTerm]);

  useEffect(() => {
    // Update searchTerm whenever initialSearchTerm changes
    setSearchTerm(initialSearchTerm || "");
  }, [initialSearchTerm]);

  const filterSuggestionsBySearch = () => {
    const lowerCaseSearchTerm = String(searchTerm).toLowerCase();

    return suggestions.filter((suggestion) => {
      if (selectedFilter === "All") {
        return (
          lowerCaseSearchTerm === "" ||
          suggestion.suggestion.toLowerCase().includes(lowerCaseSearchTerm)
        );
      } else if (selectedFilter === "Suggestions") {
        return (
          !suggestion.compliment &&
          (lowerCaseSearchTerm === "" ||
            suggestion.suggestion.toLowerCase().includes(lowerCaseSearchTerm))
        );
      } else if (selectedFilter === "Compliments") {
        return (
          suggestion.compliment &&
          (lowerCaseSearchTerm === "" ||
            suggestion.suggestion.toLowerCase().includes(lowerCaseSearchTerm))
        );
      }
      return true;
    });
  };

  return (
    <div className="top-charts">
      {searchTerm.length === 0 ? (
        <div className="top-charts-title-sort">
          <h3>
            {" "}
            <i>Trending</i>{" "}
          </h3>
        </div>
      ) : (
        <div className="top-charts-title-sort">
          <h3>
            {" "}
            <i>Search Results</i>{" "}
          </h3>
        </div>
      )}

      <div className="trending-filter-buttons">
        <button
          onClick={() => setSelectedFilter("All")}
          className={selectedFilter === "All" ? "active" : ""}
        >
          All
          {selectedFilter === "All" && (
            <div
              className="wave"
              style={{
                "--w": "20px",
                "--h": "6px",
                "--p": "3px",
                "--t": "2px",
                "--c": "orange",
              }}
            ></div>
          )}
        </button>
        /
        <button
          onClick={() => setSelectedFilter("Suggestions")}
          className={selectedFilter === "Suggestions" ? "active" : ""}
        >
          Suggestions{" "}
          {selectedFilter === "Suggestions" && (
            <div
              className="wave"
              style={{
                "--w": "20px",
                "--h": "6px",
                "--p": "3px",
                "--t": "2px",
                "--c": "orange",
              }}
            ></div>
          )}
        </button>
        /
        <button
          onClick={() => setSelectedFilter("Compliments")}
          className={selectedFilter === "Compliments" ? "active" : ""}
        >
          Compliments
          {selectedFilter === "Compliments" && (
            <div
              className="wave"
              style={{
                "--w": "20px",
                "--h": "6px",
                "--p": "3px",
                "--t": "2px",
                "--c": "orange",
              }}
            ></div>
          )}
        </button>
        {searchTerm.length === 0 && (
          <div
            className={
              showSearchInput
                ? "trending-search-container"
                : "trending-search-container false"
            }
          >
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              color="#b7b1a7"
              style={{}}
              onClick={() => setShowSearchInput(!showSearchInput)}
            />
            {showSearchInput && (
              <div>
                <input
                  type="text"
                  className="trending-search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faTimesCircle} // You can replace this with the desired close icon
                  size="sm"
                  color="#b7b1a7" // Adjust the color as needed
                  onClick={() => setShowSearchInput(false)} // Click event to close the search
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`top-suggestions-box ${
          filterSuggestionsBySearch().length > 3 ? "suggestions-scroll" : ""
        }`}
      >
        {filterSuggestionsBySearch().length === 0 ? (
          searchTerm === "" ? (
            // Show preloaded suggestions when searchTerm is empty
            suggestions.map((p, index) => (
              <div key={p.id}>
                <SuggestionToBrand
                  suggestion={p.suggestion}
                  suggestionID={p.id}
                  iscompliment={p.compliment}
                  businessName={p.businessName}
                  counter={index + 1}
                  actualindex={index}
                  thisID={thisID}
                  email={email}
                />
              </div>
            ))
          ) : (
            // Show "No search results, add it" message when searchTerm is not empty
            <div className="no-results-message">No search results, add it</div>
          )
        ) : (
          filterSuggestionsBySearch().map((p, index) => {
            count = index + 1;
            if (!seenSuggestions.has(p.suggestion)) {
              seenSuggestions.add(p.suggestion);

              return (
                <div key={p.id}>
                  <SuggestionToBrand
                    suggestion={p.suggestion}
                    suggestionID={p.id}
                    iscompliment={p.compliment}
                    businessName={p.businessName}
                    counter={count}
                    actualindex={index}
                    thisID={thisID}
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
