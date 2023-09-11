import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { UserSuggestion, Milestone, Notification } from "../../models";

function Notifications({ userId, showNotifications, setShowNotifications }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch all user suggestions
        const userSuggestions = await DataStore.query(
          UserSuggestion,
          (p) => p.user.id.eq(userId) // Replace with the actual user ID
        );
        // Extract suggestion IDs
        const suggestionIDs = userSuggestions.map(
          (userSuggestion) => userSuggestion.suggestionId
        );

        // Fetch milestones associated with suggestion IDs
        // Fetch milestones associated with suggestion IDs
        const milestones = await DataStore.query(Milestone, (m) =>
          m.suggestionID.contains(suggestionIDs)
        );

        // Extract milestone IDs
        const milestoneIDs = milestones.map((milestone) => milestone.id);

        // Fetch notifications tied to those milestones
        const milestoneNotifications = await DataStore.query(
          Notification,
          (n) => n.Milestone.id.contains(milestoneIDs)
        );

        setNotifications(milestoneNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  {
    console.log("notifications", notifications);
  }
  return (
    <div
      className={`notifications-container ${showNotifications ? "active" : ""}`}
    >
      <button
        className="exit-button"
        onClick={() => setShowNotifications(false)}
      >
        Exit
      </button>
      <h2>Your Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
