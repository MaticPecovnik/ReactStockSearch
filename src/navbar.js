import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.dataFromParent.authenticated) {
      return (
        <div className="navbar">
          <h3>Hi there {this.props.dataFromParent.username}</h3>
          <p>Net worth: {this.props.dataFromParent.stockValue}€</p>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <h3>Please login</h3>
        </div>
      );
    }
  }
}
