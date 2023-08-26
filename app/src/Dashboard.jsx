import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";
import UserDashboard from "./components/user/UserDashboard";
import BrandDashboard from "./components/brand/BrandDashboard";
import Footer2 from "./components/footer/Footer2";

function Dashboard({ SignedInUser }) {
  const { name } = useParams();
  const [isBusiness, setIsBusiness] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [urlUser, setURLUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const URLUserData = await DataStore.query(User, (p) => p.name.eq(name));
        if (URLUserData.length === 0) {
          setUserExists(false);
          return;
        }

        const user = URLUserData[0];
        setURLUser(user);
        setIsBusiness(user.isBusiness);
        setIsPrivate(user.isPrivate);

        // Check if both hasCompletedForm and isVerified are true
        if (user.hasCompletedForm && user.isVerified) {
          // User is verified and has completed the form
        } else {
          setUserExists(false); // Set userExists to false if conditions are not met
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [name]);

  return (
    <div className="dashboard">
      {isPrivate ? (
        <p>User's profile is private</p>
      ) : isBusiness ? (
        <BrandDashboard SignedInUser={SignedInUser} />
      ) : (
        <UserDashboard SignedInUser={SignedInUser} />
      )}
      <Footer2 />
    </div>
  );
}

export default Dashboard;
