import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideHeader.scss";
import home from "../../images/home2.png";
import search from "../../images/search2.png";
import upload from "../../images/upload2.png";
import myPage from "../../images/myPage2.png";

class SideHeader extends Component {
  render() {
    return (
      <div className="side-header-wrapper">
        <div className="icon-wrapper">
          {this.props.authenticated ? (
            <Link to="/">
              <img src={home} className="icon" />
            </Link>
          ) : (
            <div>
              <img src={home} className="icon" />
            </div>
          )}
          <div className="side-icon-text">HOME</div>
        </div>
        <div className="icon-wrapper">
          {this.props.authenticated ? (
            <Link to="/search">
              <img src={search} className="icon" />
            </Link>
          ) : (
            <div>
              <img src={search} className="icon" />
            </div>
          )}
          <div className="side-icon-text">SEARCH</div>
        </div>
        <div className="icon-wrapper">
          {this.props.authenticated ? (
            <Link to="/upload">
              <img src={upload} className="icon" />
            </Link>
          ) : (
            <div>
              <img src={upload} className="icon" />
            </div>
          )}
          <div className="side-icon-text">UPLOAD</div>
        </div>
        <div className="icon-wrapper">
          {this.props.authenticated ? (
            <Link to="/mypage">
              <img src={myPage} className="icon" />
            </Link>
          ) : (
            <div>
              <img src={myPage} className="icon" />
            </div>
          )}
          <div className="side-icon-text">MY PAGE</div>
        </div>
      </div>
    );
  }
}

export default SideHeader;
