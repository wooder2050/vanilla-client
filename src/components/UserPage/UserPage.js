import React, { Component } from "react";
import "./UserPage.scss";
import { NavLink } from "react-router-dom";
import { Progress } from "antd";
import arrow from "../../images/arrow.png";
import profile from "../../images/profile.png";
import "antd/dist/antd.css";

class UserPage extends Component {
  componentDidMount() {
    this.props.onLoadUserPage(this);
  }

  render() {
    console.log(
      this.props.userPageInfo,
      this.props.userPagefollowing,
      this.props.userPagefollower
    );
    return (
      <>
        <div className="userpage-main-content-wrapper">
          <div className="userpage-main-content-header-wrapper">
            <div className="userpage-main-content-header-photo-wrapper">
              <div className="userpage-main-content-header-photo-border">
                <div className="userpage-main-content-header-photo">
                  {this.props.userPageInfo ? (
                    <img
                      className="userpage-main-content-header-photo-img"
                      src={
                        this.props.userPageInfo.profile_url
                          ? this.props.userPageInfo.profile_url
                          : profile
                      }
                    />
                  ) : (
                    <img
                      className="userpage-main-content-header-photo-img"
                      src={profile}
                    />
                  )}
                </div>
                <Progress
                  type="circle"
                  width="210px"
                  strokeWidth="3"
                  strokeColor={{
                    "0%": "#fee5a5",
                    "100%": "#486d87"
                  }}
                  percent={90}
                />
              </div>
              <div className="matching-point">
                90%
                <img className="arrow" src={arrow} />
              </div>
            </div>
            <div className="userpage-main-content-header-info-wrapper">
              {this.props.userPageInfo ? (
                <div className="userpage-main-content-header-info-id">
                  {this.props.userPageInfo.user_display_name
                    ? this.props.userPageInfo.user_display_name
                    : this.props.userPageInfo.email}
                </div>
              ) : (
                <div className="userpage-main-content-header-info-id">
                  {this.props.userPageInfo ? this.props.userPageInfo.email : ""}
                </div>
              )}
              <div className="userpage-main-content-header-info-number-wrapper">
                <div className="userpage-main-content-header-info-number-cover">
                  <div className="userpage-main-content-header-info-title">
                    게시물
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.props.userPagePosts
                      ? this.props.userPagePosts.length
                      : 0}
                  </div>
                </div>
                <div
                  onClick={
                    this.props.userPageInfo
                      ? this.props.userPageClickFollowState.bind(
                          this,
                          this.props.userPageFollowState,
                          this.props.userPagefollowedUsers,
                          "팔로워"
                        )
                      : ""
                  }
                  className="userpage-main-content-header-info-number-cover"
                >
                  <div className="userpage-main-content-header-info-title">
                    팔로워
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.props.userPagefollower
                      ? this.props.userPagefollower.length
                      : 0}
                  </div>
                </div>
                <div
                  onClick={
                    this.props.userPageInfo
                      ? this.props.userPageClickFollowState.bind(
                          this,
                          this.props.userPageFollowState,
                          this.props.userPagefollowingUsers,
                          "팔로잉"
                        )
                      : ""
                  }
                  className="userpage-main-content-header-info-number-cover"
                >
                  <div className="userpage-main-content-header-info-title">
                    팔로잉
                  </div>
                  <div className="userpage-main-content-header-info-number">
                    {this.props.userPagefollowing
                      ? this.props.userPagefollowing.length
                      : 0}
                  </div>
                </div>
              </div>
              <div className="userpage-main-content-header-info-name-wrapper">
                <div className="userpage-main-content-header-info-name">
                  {this.props.userPageInfo
                    ? this.props.userPageInfo.user_name
                    : ""}
                </div>
                <div className="userpage-main-content-header-info-job">
                  {this.props.userPageInfo
                    ? this.props.userPageInfo.user_job
                    : ""}
                </div>
              </div>
              <div className="userpage-main-content-header-info-text-wrapper">
                {this.props.userPageInfo ? this.props.userPageInfo.info : ""}
              </div>
              <div className="userpage-main-content-header-info-detail-wrapper">
                상세정보
                <img className="arrow" src={arrow} />
              </div>
              <div className="userpage-main-content-header-info-modify-wrapper">
                {this.props.following ? (
                  <div className="userpage-main-content-header-info-modify-btn-following">
                    팔로잉
                  </div>
                ) : (
                  <div
                    className="userpage-main-content-header-info-modify-btn"
                    onClick={e => this.props.userPageclickFollow(this)}
                  >
                    팔로우
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="userpage-main-content-cover">
            <div className="userpage-main-content-inner-header-wrapper">
              <div
                className={
                  this.props.view === "photo"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickPhoto.bind(this)}
              >
                사진
              </div>
              <div
                className={
                  this.props.view === "music"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickMusic.bind(this)}
              >
                곡
              </div>
              <div
                className={
                  this.props.view === "video"
                    ? "userpage-main-content-header border-bottom"
                    : "userpage-main-content-header"
                }
                onClick={this.props.clickVideo.bind(this)}
              >
                영상
              </div>
            </div>
            {this.props.view === "photo" ? (
              <div className="userpost-cover">
                {this.props.userPagePosts &&
                  this.props.userPagePosts.map((post, i) => {
                    if (post.post_type === "photo") {
                      return (
                        <div key={i} className="userpost-wrapper">
                          <img className="userpost" src={post.post_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.view === "music" ? (
              <div className="userpost-cover">
                {this.props.userPagePosts &&
                  this.props.userPagePosts.map((post, i) => {
                    if (post.post_type === "music") {
                      return (
                        <div
                          key={i}
                          onClick={this.props.startMusicPlayer.bind(this, post)}
                          className="userpost-wrapper"
                        >
                          <img className="userpost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
            {this.props.view === "video" ? (
              <div className="userpost-cover">
                {this.props.userPagePosts &&
                  this.props.userPagePosts.map((post, i) => {
                    if (post.post_type === "video") {
                      return (
                        <div className="userpost-wrapper">
                          <img className="userpost" src={post.cover_url} />
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {this.props.userPageFollowState ? (
          <>
            <div
              onClick={this.props.userPageClickFollowState.bind(
                this,
                this.props.userPageFollowState
              )}
              className="followList-background"
            ></div>
            <div className="followList-wrapper">
              <div className="title">{this.props.userPageListTitle}</div>
              {this.props.userPageCurrentFollowList.map((user, i) => {
                return (
                  <>
                    <NavLink
                      className="followList-user-wrapper"
                      to={`${user[0]._id}`}
                    >
                      <div key={i} className="followList-user-profile-wrapper">
                        <img
                          className="followList-user-profile"
                          src={
                            user[0].profile_url ? user[0].profile_url : profile
                          }
                        />
                      </div>
                      <div className="followList-user-text-wrapper">
                        <strong className="followList-user-id">
                          {user[0].user_display_name
                            ? user[0].user_display_name
                            : user[0].email}
                        </strong>
                        {user[0].user_name}
                      </div>
                    </NavLink>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default UserPage;
