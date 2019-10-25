import React, { Component } from "react";
import "./RecommendFeed.scss";
import myPage from "../../images/myPage2.png";

class RecommendFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="recommend-wrapper">
        <div className="recommend-header-wrapper">
          <div className="recommend-header-title">회원님을 위한 추천</div>
          <div className="recommend-header-view-all">모두 보기</div>
        </div>
        <div className="recommend-content-wrapper">
          <div className="recommend-content">
            <div className="recommend-profile-photo-wrapper">
              <img className="recommend-profile-photo" src={myPage} />
            </div>
            <div className="recommend-profile-info-wrapper">
              <div>{this.props.user.email}</div>
              <div>...님 외 123명 팔로우..</div>
            </div>
            <div className="recommend-follow-btn">
              <div>팔로우</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecommendFeed;
