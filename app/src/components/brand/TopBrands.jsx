import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import { UserSuggestion } from "../../models";
import Avatar from "@mui/material/Avatar";
// ... Other imports

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
            console.log(imageUrl);

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
    <div>
      <h1>Top Brands with Most Compliments</h1>
      {topBrands.length > 0 ? (
        <ul>
          {topBrands.map((brandName, index) => (
            <li key={index}>
              <Avatar alt={brandName} src={avatarUrls[brandName]} />
              {brandName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No brands with compliments found.</p>
      )}
    </div>
  );
}

export default TopBrands;
