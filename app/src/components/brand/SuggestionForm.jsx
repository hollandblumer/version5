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

function SuggestionForm({ name, email, thisID, businessName }) {
  const [suggestion, setSuggestion] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [suggestionCheck, setSuggestionCheck] = useState(false);
  const [compliment, setCompliment] = useState(false);

  const createSearch = async (e) => {
    e.preventDefault();
    const searchList = await DataStore.query(Suggestion, (p) =>
      p.suggestion.contains(suggestion)
    );

    setSearchList(searchList);
  };

  const createSuggestion = async (e) => {
    const isCompliment = suggestionCheck === true;
    setCompliment(isCompliment);

    const existingSuggestion = searchList.find(
      (s) => s.suggestion === suggestion && s.businessName === businessName
    );
    console.log(existingSuggestion);

    if (existingSuggestion) {
      const existingUserSuggestion = await DataStore.query(
        UserSuggestion,
        (us) =>
          us.and((c) => [
            c.suggestion.suggestion.eq(suggestion),
            c.suggestion.businessName.eq(businessName),
            c.user.id.eq(thisID),
          ])
      );

      console.log("existUSer", existingUserSuggestion);

      if (existingUserSuggestion.length > 0) {
        alert("You have already made this suggestion.");
        return;
      }

      const newUserSuggestion = await DataStore.save(
        new UserSuggestion({
          userId: thisID,
          suggestion: existingSuggestion,
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

      const newUserSuggestion = await DataStore.save(
        new UserSuggestion({
          userId: thisID,
          suggestion: newSuggestion,
        })
      );
    }

    setSuggestion("");
    setCompliment(false);
    window.location.reload(false);
  };

  let array = [];

  return (
    <div className="suggestion-form">
      <div className="suggestion-form-container">
        <div className="suggestion-form-content">
          <select
            className="suggestion-select"
            onChange={(e) => setSuggestionCheck(e.target.value === "true")}
          >
            <option value="false"> Suggestion</option>
            <option value="true"> Compliment </option>
          </select>

          <div className="form-input" onChange={createSearch}>
            <input
              className="suggestion-input"
              type="text"
              value={suggestion}
              placeholder={
                suggestionCheck === true
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
    </div>
  );
}

export default SuggestionForm;
