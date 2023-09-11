import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { DataStore } from "aws-amplify";
import { Follow, User } from "../../models"; // Import your Amplify models

function Follower({ signedInUser }) {
  const { name } = useParams();
  const [followerLength, setFollowerLength] = useState(0);
  console.log("sI", signedInUser);
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch the user data by their profile name
        const userData = await DataStore.query(User, (u) => u.name.eq(name));

        if (userData.length === 1) {
          // If the user exists, you can directly use user.followers as the value of followersArray
          const user = userData[0];
          const followData = await DataStore.query(Follow);

          const usersInFollow = await Promise.all(
            followData.map(async (follow) => {
              // Access the 'values' property of follow.Users to get the array of users
              const usersArray = (await follow.Users?.values) || [];
              return usersArray;
            })
          );

          // Flatten the array of arrays into a single array
          const flattenedUsersInFollow = usersInFollow.flat();
          setFollowerLength(flattenedUsersInFollow.length);

          // Extract user names and file paths
          const userNames = [];
          const filePaths = [];

          await Promise.all(
            flattenedUsersInFollow.map(async (model) => {
              if (model.user) {
                // Access the user object from the Model (await is used here)
                const user = await model.user;

                // Extract and push the "name" and "filePath" properties to their respective arrays
                userNames.push(user.name);
                filePaths.push(user.filePath);
              }
            })
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);
  return (
    <div>
      {followerLength}
      <FontAwesomeIcon icon={faUserPlus} />{" "}
    </div>
  );
}

export default Follower;
