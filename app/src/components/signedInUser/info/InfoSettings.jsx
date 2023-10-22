import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Storage } from "aws-amplify";
import SettingsIcon from "../../../assets/images/settings-icon.png";

function InfoSettings() {
  const [editing, setEditing] = useState(false);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Load user's existing image when in editing mode
    async function fetchUserProfileImage() {
      try {
        const imageUrl = await Storage.get("profile.jpg"); // Replace 'profile.jpg' with the actual image key
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching user's profile image:", error);
      }
    }

    if (editing) {
      fetchUserProfileImage();
    }
  }, [editing]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the new image if it's selected
    if (imageFile) {
      try {
        await Storage.put("profile.jpg", imageFile); // Replace 'profile.jpg' with the desired image key
      } catch (error) {
        console.error("Error uploading user's profile image:", error);
      }
    }

    // Send the updated data to your API (replace this with your actual API call)
    const formData = {
      location,
      bio,
    };

    try {
      // Make an API call to update user data
      // Replace the following with your API endpoint
      await fetch("/api/update-user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Close the form and reset state
      setEditing(false);
      setLocation("");
      setBio("");
      setImageFile(null);

      // You may want to update the user's data displayed on the page here.
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="info-settings-container">
      {/* <FontAwesomeIcon icon={faGear} onClick={() => setEditing(true)} /> */}
      <img
        src={SettingsIcon}
        alt="Settings"
        className="settings-icon"
        onClick={() => setEditing(true)}
      />

      {editing && (
        <div className="settings-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Profile Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="Profile" />
              </div>
            )}
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default InfoSettings;
