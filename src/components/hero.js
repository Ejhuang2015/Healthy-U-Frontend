import React from "react";
import '../app.css';

// import './hero.css';

const logo = "./images/healthy_u_logo22.png";

const Hero = () => (
  <div className="text-center hero">
    <div className="container">
      <div className="row">
        {/* <div className="col align-self-start">
          <h2 className="mb-4">Break Bad</h2>
        </div> */}
        <div className="col align-self-start">
          <img className="mb-4 app-logo" src={logo} alt="React logo" width="300" />
        </div>
        {/* <div className="col align-self-start">
          <h2 className="mb-4">Build Healthy</h2>
        </div> */}
      </div>
    </div>
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Break Bad - Build Healthy</h1> */}
    {/* <p className="lead">
      
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://auth0.com/docs/quickstart/spa/react"
      >
        React
      </a>
    </p> */}
  </div>
);

export default Hero;
