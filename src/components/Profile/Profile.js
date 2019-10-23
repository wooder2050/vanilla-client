import React, { Component } from "react";
import "./Profile.scss";
import myPage from "../../images/myPage2.png";

class Profile extends Component {
  render() {
    return (
      <div className="user-profile-wrapper">
        <div className="user-profile-photo-wrapper">
          {this.props.user ? (
            <img
              className="user-profile-photo"
              src={
                this.props.user.profile_url
                  ? this.props.user.profile_url
                  : myPage
              }
            />
          ) : (
            <img className="user-profile-photo" src={myPage} />
          )}
        </div>
        <div className="user-profile-info-wrapper">
          <div className="user-profile-info-text">
            {this.props.user.user_display_name
              ? this.props.user.user_display_name
              : this.props.user.email}
          </div>
          <div className="user-profile-info-name">
            {this.props.user.user_name}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
