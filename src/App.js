import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

import { Footer, Loading, HabitChoices } from "./components";
import Navigation from "./components/Navigation/Navigation";
import { Home, Profile, LogUser } from "./views";

import "./app.css";
import FlexboxPage from "./components/Flexbox/flexbox";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Navigation />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/callback" component={LogUser} />
        </Switch>
        <FlexboxPage />
        <HabitChoices />
      </div>
      <Footer />
    </div>
  );
};

export default App;
