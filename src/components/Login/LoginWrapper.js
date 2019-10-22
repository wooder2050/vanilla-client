import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./LoginWrapper.scss";
import AboutVanilla from "./AboutVanilla";
import Login from "./Login";
import Register from "./Register";

class LoginWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "login"
    };
  }
  movePage(page) {
    this.setState({
      current_page: page
    });
  }
  render() {
    return (
      <div className="body-wrapper">
        <div className="login-wrapper">
          {this.state.current_page === "login" ? (
            <Login movePage={this.movePage.bind(this)} />
          ) : (
            <Register movePage={this.movePage.bind(this)} />
          )}
          <AboutVanilla movePage={this.movePage.bind(this)} />
        </div>
      </div>
    );
  }
}

export default LoginWrapper;
