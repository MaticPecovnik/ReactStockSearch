import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeat: "",
      email: "",
      formCorrect: true,
      errorMessage: ""
    };
  }

  putDataToDB = (state_username, state_password, state_email) => {
    // when a user registers the data is stored in the MongoDB Atlas mongoose database.
    // this is done via our custom API
    fetch("http://localhost:3000/api/user/getData")
      .then(data => data.json())
      .then(res => {
        // Provides the id of the last registered user
        const id = res.data.length;
        axios.post("http://localhost:3000/api/user/putData", {
          _id: id,
          username: state_username,
          password: state_password,
          email: state_email
        });
        axios.post("http://localhost:3000/api/action/putData", {
          _id: id
        });
      });
  };

  handleRegisterClick = () => {
    const mailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //checks that the users credentials are not already in the database
    fetch("http://localhost:3000/api/user/getData")
      .then(data => data.json())
      .then(res => {
        const database = res.data;
        const cond = user => {
          return (
            user.username === this.state.username ||
            user.email === this.state.email
          );
        };
        const currentUser = database.filter(cond);

        // Check if user already exists

        if (currentUser.length !== 0) {
          this.setState({
            username: "",
            password: "",
            repeat: "",
            email: "",
            formCorrect: false,
            errorMessage: "User/email already exists"
          });
        } else if (this.state.password !== this.state.repeat) {
          // Check if passwords match
          this.setState({
            username: "",
            password: "",
            repeat: "",
            email: "",
            formCorrect: false,
            errorMessage: "Passwords do not match"
          });
        } else if (!mailRegex.test(this.state.email)) {
          // Check if mail is valid
          this.setState({
            username: "",
            password: "",
            repeat: "",
            email: "",
            formCorrect: false,
            errorMessage: "Incorrect mail"
          });
        } else {
          /* Send to database and switch to login screen */
          this.putDataToDB(
            this.state.username,
            this.state.password,
            this.state.email
          );
          this.props.registerToLogin();
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.formCorrect) {
      return (
        <div className="login-container container-fluid">
          <div className="row">
            <div className="col-xs-5"></div>
            <div className="col-xs-2 login-form">
              <div className="row tabsContainer">
                <button
                  className="tab other-tab left-tab pull-left"
                  onClick={this.props.registerToLogin}
                >
                  <h3>Login</h3>
                </button>
                <button
                  className="tab current-tab right-tab pull-right"
                  onClick={this.props.loginToRegister}
                >
                  <h3>Register</h3>
                </button>
              </div>
              <center>
                <div className="formContainer">
                  <form>
                    <label htmlFor="username" className="login-label">
                      <b>Desired username</b>
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
                    <label htmlFor="repeat" className="login-label">
                      <b>Repeat Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Repeat Password"
                      value={this.state.repeat}
                      onChange={this.handleChange}
                      name="repeat"
                      className="login-input"
                      required
                    ></input>{" "}
                    <label htmlFor="password" className="login-label">
                      <b>e-Mail</b>
                    </label>
                    <input
                      type="email"
                      placeholder="johndoe@email.com"
                      value={this.state.mail}
                      onChange={this.handleChange}
                      name="email"
                      className="login-input"
                      required
                    ></input>
                    <button
                      type="submit"
                      onClick={event => {
                        event.preventDefault();
                        this.handleRegisterClick();
                      }}
                      className="login-submit"
                    >
                      Register
                    </button>
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
                  className="tab other-tab left-tab pull-left"
                  onClick={this.props.registerToLogin}
                >
                  <h3>Login</h3>
                </button>
                <button
                  className="tab current-tab right-tab pull-right"
                  onClick={this.props.loginToRegister}
                >
                  <h3>Register</h3>
                </button>
              </div>
              <center>
                <div className="formContainer">
                  <form>
                    <label htmlFor="username" className="login-label">
                      <b>Desired username</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={this.state.username || ""}
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
                      value={this.state.password || ""}
                      onChange={this.handleChange}
                      name="password"
                      className="login-input"
                      required
                    ></input>
                    <label htmlFor="repeat" className="login-label">
                      <b>Repeat Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Repeat Password"
                      value={this.state.repeat || ""}
                      onChange={this.handleChange}
                      name="repeat"
                      className="login-input"
                      required
                    ></input>{" "}
                    <label htmlFor="password" className="login-label">
                      <b>e-mail</b>
                    </label>
                    <input
                      type="email"
                      placeholder="johndoe@email.com"
                      value={this.state.email || ""}
                      onChange={this.handleChange}
                      name="email"
                      className="login-input"
                      required
                    ></input>
                    <button
                      type="submit"
                      onClick={event => {
                        event.preventDefault();
                        this.handleRegisterClick();
                      }}
                      className="login-submit"
                    >
                      Register
                    </button>
                    <h4 className="login-incorrect">
                      {this.state.errorMessage}
                    </h4>
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
