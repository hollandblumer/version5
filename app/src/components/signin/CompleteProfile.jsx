import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models'; // Adjust the import path based on your models

export function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    // Add other form fields here
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  useEffect(() => {
    // Check username availability as the user types
    const checkUsernameAvailability = async () => {
      const users = await DataStore.query(User, u => u.username('eq', formData.username));
      setIsUsernameAvailable(users.length === 0);
    };

    if (formData.username) {
      checkUsernameAvailability();
    }
  }, [formData.username]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // Update user's data in DataStore
      await DataStore.save(
        User.copyOf(user => user.username === formData.username, updated => {
          updated.profileImage = formData.profileImage;
          updated.hasCompletedForm = true;
          // Update other fields if needed
        })
      );

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
          {!isUsernameAvailable && (
            <div style={{ color: 'red' }}>Username is not available.</div>
          )}
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add other form fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
