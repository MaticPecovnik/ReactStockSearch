import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: "",
      password: "",
      wrongPass: false
    };
  }

  handleClick = () => {
    // validating user credentials using our custom API to access a users mongoose collection
    // on MongoDB Atlas. If input matches the registered data in the database then the
    // user is authenticated
    axios
      .get("http://localhost:3000/api/user/getData", {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(res => {
        const database = res.data.data;

        if (database.length === 1) {
          this.props.onLogin(database[0]._id, database[0].username);
        } else {
          this.setState({
            username: "",
            password: "",
            wrongPass: true
          });
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    if (this.state.wrongPass) {
      // returns JSX based on the correctness of the credentials
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
