import React, { Component } from "react";

export default class searchSuggestion extends Component {
  //renders the searchsuggestions provided by the search component
  render() {
    if (this.props.data === undefined || this.props.data.length === 0) {
      return <div></div>;
    } else {
      let items = (
        <div className="suggestion-container">
          {this.props.data.map(obj => {
            return (
              <div key={obj["1. symbol"]} className="suggestion">
                <button
                  className="suggestion-button"
                  key={obj["1. symbol"]}
                  onClick={() =>
                    this.props.setSHT({
                      SHT: obj["1. symbol"]
                    })
                  }
                >
                  {obj["1. symbol"]}
                </button>
                {obj["2. name"]}
              </div>
            );
          })}
        </div>
      );
      return <div>{items}</div>;
    }
  }
}
