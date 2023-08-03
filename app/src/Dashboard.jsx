import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UserDashboard from "./components/user/UserDashboard";
import BrandDashboard from "./components/brand/BrandDashboard";
import Footer2 from "./components/footer/Footer2";

function Dashboard({ user, email, id }) {
  const { name } = useParams();

  const [isBusiness, setIsBusiness] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const signedInUserData = await DataStore.query(User, (p) =>
          p.name.eq(name)
        );

        setIsBusiness(signedInUserData[0].isBusiness);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard">
        {isBusiness ? (
          <BrandDashboard user={user.username} email={email} id={id} />
        ) : (
          <UserDashboard user={user.username} email={email} id={id} />
        )}
      </div>
      <Footer2 />
    </div>
  );
}

export default withAuthenticator(Dashboard);
