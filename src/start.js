import React, { Component } from "react";
import Login from "./login";
import Register from "./register.js";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginview: true,
      registerview: false
    };
  }
  loginToRegister = () => {
    this.setState({
      loginview: false,
      registerview: true
    });
  };

  registerToLogin = () => {
    this.setState({
      loginview: true,
      registerview: false
    });
  };

  render() {
    //switch between the login/register view based on the users choice
    if (this.state.loginview && !this.state.registerview) {
      return (
        <Login
          onLogin={this.props.onLogin}
          loginToRegister={this.loginToRegister}
          registerToLogin={this.registerToLogin}
        />
      );
    } else {
      return (
        <Register
          loginToRegister={this.loginToRegister}
          registerToLogin={this.registerToLogin}
        />
      );
    }
  }
}
