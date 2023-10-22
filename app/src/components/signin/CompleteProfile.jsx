import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../models"; // Adjust the import path based on your models
import { Storage } from "@aws-amplify/storage";
import { Auth } from "@aws-amplify/auth";
import "../../styles/complete-profile/complete-profile.css";

export function CompleteProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isUsernameValidating, setIsUsernameValidating] = useState(false);
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  useEffect(() => {
    // Check if the user is signed in
    Auth.currentAuthenticatedUser()
      .then(() => {
        setUserIsSignedIn(true);
      })
      .catch(() => {
        setUserIsSignedIn(false);
      });
  }, []);

  useEffect(() => {
    // Check username availability as the user types
    const checkUsernameAvailability = async (username) => {
      setIsUsernameValidating(true);
      const users = await DataStore.query(User, (u) => u.name.eq(username));
      setIsUsernameAvailable(users.length === 0);
      setIsUsernameValidating(false);
    };

    if (username) {
      checkUsernameAvailability(username);
    }
  }, [username]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "profileImage") {
      // Set the profileImage state with the selected file
      console.log("e", event.target.files[0]);
      setProfileImage(event.target.files[0]);
    }
  };

  console.log("pi", profileImage);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Find the user with the matching email
      const users = await DataStore.query(User, (u) =>
        u.email.eq(Auth.user.attributes.email)
      );

      if (users.length === 1) {
        const currentUser = users[0];
        // Check if an image with the same filepath exists
        const imageKey = `${username}.jpg`;
        const imageExists = await Storage.get(imageKey);
        console.log("imageExists", imageExists);

        // Update user's data in DataStore
        await DataStore.save(
          User.copyOf(currentUser, (updated) => {
            updated.name = username;
            updated.hasCompletedForm = true; // Set hasCompletedForm to true
            console.log("pi", profileImage);
            console.log("imageExists.length:", imageExists.length);
            console.log("il", imageExists.length);
            if (imageExists.length > 0 && profileImage) {
              console.log("get here");
              // Upload the image only if it doesn't exist
              Storage.put(imageKey, profileImage, {
                contentType: "image/jpeg",
              })
                .then((result) => {
                  // Update filePath with the correct S3 key
                  updated.filePath = result.key;
                })
                .catch((error) => {
                  console.error("Error storing image:", error);
                });
            } else {
              // If the image already exists, don't upload it again
              updated.filePath = imageKey;
            }
          })
        );
      }

      // Once the form is successfully submitted, navigate to the home page
    } catch (error) {
      console.error("Error completing profile:", error);
      // Handle error scenario
    }
  };

  const handleInputFocus = (input) => {
    // Add a CSS class to change the input's border color
    if (input === "username") {
      setUsernameFocused(true);
    }
  };

  const handleInputBlur = (input) => {
    // Remove the CSS class when the input loses focus
    if (input === "username") {
      setUsernameFocused(false);
    }
  };

  if (!userIsSignedIn) {
    return <div>User is not signed in.</div>;
  }

  return (
    <div>
      <div className="custom-signin-container">
        <div className="signin-title">Complete Your Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              className={`form-label ${usernameFocused ? "focused-label" : ""}`}
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("username")}
              onBlur={() => handleInputBlur("username")}
              required
              className="custom-form-input"
            />
            {isUsernameValidating && <div>Validating...</div>}
            {!isUsernameAvailable && !isUsernameValidating && (
              <div className="error-text">Username is not available.</div>
            )}
          </div>

          {/* Profile Image input is outside of the Username input container */}
          <div className="form-group">
            <label>Profile Image:</label>
            <input
              type="file"
              accept="image/jpeg"
              name="profileImage"
              onChange={handleInputChange}
              required
            />
            <p>Only JPEG images are allowed.</p>
          </div>

          {/* Add other form fields here */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
