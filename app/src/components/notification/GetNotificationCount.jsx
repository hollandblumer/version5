import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { UserSuggestion, Milestone, Notification } from "../../models";

function GetNotificationsCount({ userId }) {
  const [notificationsLength, setNotificationsLength] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch all user suggestions
        const userSuggestions = await DataStore.query(
          UserSuggestion,
          (p) => p.user.id.eq(userId) // Replace with the actual user ID
        );
        console.log("yea", userSuggestions);
        // Extract suggestion IDs
        const suggestionIDs = userSuggestions.map(
          (userSuggestion) => userSuggestion.suggestionId
        );

        console.log("trying", suggestionIDs);

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

        setNotificationsLength(milestoneNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  return <div className="notifications-count">{notificationsLength}</div>;
}

export default GetNotificationsCount;
