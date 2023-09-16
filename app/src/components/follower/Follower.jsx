import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { DataStore } from "aws-amplify";
import { Follow, User, FollowUser } from "../../models"; // Import your Amplify models

function Follower({ signedInUser }) {
  const { name } = useParams();
  const [followerLength, setFollowerLength] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false); // State to track if signedInUser is following
  const [followId, setFollowId] = useState(null); // Store the ID of the follow relationship if signedInUser is following

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch the user data by their profile name
        const userData = await DataStore.query(User, (u) => u.name.eq(name));

        if (userData.length === 1) {
          const user = userData[0];
          console.log("ufollow", user);
          const followData = await DataStore.query(Follow);

          const usersInFollow = await Promise.all(
            followData.map(async (follow) => {
              const usersArray = (await follow.Users?.values) || [];
              return usersArray;
            })
          );

          const flattenedUsersInFollow = usersInFollow.flat();
          setFollowerLength(flattenedUsersInFollow.length);

          // Find the follow relationship where signedInUser is following
          const followRelationship = flattenedUsersInFollow.find(
            (userModel) =>
              userModel.user && userModel.user.userId === signedInUser.id
          );
          console.log("fR", followRelationship);

          if (followRelationship) {
            setIsFollowing(true);
            setFollowId(flattenedUsersInFollow[0].followId);
          } else {
            setIsFollowing(false);
            setFollowId(flattenedUsersInFollow[0].followId);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [signedInUser]);

  const handleFollowClick = async () => {
    try {
      // Create a new follow relationship for the signed-in user
      const newFollow = await DataStore.save(
        new Follow({
          // You may need to adjust the data structure based on your schema
          // For example, set the appropriate user and follow ID.
          // Replace 'user' and 'followId' with your actual attribute names.
          user: signedInUser, // Set to the signed-in user
          followId: followId, // Set the follow ID to the appropriate value
        })
      );
      setIsFollowing(true); // Update state to indicate that the user is following
      setFollowId(newFollow.followId); // Store the ID of the new follow relationship
    } catch (error) {
      console.error("Error following:", error);
    }
  };

  // Function to handle unfollowing
  const handleUnfollowClick = async () => {
    if (followId) {
      try {
        const existingUserFollow = await DataStore.query(FollowUser, (c) =>
          c.and((c) => [c.user.id.eq(signedInUser.id)])
        );

        // Delete the follow relationship by its ID
        const suggestionToDelete = existingUserFollow[0];
        await DataStore.delete(suggestionToDelete);
        setIsFollowing(false); // Update state to indicate that the user is no longer following
        setFollowId(null);
      } catch (error) {
        console.error("Error unfollowing:", error);
      }
    }
  };

  return (
    <div>
      {followerLength}
      {isFollowing ? (
        // If signedInUser is following, show the "Following" button with an unfollow action
        <button onClick={handleUnfollowClick}>Unfollow</button>
      ) : (
        // If signedInUser is not following, show the "Follow" button
        <button onClick={handleFollowClick}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      )}
    </div>
  );
}

export default Follower;
