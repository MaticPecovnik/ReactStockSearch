import React, { Component } from "react";
import SearchSuggestions from "./searchSuggestions";
import Plot from "react-plotly.js";

const axios = require("axios");

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockShorthand: "",
      searchSuggestion: [],
      graphData: null,
      errorMSG: "",
      loading: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    // based on the users input in the search field Alpha Vantage search engine is called
    // the best matches are stored to state.searchSuggestions

    if (this.state.stockShorthand.length >= 1) {
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=V81TVI2YMKQBW0IG`
        )
        .then(response => {
          this.setState({
            searchSuggestion: response.data.bestMatches
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  setSHT = choice => {
    // sets the stock Shorthand name/ticker and calls onClickSearch method
    // used when a user picks out a API offered suggestion from SearchSuggestions component
    this.setState({ stockShorthand: choice.SHT });
    if (this.state.stockShorthand.length !== 0) {
      this.onclickSearch();
    }
  };

  onclickSearch = () => {
    //get weekly price data about stock

    this.setState({
      loading: true
    });

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&outputsize=compact&symbol=${this.state.stockShorthand}&apikey=V81TVI2YMKQBW0IG`
      )
      .then(response => {
        const open = [];
        const high = [];
        const low = [];
        const close = [];
        const graphData = {
          type: "candlestick",
          x: null,
          open: null,
          high: null,
          low: null,
          close: null
        };
        const timeIndex = Object.keys(response.data)[1];
        graphData.x = Object.keys(response.data[timeIndex]);

        for (let i = 0; i < graphData.x.length; i++) {
          open.push(Object.values(response.data[timeIndex])[i]["1. open"]);
          high.push(Object.values(response.data[timeIndex])[i]["2. high"]);
          low.push(Object.values(response.data[timeIndex])[i]["3. low"]);
          close.push(Object.values(response.data[timeIndex])[i]["4. close"]);
        }
        graphData.open = open;
        graphData.low = low;
        graphData.high = high;
        graphData.close = close;

        this.setState({
          graphData: graphData,
          errorMSG: "",
          loading: false
        });
      })
      .catch(error => {
        console.log("Alpha vantage api failed - request limit reached");
        this.setState({
          errorMSG: "API call limit excedeed",
          loading: false
        });
        console.log(error);
      });
  };

  calcChange = (data, interval) => {
    // calculates the relative changes based on the weekly data from ALPHA VANTAGE API
    const currentPrice = data[0];
    let intervalPrice = 0;

    if (data[interval] !== undefined) {
      intervalPrice = data[interval];
    } else {
      intervalPrice = data[data.length - 1];
    }

    return Math.round((currentPrice / intervalPrice - 1) * 100 * 100) / 100;
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="container-fluid search-container">
          <div className="inline">
            <center>
              <form>
                <label htmlFor="stockShorthand">
                  <b>Search: </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Stock Shorthand"
                  value={this.state.stockShorthand}
                  onChange={this.handleChange}
                  name="stockShorthand"
                  className="search-input"
                  required
                ></input>
                <button
                  type="submit"
                  onClick={event => {
                    event.preventDefault();
                    this.onclickSearch();
                  }}
                  className="search-submit"
                >
                  Do it!
                </button>
              </form>

              <SearchSuggestions
                data={this.state.searchSuggestion}
                setSHT={this.setSHT}
              />
              <h1>Loading...</h1>
            </center>
          </div>
        </div>
      );
    } else {
      if (
        this.state.graphData !== undefined &&
        this.state.graphData !== null &&
        this.state.errorMSG === ""
      ) {
        const weeklyChange = this.calcChange(this.state.graphData.close, 1);
        const monthlyChange = this.calcChange(this.state.graphData.close, 4);
        const halfyearChange = this.calcChange(this.state.graphData.close, 26);
        const yearChange = this.calcChange(this.state.graphData.close, 52);
        const decadeChange = this.calcChange(this.state.graphData.close, 520);
        const allChange = this.calcChange(
          this.state.graphData.close,
          this.state.graphData.close.length - 1
        );
        return (
          <div className="container-fluid search-container">
            <div className="inline">
              <center>
                <form>
                  <label htmlFor="stockShorthand">
                    <b>Search: </b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Stock Shorthand"
                    value={this.state.stockShorthand}
                    onChange={this.handleChange}
                    name="stockShorthand"
                    className="search-input"
                    required
                  ></input>
                  <button
                    type="submit"
                    onClick={event => {
                      event.preventDefault();
                      this.onclickSearch();
                    }}
                    className="search-submit"
                  >
                    Do it!
                  </button>
                </form>
                <SearchSuggestions
                  data={this.state.searchSuggestion}
                  setSHT={this.setSHT}
                />
                <Plot
                  data={[this.state.graphData]}
                  layout={{
                    autosize: true,
                    margin: { l: 30, t: 10, b: 10, r: 10 }
                  }}
                  useResizeHandler={true}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  xaxis={{
                    visible: true,
                    color: "#000",
                    autorange: true,
                    type: "date"
                  }}
                  yaxis={{
                    autorange: true,
                    domain: [0, 1],
                    title: "Value in $"
                  }}
                />
                <div className="column change-container">
                  <div className="row change-label-container">
                    <div className="col-xs-2">Week</div>
                    <div className="col-xs-2">Month</div>
                    <div className="col-xs-2">6-Months</div>
                    <div className="col-xs-2">1-year</div>
                    <div className="col-xs-2">10-years</div>
                    <div className="col-xs-2">All-time</div>
                  </div>
                  <div className="row change-label-container">
                    <div
                      className="col-xs-2"
                      style={{
                        color: weeklyChange >= 0 ? "green" : "red"
                      }}
                    >
                      {weeklyChange}%
                    </div>
                    <div
                      className="col-xs-2"
                      style={{
                        color: monthlyChange >= 0 ? "green" : "red"
                      }}
                    >
                      {monthlyChange}%
                    </div>
                    <div
                      className="col-xs-2"
                      style={{
                        color: halfyearChange >= 0 ? "green" : "red"
                      }}
                    >
                      {halfyearChange}%
                    </div>
                    <div
                      className="col-xs-2"
                      style={{
                        color: yearChange >= 0 ? "green" : "red"
                      }}
                    >
                      {yearChange}%
                    </div>
                    <div
                      className="col-xs-2"
                      style={{
                        color: decadeChange >= 0 ? "green" : "red"
                      }}
                    >
                      {decadeChange}%
                    </div>
                    <div
                      className="col-xs-2"
                      style={{
                        color: allChange >= 0 ? "green" : "red"
                      }}
                    >
                      {allChange}%
                    </div>
                  </div>
                </div>
              </center>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container-fluid search-container">
            <div className="inline">
              <center>
                <form>
                  <label htmlFor="stockShorthand">
                    <b>Search: </b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Stock Shorthand"
                    value={this.state.stockShorthand}
                    onChange={this.handleChange}
                    name="stockShorthand"
                    className="search-input"
                    required
                  ></input>
                  <button
                    type="submit"
                    onClick={event => {
                      event.preventDefault();
                      this.onclickSearch();
                    }}
                    className="search-submit"
                  >
                    Do it!
                  </button>
                </form>
                <div>
                  <h3 style={{ color: "red" }}>{this.state.errorMSG}</h3>
                </div>
                <SearchSuggestions
                  data={this.state.searchSuggestion}
                  setSHT={this.setSHT}
                />
              </center>
            </div>
          </div>
        );
      }
    }
  }
}
