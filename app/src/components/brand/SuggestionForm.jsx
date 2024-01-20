import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Suggestion, UserSuggestion, User } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCaretDown,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { Auth } from "@aws-amplify/auth";
import "../../styles/suggestion/suggestion-business/suggestion.css";
import AuthForm from "./AuthForm"; // Import your AuthForm component

function SuggestionForm({ name, email, thisID, businessName }) {
  const [suggestion, setSuggestion] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [suggestionCheck, setSuggestionCheck] = useState(false);
  const [compliment, setCompliment] = useState(false);
  const [similarSuggestions, setSimilarSuggestions] = useState([]); // State for similar suggestions
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("false");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const createSearch = async (e) => {
    e.preventDefault();
    const searchList = await DataStore.query(Suggestion, (p) =>
      p.suggestion.contains(suggestion)
    );

    setSearchList(searchList);
  };
  const createSuggestion = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      // User is already authenticated, proceed with creating the suggestion
      handleCreateSuggestion();
    } catch (error) {
      // User is not authenticated, display the form to collect email and name
      setShowAuthForm(true); // You need to manage the state for displaying the form
    }
  };

  const handleCreateSuggestion = async () => {
    const isCompliment = suggestionCheck === true;
    setCompliment(isCompliment);

    // Check if the suggestion exists in either the original suggestions or similar suggestions
    const existingSuggestion = searchList.find(
      (s) => s.suggestion === suggestion && s.businessName === businessName
    );

    const existingSimilarSuggestion = similarSuggestions.find(
      (s) => s.suggestion === suggestion && s.businessName === businessName
    );

    const existingUserSuggestion = await DataStore.query(UserSuggestion, (us) =>
      us.and((c) => [
        c.suggestion.suggestion.eq(suggestion),
        c.suggestion.businessName.eq(businessName),
        c.user.id.eq(thisID),
      ])
    );

    if (
      existingSuggestion ||
      existingSimilarSuggestion ||
      existingUserSuggestion.length > 0
    ) {
      alert("You have already made this suggestion.");
      return;
    }

    if (existingSuggestion || existingSimilarSuggestion) {
      // Save the suggestion based on whether it's an existing suggestion or a similar one
      const suggestionToSave = existingSuggestion || existingSimilarSuggestion;

      await DataStore.save(
        new UserSuggestion({
          userId: thisID,
          suggestion: suggestionToSave,
        })
      );
    } else {
      const newSuggestion = await DataStore.save(
        new Suggestion({
          businessName,
          suggestion,
          compliment: isCompliment,
          show: true,
          feature: true,
        })
      );

      await DataStore.save(
        new UserSuggestion({
          userId: thisID,
          suggestion: newSuggestion,
        })
      );
    }
    console.log("tryhing here");
    setSuggestion("");
    setCompliment(false);
    // window.location.reload(false);
  };

  useEffect(() => {
    // Function to tokenize a string into words
    const tokenize = (text) => text.toLowerCase().split(/\s+/);

    // Function to calculate Jaccard similarity between two arrays of words
    const jaccardSimilarity = (arr1, arr2) => {
      const set1 = new Set(arr1);
      const set2 = new Set(arr2);
      const intersection = new Set([...set1].filter((word) => set2.has(word)));
      const union = new Set([...set1, ...set2]);
      return intersection.size / union.size;
    };

    // Function to update similar suggestions
    // Function to update similar suggestions
    const updateSimilarSuggestions = () => {
      if (suggestion.trim() !== "") {
        // Tokenize user input
        const userInputTokens = tokenize(suggestion);

        // Query all suggestions
        DataStore.query(Suggestion).then((allSuggestions) => {
          // Create a Set to store unique suggestions
          const uniqueSuggestions = new Set();

          // Iterate through all suggestions
          allSuggestions.forEach((sugg) => {
            // Tokenize suggestion
            const suggestionTokens = tokenize(sugg.suggestion);

            // Calculate Jaccard similarity between input and suggestion tokens
            const similarity = jaccardSimilarity(
              userInputTokens,
              suggestionTokens
            );

            // You can adjust the threshold as needed
            if (similarity > 0.3) {
              // Add the suggestion to the uniqueSuggestions Set
              uniqueSuggestions.add(sugg.suggestion);
            }
          });

          // Convert the Set back to an array of objects
          const similarSuggestions = Array.from(uniqueSuggestions).map(
            (sugg) => ({
              suggestion: sugg,
              similarity: 1, // You can customize similarity scores as needed
            })
          );

          setSimilarSuggestions(similarSuggestions);
        });
      } else {
        setSimilarSuggestions([]);
      }
    };

    // Update similar suggestions whenever user input changes
    updateSimilarSuggestions();
  }, [suggestion]);

  let array = [];

  /*  const handleAuthentication = () => {
    setShowAuthForm(false); // Hide the AuthForm component after successful authentication
    handleCreateSuggestion(); // Proceed with creating the suggestion
  }; */

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="suggestion-form">
      <div className="suggestion-form-container">
        <div className="suggestion-form-content">
          {/* <select
            className="suggestion-select"
            onChange={handleSelectChange}
            style={{
              paddingRight: `0px`, //
            }}
          >
            <option value="false"> Suggestion</option>
            <option value="true"> Compliment </option>
          </select>
          <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" /> */}
          <div className="custom-dropdown">
            <div
              className={`dropdown-header ${isDropdownOpen ? "open" : ""}`}
              onClick={toggleDropdown}
            >
              {selectedOption === "true" ? "Compliment" : "Suggestion"}
              <FontAwesomeIcon icon={faSortDown} className="dropdown-icon" />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-options">
                <div className="checkbox-option">
                  <label>
                    <input
                      type="checkbox"
                      value="false"
                      checked={selectedOption === "false"}
                      onChange={() => handleSelectChange("false")}
                    />
                    Suggestion
                  </label>
                </div>
                <div className="checkbox-option">
                  <label>
                    <input
                      type="checkbox"
                      value="true"
                      checked={selectedOption === "true"}
                      onChange={() => handleSelectChange("true")}
                    />
                    Compliment
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="form-input" onChange={createSearch}>
            <input
              className="suggestion-input"
              type="text"
              value={suggestion}
              placeholder={
                selectedOption === "true"
                  ? "Start typing compliment here.."
                  : "Start typing suggestion here.."
              }
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </div>
        </div>

        {suggestion !== "" ? (
          <button
            className="create-suggestion-button"
            onClick={createSuggestion}
          >
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              size="sm"
              color="#aa7950"
            />{" "}
          </button>
        ) : (
          <div className="create-suggestion-button">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              size="sm"
              color="dark grey"
            />{" "}
          </div>
        )}
      </div>
      {showAuthForm && (
        <AuthForm
          suggestion={suggestion}
          compliment={compliment}
          businessName={businessName}
        />
      )}
      {suggestion !== "" ? (
        <div className="suggestionSearchListContainer">
          {searchList.length !== 0 ? (
            <div>
              {searchList.map((suggestionItem) => (
                <div className="suggestionSearchList" key={suggestionItem.id}>
                  {array.includes(suggestionItem.suggestion) ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={() => {
                        setSuggestion(suggestionItem.suggestion);
                      }}
                    >
                      <p>{suggestionItem.suggestion}</p>
                      {array.push(suggestionItem.suggestion).hide}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <> </>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Display similar suggestions */}
      {similarSuggestions.length > 0 && (
        <div className="similar-suggestions">
          <p>Did you mean:</p>
          <ul>
            {similarSuggestions.map((simSuggestion) => (
              <li key={simSuggestion.suggestion}>
                <button
                  onClick={() => {
                    setSuggestion(simSuggestion.suggestion);
                  }}
                >
                  {simSuggestion.suggestion}{" "}
                  {/* (Similarity:{" "}
                  {(simSuggestion.similarity * 100).toFixed(2)}%) */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SuggestionForm;
