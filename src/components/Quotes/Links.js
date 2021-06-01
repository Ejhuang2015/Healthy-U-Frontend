import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Links = ({ getNewQuote, quote }) => {
  return (
    <div className="row">

      <div>
        <a
          href={`https://twitter.com/intent/tweet?hashtag=quote&related=freecodecamp&text=${quote.quote} -${quote.author}`}
          className="button margin"
          id="tweet-quote"
        >
          <FontAwesomeIcon className="f-24" icon={["fab", "twitter"]} />
        </a>

        <button onClick={getNewQuote} className="btn btn-success ml-4" id="new-quote">
          New Quote
        </button>
      </div>

    </div>
  );
};

export default Links;
