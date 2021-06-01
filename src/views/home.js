import React, { Fragment, useState } from "react";

import { Hero, HomeContent } from "../components";
import HealthCard from "../components/HealthCard/healthCard";
import { meditationCard, hydrationCard, veggiesCard, exerciseCard } from "../components/HealthCard/cardData";

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
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <HealthCard data={veggiesCard} tipButton={getQuote} />
          </div>
          <div className="col-sm-3">
            <HealthCard data={hydrationCard} tipButton={getQuote} />
          </div>
          <div className="col-sm-3">
            <HealthCard data={meditationCard} tipButton={getQuote} />
          </div>
          <div className="col-sm-3">
            <HealthCard data={exerciseCard} tipButton={getQuote} />
          </div>
        </div>
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
