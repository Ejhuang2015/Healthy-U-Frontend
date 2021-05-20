import React, { useState, useEffect } from "react";
import EditProfileButton from "../components/edit-profile-button";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const [userData, setUserData] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { user, getAccessTokenSilently } = useAuth0();
  
  
  const getUserData = async () => {
    try {
      console.log(user.sub);
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/${user.sub}`, { 
        headers: { Authorization: `Bearer ${token}` },
        method: "GET" 
      });
      const userDataRes = await response.json();
      console.log(userDataRes)
      setUserData(userDataRes); 

    } catch (err) {
      setUserData(err);
      console.log(err);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <EditProfileButton />
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={userData.avatar}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{userData.name}</h2>
          <p className="lead text-muted">{userData.email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(userData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;