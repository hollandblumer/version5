import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User, Suggestion, UserSuggestion } from "../../models";

function AuthForm({ suggestion, compliment, businessName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createUserAndSuggestion = async () => {
    try {
      // Check if a user with the same email already exists
      const existingUser = await DataStore.query(User, (u) =>
        u.email.eq(email)
      );

      let newUser;

      if (existingUser.length > 0) {
        // User with the same email already exists
        // You can handle this case as needed, e.g., display an error message
        newUser = existingUser[0];
        console.log("User with the same email already exists");
      } else {
        // Create a new user
        newUser = await DataStore.save(
          new User({
            name,
            email,
          })
        );
      }

      // Check if the user has already made the same suggestion for the same business
      const existingUserSuggestion = await DataStore.query(
        UserSuggestion,
        (us) =>
          us.and((c) => [
            c.suggestion.suggestion.eq(suggestion),
            c.suggestion.businessName.eq(businessName),
            c.user.id.eq(newUser.id),
          ])
      );

      if (existingUserSuggestion.length > 0) {
        // User has already made the same suggestion for the same business
        // You can handle this case as needed, e.g., display an alert
        console.error(
          "You've already made this suggestion for the same business"
        );
        return;
      }

      let newSuggestion;

      // Check if the suggestion already exists for the specified business
      const existingSuggestion = await DataStore.query(Suggestion, (us) =>
        us.and((c) => [
          c.businessName.eq(businessName),
          c.suggestion.eq(suggestion),
        ])
      );

      if (existingSuggestion.length > 0) {
        // Suggestion already exists for the business
        newSuggestion = existingSuggestion[0];
      } else {
        // Create a new suggestion for the business
        newSuggestion = await DataStore.save(
          new Suggestion({
            businessName,
            userId: newUser.id,
            suggestion,
            compliment,
            // Add other suggestion attributes as needed
          })
        );
      }

      // Save the user suggestion
      await DataStore.save(
        new UserSuggestion({
          userId: newUser.id,
          suggestion: newSuggestion,
        })
      );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // After successful form submission, create the user and suggestion in your DataStore
    createUserAndSuggestion();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AuthForm;
