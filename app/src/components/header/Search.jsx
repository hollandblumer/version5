import { React, useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/header/header.css";
import "../../styles/header/search/search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const navigate = useNavigate();

  const createSearch = async (e) => {
    e.preventDefault();
    // then you save the mode that links a post with an editor
    const searchList = await DataStore.query(User, (p) =>
      p.name.contains(search)
    );
    setSearchList(searchList);
  };

  const goLink = (user) => {
    navigate(`/${user}`);
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="search" onMouseEnter={() => setShowInput(true)}>
      {/*   <div className="search-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="#212121" />
        </div> */}

      <div className="search-form">
        <form onChange={createSearch}>
          <input
            // autoFocus
            className="search-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <button className="xbutton" onClick={() => setSearch("")}>
          <FontAwesomeIcon icon={faCircleXmark} size="sm" color="#c7c7c7" />
        </button>
      </div>
      <div className="search-divider"></div>

      {search != "" ? (
        <div className="searches">
          {searchList.length != 0 ? (
            <div>
              {searchList.map((user) => (
                <div className="searchList" key={user.id}>
                  <button
                    className="search-button"
                    onClick={() => {
                      goLink(user.name);
                    }}
                  >
                    <div>{user.name}</div>
                  </button>
                </div>
              ))}
              <div>
                {" "}
                <button
                  className="search-button"
                  onClick={() => {
                    navigate(`/brand-form`);
                  }}
                >
                  <div className="brand-form-button">Add a business</div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <button
                className="search-button"
                onClick={() => {
                  navigate(`/brand-form`);
                }}
              >
                <div className="brand-form-button">Add a business</div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {" "}
          <button
            className="search-button"
            onClick={() => {
              navigate(`/brand-form`);
            }}
          >
            <div className="brand-form-button">Add a business</div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
