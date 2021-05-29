import React from "react";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (<div className="mx-auto pr-1"><LogoutButton /></div>) : (<div className="mx-auto pr-1"><LoginButton /></div>);
};

export default AuthenticationButton;