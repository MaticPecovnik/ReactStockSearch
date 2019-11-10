import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      wrongPass: false
    };
  }
  handleClick = () => {
    const database = { maticpeco: "1234" };
    const username = this.state.username;
    /* Test if it is the same as in the database. */
    if (
      database[username] === undefined ||
      database[username] !== this.state.password
    ) {
      this.setState({
        username: "",
        password: "",
        wrongPass: true
      });
    } else {
      this.props.onLogin(username);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    if (this.state.wrongPass) {
      return (
        <div className="login-container container-fluid">
          <div className="row">
            <div className="col-xs-5"></div>
            <div className="col-xs-2 login-form container-fluid">
              <div className="row tabsContainer container-fluid">
                <button
                  className="tab current-tab left-tab pull-left"
                  onClick={this.props.registerToLogin}
                >
                  <h3>Login</h3>
                </button>
                <button
                  className="tab other-tab right-tab pull-right"
                  onClick={this.props.loginToRegister}
                >
                  <h3>Register</h3>
                </button>
              </div>
              <center>
                <div className="formContainer form-group">
                  <form>
                    <label htmlFor="username" className="login-label">
                      <b>Username</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      name="username"
                      className="login-input"
                      required
                    ></input>
                    <label htmlFor="password" className="login-label">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                      className="login-input"
                      required
                    ></input>
                    <button
                      type="submit"
                      onClick={event => {
                        event.preventDefault();
                        this.handleClick();
                      }}
                      className="login-submit"
                    >
                      Login
                    </button>
                    <h4 className="login-incorrect">
                      Incorrect password or username
                    </h4>
                  </form>
                </div>
              </center>
            </div>
            <div className="col-xs-5"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login-container container-fluid">
          <div className="row">
            <div className="col-xs-5"></div>
            <div className="col-xs-2 login-form">
              <div className="row tabsContainer">
                <button
                  className="tab current-tab left-tab pull-left"
                  onClick={this.props.registerToLogin}
                >
                  <h3>Login</h3>
                </button>
                <button
                  className="tab other-tab right-tab pull-right"
                  onClick={this.props.loginToRegister}
                >
                  <h3>Register</h3>
                </button>
              </div>
              <center>
                <div className="formContainer">
                  <form>
                    <label htmlFor="username" className="login-label">
                      <b>Username</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      name="username"
                      className="login-input"
                      required
                    ></input>
                    <label htmlFor="password" className="login-label">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                      className="login-input"
                      required
                    ></input>
                    <button
                      type="submit"
                      onClick={event => {
                        event.preventDefault();
                        this.handleClick();
                      }}
                      className="login-submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </center>
            </div>
            <div className="col-xs-5"></div>
          </div>
        </div>
      );
    }
  }
}
