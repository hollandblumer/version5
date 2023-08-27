import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Suggestion, UserSuggestion, User } from "../../models";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCaretDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/suggestion/suggestion-business/suggestion.css";

function SuggestionForm({ name, email, thisID, businessname }) {
  const [suggestion, setSuggestion] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [suggestionCheck, setSuggestionCheck] = useState("false");
  const [compliment, setCompliment] = useState(false);

  const createSearch = async (e) => {
    e.preventDefault();
    // then you save the mode that links a post with an editor
    const searchList = await DataStore.query(Suggestion, (p) =>
      p.suggestion.contains(suggestion)
    );

    setSearchList(searchList);
  };

  const createSuggestion = async (e) => {
    suggestionCheck == "true" ? setCompliment(true) : setCompliment(false);

    const newSuggestion = await DataStore.save(
      new Suggestion({
        businessname,
        suggestion,
        compliment,
      })
    );

    const newUser = new User({
      name,
      email,
      thisID,
    });

    // then you save the mode that links a post with an editor
    await DataStore.save(
      new UserSuggestion({
        userID: newUser.thisID,
        suggestion: newSuggestion,
      })
    );

    setSuggestion("");
    window.location.reload(false);
  };

  let array = [];

  return (
    <div className="suggestion-form">
      <div className="suggestion-form-container">
        <div className="suggestion-form-content">
          <select
            className="suggestion-select"
            onChange={(e) => setSuggestionCheck(e.target.value)}
          >
            <option value="false">
              {" "}
              Suggestion
              <FontAwesomeIcon
                icon={faCaretDown}
                size="xs"
                color="#5c5848"
              />{" "}
            </option>
            <option value="true">
              {" "}
              Compliment{" "}
              <FontAwesomeIcon
                icon={faCaretDown}
                size="xs"
                color="#5c5848"
              />{" "}
            </option>
          </select>

          <div className="form-input" onChange={createSearch}>
            <input
              className="suggestion-input"
              type="text"
              value={suggestion}
              placeholder={
                suggestionCheck == "true"
                  ? "Start typing compliment here.."
                  : "Start typing suggestion here.."
              }
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </div>
        </div>

        {suggestion != "" ? (
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

      {suggestion != "" ? (
        <div className="suggestionSearchListContainer">
          {searchList.length != 0 ? (
            <div>
              {searchList.map((suggestion) => (
                <div className="suggestionSearchList" key={suggestion.id}>
                  {array.includes(suggestion.suggestion) ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={() => {
                        setSuggestion(suggestion.suggestion);
                      }}
                    >
                      <p>{suggestion.suggestion}</p>
                      {array.push(suggestion.suggestion).hide}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SuggestionForm;
