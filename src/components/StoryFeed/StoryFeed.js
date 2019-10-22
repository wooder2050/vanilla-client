import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./StoryFeed.scss";
import myPage from "../../images/myPage2.png";

class StoryFeed extends Component {
  render() {
    return (
      <div className="story-wrapper">
        <div className="story-header-wrapper">
          <div className="story-header-title">스토리 & 라이브</div>
          <div className="story-header-view-all">모두 보기</div>
        </div>
        <div className="story-content-wrapper">
          <div className="story-content">
            <div className="story-profile-photo-wrapper">
              <img className="story-profile-photo" src={myPage} />
            </div>
            <div className="story-profile-info-wrapper">
              <div>{this.props.user.email}</div>
              <div>1시간전</div>
            </div>
          </div>
          <div className="story-content">
            <div className="story-profile-photo-wrapper">
              <img className="story-profile-photo" src={myPage} />
            </div>
            <div className="story-profile-info-wrapper">
              <div>{this.props.user.email}</div>
              <div>1시간전</div>
            </div>
          </div>
          <div className="story-content">
            <div className="story-profile-photo-wrapper">
              <img className="story-profile-photo" src={myPage} />
            </div>
            <div className="story-profile-info-wrapper">
              <div>{this.props.user.email}</div>
              <div>1시간전</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryFeed;
