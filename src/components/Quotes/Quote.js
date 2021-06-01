import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Quote = ({ quote }) => {
  return (
    <div className="temp grow-max flex col padding shadow" id="quote-box">

      <div className="my-2">
        <p>
          <FontAwesomeIcon icon="quote-left" /> {quote.quote} <FontAwesomeIcon icon="quote-right" />
        </p>
      </div>

      <div className="my-2">
        <span>
          - {quote.author}
        </span>
      </div>
    </div>
  );
};

export default Quote;
