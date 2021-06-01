import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Links = ({ getNewQuote, quote }) => {
  return (
    <div className="flex row space-between grow-max ">
      <div className="flex row">
        <a
          href={`https://twitter.com/intent/tweet?hashtag=quote&related=freecodecamp&text=${quote.quote} -${quote.author}`}
          className="button margin "
          id="tweet-quote"
        >
          <FontAwesomeIcon className="f-24" icon={["fab", "twitter"]} />
        </a>
      </div>
      <div className="">
        <a
          href="#"
          onClick={getNewQuote}
          className="button margin montserrat"
          id="new-quote"
        >
          New Quote
        </a>
      </div>
    </div>
  );
};

export default Links;
