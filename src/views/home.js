import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { Hero, HomeContent } from "../components";
import HealthCard from "../components/HealthCard/healthCard";
import { meditationCard, hydrationCard, veggiesCard, jokesCard, exerciseCard } from "../components/HealthCard/cardData";

function Home() {
  const [healthTip, setHealthTip] = useState();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  async function getQuote(callLink) {
    try {
      const response = await fetch(`${serverUrl}/api/quote${callLink}`, {
          method: 'GET',
      });
      const responseData = await response.json();
      if (callLink === "/joke/random") {
        setHealthTip([responseData.question, <br />, <br />, responseData.answer])
      } else {
        setHealthTip(responseData.message);
      }
    } catch (err) {
      setHealthTip(err);
    }
  }

  return (
    <Fragment>
      <Hero />
      <hr />
      <div>
        <Grid container>
          <Grid item md={4}>
            <HealthCard data={veggiesCard} tipButton={getQuote} />
          </Grid>
          <Grid item md={4}>
            <HealthCard data={meditationCard} tipButton={getQuote} />
          </Grid>
          <Grid item md={4}>
            <HealthCard data={hydrationCard} tipButton={getQuote} />
          </Grid>
          <Grid item md={4}>
            <HealthCard data={exerciseCard} tipButton={getQuote} />
          </Grid>
          <Grid item md={4}>
            <HealthCard data={jokesCard} tipButton={getQuote} />
          </Grid>
        </Grid>
      </div>
      { healthTip ?
        <div className="border border-2 border-success rounded text-center my-2 py-2">
          {healthTip}
        </div>
        : "" }
      <hr />
      <HomeContent />
    </Fragment>
  );
};

export default Home;
