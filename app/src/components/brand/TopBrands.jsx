import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import { UserSuggestion } from "../../models";
import { User } from "../../models";
import Avatar from "@mui/material/Avatar";
import topbrandsimage from "../../assets/images/top-brands-compliment.png";
import AvatarDesign from "../../assets/images/avatar-design1.png";
import { Link } from "react-router-dom";
import EyeWorld from "../../assets/images/eye-world.png";
import ShootingStar from "../../assets/images/shooting-star.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faStar,
  faSearch,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import GradientStar from "../../assets/images/gradient-star.svg";
import Earth from "../../assets/images/earth.png";
import CaretDown from "../../assets/images/caret-down.svg";
import EyeIcon from "../../assets/images/purple-eye.png";
import "../../styles/home/home.css";

function TopBrands() {
  const [topBrands, setTopBrands] = useState([]);
  const [avatarUrls, setAvatarUrls] = useState({});
  const [selectedOption, setSelectedOption] = useState("most recent");
  const [totalCompliments, setTotalCompliments] = useState({});
  const [selectedIndustry, setSelectedIndustry] = useState("All"); // Default to "All"
  const [showBrandsSortSelect, setShowBrandsSortSelect] = useState(false);

  useEffect(() => {
    async function fetchTopBrands() {
      try {
        let suggestions;

        if (selectedIndustry !== "All") {
          suggestions = await DataStore.query(UserSuggestion, (c) =>
            c.and((c) => [
              c.suggestion.compliment.eq(true),
              // c.user.industry.eq(selectedIndustry),
            ])
          );
        } else {
          suggestions = await DataStore.query(UserSuggestion, (c) =>
            c.suggestion.compliment.eq(true)
          );
        }

        console.log("suggestions", suggestions);

        const brandComplimentCounts = {};
        const brandIndustriesMap = new Map();

        await Promise.all(
          suggestions.map(async (p) => {
            const suggestion = await p.suggestion;
            const brandName = suggestion.businessName;
            const imageUrl = await Storage.get(`${brandName}.jpg`);

            setAvatarUrls((prevAvatarUrls) => ({
              ...prevAvatarUrls,
              [brandName]: imageUrl,
            }));

            brandComplimentCounts[brandName] =
              (brandComplimentCounts[brandName] || 0) + 1;

            const industry = await getIndustryForBrand(brandName);
            brandIndustriesMap.set(brandName, industry);
          })
        );

        async function getIndustryForBrand(brandName) {
          try {
            // Replace 'User' with the actual model name for your brand information
            const user = await DataStore.query(User, (c) =>
              c.name.eq(brandName)
            );

            // Assuming the industry information is stored in the 'industry' field
            return user[0]?.industry || "Unknown";
          } catch (error) {
            console.error("Error fetching industry for brand:", error);
            return "Unknown";
          }
        }

        const sortedBrands = Object.keys(brandComplimentCounts).sort(
          (a, b) => brandComplimentCounts[b] - brandComplimentCounts[a]
        );

        let filteredBrands;

        if (selectedIndustry !== "All") {
          // Filter brands based on the selected industry
          filteredBrands = sortedBrands.filter(
            (brandName) =>
              brandIndustriesMap.get(brandName) === selectedIndustry
          );
        } else {
          filteredBrands = sortedBrands;
        }

        const topBrandsCount = Math.min(filteredBrands.length, 10);

        const topBrandsList = filteredBrands.slice(0, topBrandsCount);

        setTopBrands(topBrandsList);
        console.log("top brands", topBrands);

        // Fetch and store total compliments for each brand
        const brandCompliments = {};
        await Promise.all(
          topBrandsList.map(async (brandName) => {
            const total = await calculateTotalCompliments(brandName);
            brandCompliments[brandName] = total;
          })
        );

        setTotalCompliments(brandCompliments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTopBrands();
  }, [selectedIndustry]);

  // Function to calculate total compliments for an individual brand
  async function calculateTotalCompliments(brandName) {
    try {
      const totalCompliments = await DataStore.query(UserSuggestion, (us) =>
        us.and((c) => [
          c.suggestion.businessName.eq(brandName),
          c.suggestion.compliment.eq(true),
        ])
      );

      return totalCompliments.length;
    } catch (error) {
      console.error("Error calculating total compliments:", error);
      return 0;
    }
  }

  const handleEyeIconClick = () => {
    setShowBrandsSortSelect(!showBrandsSortSelect);
  };

  /*  const generateGradient = () => (
    <>
      <defs>
        <clipPath id="clip">
          <path d="M8 0l2.45 4.73h5.56l-4.01 3.68L11 16l-4.24-2.59L2 16l.99-7.59-4.01-3.68h5.56L8 0zm0 9.36L6.27 12l.97-6.17L8 3.55l.76 2.28L9.73 12 8 9.36z" />
        </clipPath>

        <linearGradient id="animated-gradient" x1="0" y1="-16" x2="16" y2="0">
          <stop offset="0" stop-color="#e3c07b" />
          <stop offset="1" stop-color="#ece0b2" />
          <animate
            attributeName="x1"
            values="0;16;16;0"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="0;16;16;0"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="0;32;32;0"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="16;32;32;16"
            dur="5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width="16"
        height="16"
        fill="url(#animated-gradient)"
        clipPath="url(#clip)"
      />
    </>
  ); */
  const generateGradient = () => (
    <svg width="19" height="18" viewBox="0 0 16 16">
      <defs>
        <clipPath id="clip">
          <polygon points="8 0.03 10.37 5.31 15.82 6.11 11.84 10.03 12.77 15.63 8 13.01 3.07 15.63 4 10.03 0.07 6.11 5.52 5.31 8 0.03" />
        </clipPath>
        <linearGradient
          id="animated-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#e3c07b" />
          <stop offset="50%" stopColor="#DCAA45" />
          <stop offset="100%" stopColor="#e3c07b" />
          <animate
            attributeName="x1"
            values="-100%;100%"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values="-100%;100%"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="0%;200%"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="0%;200%"
            dur="8s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="16"
        height="16"
        fill="url(#animated-gradient)"
        clipPath="url(#clip)"
      />
    </svg>
  );

  return (
    <div className="top-brands">
      <div className="top-charts-title-sort">
        <h3> Most Complimented Brands</h3>
      </div>
      <div className="top-brands-sort-select-container">
        <button
          className={`top-charts-sort-button ${
            selectedIndustry === "All" ? "active" : ""
          }`}
          onClick={() => setSelectedIndustry("All")}
        >
          All
        </button>
        <div className="divider">/</div>
        <button
          className={`top-charts-sort-button ${
            selectedIndustry === "Restaurant" ? "active" : ""
          }`}
          onClick={() => setSelectedIndustry("Restaurant")}
        >
          Restaurant
        </button>
        <div className="divider">/</div>
        <button
          className={`top-charts-sort-button ${
            selectedIndustry === "Retail" ? "active" : ""
          }`}
          onClick={() => setSelectedIndustry("Retail")}
        >
          Retail
        </button>
        <div className="divider">/</div>
        <button
          className={`top-charts-sort-button ${
            selectedIndustry === "Beauty" ? "active" : ""
          }`}
          onClick={() => setSelectedIndustry("Beauty")}
        >
          Beauty
        </button>

        <div className="divider">/</div>

        {/* <div className="select-wrapper">
          <select
            className="sort-select"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            <option value="most recent">the most recent </option>
            <option value="suggestions">suggestions </option>
            <option value="compliments">compliments</option>
          </select>
          <img src={CaretDown} className="caret-down" />
        </div> */}
        {/*     <div className="select-wrapper">
          <select
            className="sort-select"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            <option value="most recent">all industries</option>
            <option value="suggestions">suggestions</option>
            <option value="compliments">compliments</option>
          </select>
          <img src={CaretDown} className="caret-down" />
        </div> */}
        <button
          className={`top-charts-sort-button ${
            selectedIndustry === "Automotive" ? "active" : ""
          }`}
          onClick={() => setSelectedIndustry("Automotive")}
        >
          Tech
        </button>
        <img
          className="top-eye-brands-icon"
          src={EyeIcon}
          onClick={handleEyeIconClick}
        />
        {/*   <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          color="#b7b1a7"
          style={{ marginLeft: "4px" }}
        /> */}
      </div>
      {showBrandsSortSelect == true ? (
        <div className="top-brands-sort-select-container">
          <div className="divider">/</div>
          <button
            className={`top-charts-sort-button ${
              selectedIndustry === "Industrial" ? "active" : ""
            }`}
            onClick={() => setSelectedIndustry("Industrial")}
          >
            Healthcare
          </button>
          <button
            className={`top-charts-sort-button ${
              selectedIndustry === "hopsitality" ? "active" : ""
            }`}
            onClick={() => setSelectedIndustry("hospitality")}
          >
            Hospitality
          </button>

          <button
            className={`top-charts-sort-button ${
              selectedIndustry === "Automotive" ? "active" : ""
            }`}
            onClick={() => setSelectedIndustry("Automotive")}
          >
            Tech
          </button>

          <button
            className={`top-charts-sort-button ${
              selectedIndustry === "Automotive" ? "active" : ""
            }`}
            onClick={() => setSelectedIndustry("Automotive")}
          >
            Energy
          </button>
          <button
            className={`top-charts-sort-button ${
              selectedIndustry === "Automotive" ? "active" : ""
            }`}
            onClick={() => setSelectedIndustry("Automotive")}
          >
            Agriculture
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="top-brands-icons">
        {topBrands.length > 0 ? (
          topBrands.map((brandName, index) => (
            <div className="top-brands-avatar-wrapper" key={index}>
              <div>
                <Link className="top-brands-name" to={`/${brandName}`}>
                  <Avatar
                    alt={brandName}
                    sx={{
                      height: "55px",
                      width: "55px",
                      boxShadow: "0 0 0 1px #dbdbdb, 0 0 0 4px transparent",
                      backgroundColor: "transparent",
                    }}
                    src={avatarUrls[brandName]}
                  />
                  <div className="top-brands-username"> {brandName}</div>
                </Link>
              </div>
              <div className="top-brands-counter">
                {generateGradient()}
                {totalCompliments[brandName]}
              </div>
            </div>
          ))
        ) : (
          <p>No brands with compliments found.</p>
        )}
      </div>

      {/* <img className="eye-world" src={EyeWorld} /> */}
      {/* <img className="shooting-star" src={ShootingStar} /> */}
    </div>
  );
}

export default TopBrands;
