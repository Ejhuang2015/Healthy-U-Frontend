import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import Grid from "@material-ui/core/Grid";

import {
  Footer,
  Loading,
  HabitChoices,
  VeggiesCard,
  MeditationCard,
  HydrationCard,
} from "./components";
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
        <div>
          <Grid container spacing={24}>
            <Grid item md={3}>
              <VeggiesCard />
            </Grid>
            <Grid item md={3}>
              <MeditationCard />
            </Grid>
            <Grid item md={3}>
              <HydrationCard />
            </Grid>
          </Grid>
        </div>
        <HabitChoices />
      </div>
      <Footer />
    </div>
  );
};

export default App;
