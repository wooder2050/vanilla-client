import React, { Component } from "react";
import "./LoginWrapper.scss";
import AboutVanilla from "./AboutVanilla";
import Login from "./Login";
import Register from "./Register";

class LoginWrapper extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <div className="login-wrapper">
          {this.props.loginPage === "login" ? (
            <Login movePage={this.props.movePage} />
          ) : (
            <Register
              movePage={this.props.movePage}
              verification={this.props.verification.bind(this)}
              register_error={this.props.register_error}
              pwdError={this.props.pwdError}
              emailError={this.props.emailError}
            />
          )}
          <AboutVanilla />
        </div>
      </div>
    );
  }
}

export default LoginWrapper;
