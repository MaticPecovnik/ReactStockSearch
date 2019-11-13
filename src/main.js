import React, { Component } from "react";
import Navbar from "./navbar";
import Search from "./search";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSHT: "",
      stockName: ""
    };
  }

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="row">
          <div className="col-xs-2"></div>
          <div className="col-xs-8">
            <Navbar
              dataFromParent={this.props.data}
              onLogin={this.props.onLogin}
            />
            <center>
              <div className="searchContainer">
                <Search onSearch={this.onSearch} />
              </div>
            </center>
          </div>
          <div className="col-xs-2"></div>
        </div>
      </div>
    );
  }
}
