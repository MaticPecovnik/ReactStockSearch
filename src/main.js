import React, { Component } from "react";
import Navbar from "./navbar";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-2"></div>
          <div className="col-xs-8" id="main">
            <Navbar dataFromParent={this.props.data} />
          </div>
          <div className="col-xs-2"></div>
        </div>
      </div>
    );
  }
}
