import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Profile.scss";
import myPage from "../../images/myPage2.png";

class Profile extends Component {
  render() {
    return (
      <div className="user-profile-wrapper">
        <div className="user-profile-photo-wrapper">
          <img className="user-profile-photo" src={myPage} />
        </div>
        <div className="user-profile-info-wrapper">
          <div>{this.props.user.email}</div>
          <div>{this.props.user.user_name}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
