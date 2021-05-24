import React, { useState, useEffect } from "react";
import ViewProfile from "../components/Profile/view-profile";
import EditProfile from "../components/Profile/edit-profile";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const [userData, setUserData] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { user, getAccessTokenSilently } = useAuth0();
  
  const getUserData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/${user.sub}`, { 
        headers: { Authorization: `Bearer ${token}` },
        method: "GET" 
      });
      const userDataRes = await response.json();
      setUserData(userDataRes); 

    } catch (err) {
      setUserData(err);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  const [editState, setEditState] = useState(false);

  function toggleEdit() {
    setEditState(!editState);
  }

  if (editState) {
    return (
      <div>
        <button onClick={toggleEdit}>Discard Changes</button>
        <EditProfile user = {userData}/>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={toggleEdit}>Edit Profile</button>
        <ViewProfile user = {userData}/>
      </div>
    )
  }
};

export default Profile;