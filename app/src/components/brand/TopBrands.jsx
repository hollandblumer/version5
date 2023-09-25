import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import { UserSuggestion } from "../../models";
import Avatar from "@mui/material/Avatar";
// ... Other imports
import topbrandsimage from "../../assets/images/top-brands-compliment.png";
import AvatarDesign from "../../assets/images/avatar-design1.png";
import { Link } from "react-router-dom";

function TopBrands() {
  const [topBrands, setTopBrands] = useState([]);
  const [avatarUrls, setAvatarUrls] = useState({});

  useEffect(() => {
    async function fetchTopBrands() {
      try {
        const suggestions = await DataStore.query(UserSuggestion, (c) =>
          c.suggestion.compliment.eq(true)
        );

        console.log("suggestions", suggestions);

        const brandComplimentCounts = {};

        await Promise.all(
          suggestions.map(async (p) => {
            const suggestion = await p.suggestion;
            const brandName = suggestion.businessName;
            // Fetch image URL from storage
            const imageUrl = await Storage.get(`${brandName}.jpg`);

            // Update avatarUrls state using setAvatarUrls function
            setAvatarUrls((prevAvatarUrls) => ({
              ...prevAvatarUrls,
              [brandName]: imageUrl,
            }));

            brandComplimentCounts[brandName] =
              (brandComplimentCounts[brandName] || 0) + 1;
          })
        );

        const sortedBrands = Object.keys(brandComplimentCounts).sort(
          (a, b) => brandComplimentCounts[b] - brandComplimentCounts[a]
        );

        const topBrandsCount = Math.min(sortedBrands.length, 10);
        const topBrandsList = sortedBrands.slice(0, topBrandsCount);

        setTopBrands(topBrandsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTopBrands();
  }, []);

  return (
    <div className="top-brands">
      <div className="top-brands-title">
        TOP BRANDS WITH THE MOST COMPLIMENTS
      </div>
      {topBrands.length > 0 ? (
        <div className="top-brands-icons">
          {topBrands.map((brandName, index) => (
            <div className="info-avatar-wrapper">
              <Link to={`/${brandName}`}>
                <img
                  src={AvatarDesign}
                  alt="Avatar Background"
                  className="avatar-background"
                />
                <Avatar
                  alt={brandName}
                  sx={{ height: "115px", width: "115px" }}
                  src={avatarUrls[brandName]}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No brands with compliments found.</p>
      )}
    </div>
  );
}

export default TopBrands;
