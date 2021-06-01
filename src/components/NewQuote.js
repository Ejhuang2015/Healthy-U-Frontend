import React, { Component } from "react";
import Quote from "./Quote";
import Links from "./Links";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

const serverUrl = process.env.REACT_APP_SERVER_URL;

class NewQuote extends Component {
  state = {
    quote: {},
  };
  componentDidMount() {
    this.getRandomQuote();
  }
  getRandomQuote = () => {
    let randNum = undefined;
    // fetch(`${serverUrl}/api/tips/random`)
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((quotes) => {
        randNum = Math.floor(Math.random() * quotes["quotes"].length);
        this.setState({
          quote: quotes["quotes"][randNum],
        });
      });
  };

  render() {
    return (
      <div className="play card">
        <Quote quote={this.state.quote} />
        <Links getNewQuote={this.getRandomQuote} quote={this.state.quote} />
      </div>
    );
  }
}

export default NewQuote;
