import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../../styles/header/dropdown/dropdown.css";
import { Auth } from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Link, useNavigate } from "react-router-dom";

function Dropdown({ url, user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const goLink = (user) => {
    navigate(`/${user}`);
    refreshPage();
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="dropdown-container">
      <button
        className="dropdown"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        <Link to={`/${user}`} replace>
          {" "}
          <Avatar
            sx={{}}
            src={url}
            onClick={() => {
              goLink(user);
            }}
          />
        </Link>

        <FontAwesomeIcon icon={faCaretDown} />
      </button>

      {showDropdown ? (
        <div className="dropdown-box">
          {" "}
          <Link to={`/`} replace>
            <button
              className="sign-out-button"
              onClick={async () => {
                await Auth.signOut();
                await DataStore.clear();
                window.location.reload(false);
              }}
            >
              Sign Out{" "}
            </button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Dropdown;
