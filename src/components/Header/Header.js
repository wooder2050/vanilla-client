import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import hamburgBtn from "../../images/hamburg_btn2.png";

class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="hamburg-btn-wrapper">
          <img className="hamburg-btn" src={hamburgBtn} />
        </div>
        <div className="logo-wrapper">
          <h1 className="header-logo">VANILLA</h1>
        </div>
        <div className="logout">
          {this.props.authenticated ? (
            <div onClick={this.props.logout.bind(this)}>
              <Link to="/login">LOGOUT</Link>
            </div>
          ) : (
            <div>
              <Link to="/login">LOGIN</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
