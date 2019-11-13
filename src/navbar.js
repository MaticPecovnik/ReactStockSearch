import React, { Component } from "react";

export default class Navbar extends Component {
  onclickLogout = () => {
    this.props.onLogin(this.props.dataFromParent.username);
  };

  render() {
    return (
      <div className="navbar">
        <div className="userInfo">
          <h3>Hi there {this.props.dataFromParent.username}</h3>
        </div>
        <div className="tools">
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.onclickLogout();
            }}
            className="navbar-button"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }
}
