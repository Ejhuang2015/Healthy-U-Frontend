import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

import { VeggiesCard, MeditationCard, HydrationCard, Hero, HomeContent } from "../components";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
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
    <hr />
    <HomeContent />
  </Fragment>
);

export default Home;
