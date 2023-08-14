import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models'; // Adjust the import path based on your models
import { Storage } from "@aws-amplify/storage";
import { Auth } from "@aws-amplify/auth";

export function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    // Add other form fields here
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isUsernameValidating, setIsUsernameValidating] = useState(false);

  useEffect(() => {
    // Check username availability as the user types
    const checkUsernameAvailability = async (username) => {
      setIsUsernameValidating(true);
      const users = await DataStore.query(User, (u) => u.name.eq(formData.username));
      setIsUsernameAvailable(users.length === 0);
      setIsUsernameValidating(false);
    };

    if (formData.username) {
      checkUsernameAvailability(formData.username);
    }
  }, [formData.username]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg") {
        // Upload the image to S3
        Storage.put(`${formData.username}-${file.name}`, file)
          .then(result => {
            // Update the formData state with the image URL after upload
            setFormData(prevData => ({ ...prevData, profileImage: result.key }));
          })
          .catch(error => {
            console.error("Error uploading image:", error);
          });
      } else {
        console.error("Only JPEG images are allowed.");
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // Find the user with the matching email
      const users = await DataStore.query(User, u => u.email.eq(Auth.user.attributes.email));
      if (users.length === 1) {
        const currentUser = users[0];
        // Update user's data in DataStore
        await DataStore.save(
          User.copyOf(currentUser, updated => {
            // Update the username with the provided formData.username
            updated.name = formData.username;
            
            // Store the image if there is one
            if (formData.profileImage) {
              const imageKey = `${formData.username}.jpg`; // Construct the image key
              Storage.put(imageKey, formData.profileImage, { contentType: 'image/jpeg' })
                .then(result => {
                  updated.filePath = result.key; // Store the S3 image path in the user object
                })
                .catch(error => {
                  console.error("Error storing image:", error);
                });

                updated.filePath = imageKey;
            }
  
            updated.hasCompletedForm = true;

            // Update other fields if needed
          })
        );
      }
  
      // Once the form is successfully submitted, navigate to home page
      navigate('/');
    } catch (error) {
      console.error("Error completing profile:", error);
      // Handle error scenario
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {isUsernameValidating && <div>Validating...</div>}
          {!isUsernameAvailable && !isUsernameValidating && (
            <div style={{ color: 'red' }}>Username is not available.</div>
          )}
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/jpeg"
            name="profileImage"
            onChange={handleImageChange}
            required
          />
          <p>Only JPEG images are allowed.</p>
        </div>
        {/* Add other form fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
