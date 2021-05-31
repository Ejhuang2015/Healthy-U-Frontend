import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

import { Loading } from "./components";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/footer";
import { Home, Profile, LogUser } from "./views";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/callback" component={LogUser} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
