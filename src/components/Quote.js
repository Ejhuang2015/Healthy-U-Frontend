import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Quote = ({ quote }) => {
  return (
    <div className="temp grow-max flex col padding shadow" id="quote-box">
      <div className="quote margin">
        <p id="text" className="f-24 montserrat">
          <FontAwesomeIcon icon="quote-left" /> {quote.quote}
        </p>
      </div>
      <div className="author margin">
        <span id="author" className="montserrat">
          - {quote.author}
        </span>
      </div>
    </div>
  );
};

export default Quote;
