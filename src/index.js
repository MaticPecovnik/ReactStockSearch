import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./main";
import Start from "./start";
//import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: "",
      userId: null
    };
  }

  onLogin = (ID, uname) => {
    if (this.state.authenticated) {
      this.setState({
        authenticated: false,
        username: ""
      });
    } else {
      this.setState({
        authenticated: true,
        username: uname,
        userId: ID
      });
    }
  };

  render() {
    // if user is authenticated return the main app. Otherwise return login/register screen
    if (this.state.authenticated) {
      return <Main data={this.state} onLogin={this.onLogin} />;
    } else {
      return <Start onLogin={this.onLogin} />;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
